import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { RowDataPacket } from 'mysql2';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  course: string;
  tenth_marks: number;
  twelfth_marks: number;
  cpi: number;
  year_of_study: number;
  achievements?: string;
  certifications?: string;
  projects?: string;
  interests: string;
  created_at?: Date;
  reset_password_token?: string;
  reset_password_expires?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const registerUser = async (userData: Omit<User, 'id' | 'created_at'>): Promise<User> => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

    // Insert user into database
    const [result] = await pool.execute(
      `INSERT INTO users (
        first_name, last_name, email, phone_number, password, course,
        tenth_marks, twelfth_marks, cpi, year_of_study,
        achievements, certifications, projects, interests
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.first_name,
        userData.last_name,
        userData.email,
        userData.phone_number,
        hashedPassword,
        userData.course,
        userData.tenth_marks,
        userData.twelfth_marks,
        userData.cpi,
        userData.year_of_study,
        userData.achievements || null,
        userData.certifications || null,
        userData.projects || null,
        userData.interests
      ]
    );

    const [newUser] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ?',
      [(result as any).insertId]
    );

    return newUser[0] as User;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  try {
    // Get user by email
    const [users] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [credentials.email]
    );

    if (users.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = users[0] as User;

    // Verify password
    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { user, token };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    const [users] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      // Don't reveal if email exists or not
      return;
    }

    const user = users[0] as User;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Update user with reset token
    await pool.execute(
      'UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE id = ?',
      [resetToken, resetExpires, user.id]
    );

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset.</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  try {
    const [users] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > NOW()',
      [token]
    );

    if (users.length === 0) {
      throw new Error('Invalid or expired reset token');
    }

    const user = users[0] as User;
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update password and clear reset token
    await pool.execute(
      'UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?',
      [hashedPassword, user.id]
    );
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const verifyToken = (token: string): { userId: number; email: string } => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const [users] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return users[0] as User || null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<User | null> => {
  try {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && key !== 'password') {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) return null;

    values.push(id);
    await pool.execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return getUserById(id);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const changePassword = async (id: number, oldPassword: string, newPassword: string): Promise<boolean> => {
  try {
    const user = await getUserById(id);
    if (!user) throw new Error('User not found');

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) throw new Error('Invalid current password');

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );

    return true;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
}; 