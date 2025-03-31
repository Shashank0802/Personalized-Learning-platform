import mysql from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'learning_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  profilePhoto: string | null
  course: string
  tenthMarks?: number
  twelfthMarks?: number
  currentCgpa?: number
  achievements?: string
  certifications?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  achievedAt: Date
}

export interface LearningTopic {
  id: string
  title: string
  description: string
  progress: number
  lastAccessed: Date
}

export interface ChatMessage {
  id: string
  userId: string
  message: string
  isUser: boolean
  createdAt: Date
}

export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    )
    return rows[0] as User || null
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  try {
    const [rows] = await pool.execute(`
      SELECT a.id, a.title, a.description, a.icon, ua.achieved_at
      FROM achievements a
      JOIN user_achievements ua ON a.id = ua.achievement_id
      WHERE ua.user_id = ?
      ORDER BY ua.achieved_at DESC
    `, [userId])
    return rows as Achievement[]
  } catch (error) {
    console.error('Error fetching user achievements:', error)
    return []
  }
}

export async function getUserLearningTopics(userId: string): Promise<LearningTopic[]> {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        lt.id,
        lt.title,
        lt.description,
        up.progress,
        up.last_accessed
      FROM learning_topics lt
      LEFT JOIN user_progress up ON lt.id = up.topic_id
      WHERE up.user_id = ?
      ORDER BY up.last_accessed DESC
    `, [userId])
    return rows as LearningTopic[]
  } catch (error) {
    console.error('Error fetching user learning topics:', error)
    return []
  }
}

export async function updateUserProfile(user: Partial<User>): Promise<boolean> {
  try {
    const { id, ...updateData } = user
    const [result] = await pool.execute(`
      UPDATE users
      SET ?
      WHERE id = ?
    `, [updateData, id])
    return true
  } catch (error) {
    console.error('Error updating user profile:', error)
    return false
  }
}

export async function updateUserProgress(
  userId: string,
  topicId: string,
  progress: number
): Promise<boolean> {
  try {
    await pool.execute(`
      INSERT INTO user_progress (id, user_id, topic_id, progress)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        progress = VALUES(progress),
        last_accessed = CURRENT_TIMESTAMP
    `, [uuidv4(), userId, topicId, progress])
    return true
  } catch (error) {
    console.error('Error updating user progress:', error)
    return false
  }
}

export async function saveChatMessage(
  userId: string,
  message: string,
  isUser: boolean
): Promise<ChatMessage | null> {
  try {
    const id = uuidv4()
    await pool.execute(`
      INSERT INTO chat_messages (id, user_id, message, is_user)
      VALUES (?, ?, ?, ?)
    `, [id, userId, message, isUser])

    const [rows] = await pool.execute(
      'SELECT * FROM chat_messages WHERE id = ?',
      [id]
    )
    return rows[0] as ChatMessage
  } catch (error) {
    console.error('Error saving chat message:', error)
    return null
  }
}

export async function getChatHistory(userId: string): Promise<ChatMessage[]> {
  try {
    const [rows] = await pool.execute(`
      SELECT *
      FROM chat_messages
      WHERE user_id = ?
      ORDER BY created_at ASC
    `, [userId])
    return rows as ChatMessage[]
  } catch (error) {
    console.error('Error fetching chat history:', error)
    return []
  }
} 