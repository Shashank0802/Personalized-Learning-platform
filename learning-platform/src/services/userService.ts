import User from '../models/User';
import mysql, { ResultSetHeader } from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'learning_platform',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const createUser = async (userData: any) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = new User(userData);
    await user.save();
    return user;
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw new Error(error.message || 'Failed to create user');
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    console.error('Error getting user:', error);
    throw new Error(error.message || 'Failed to get user');
  }
};

export const updateUser = async (email: string, updateData: any) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw new Error(error.message || 'Failed to update user');
  }
};

export const deleteUser = async (email: string) => {
  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    console.error('Error deleting user:', error);
    throw new Error(error.message || 'Failed to delete user');
  }
};

export const userService = {
    async login(email: string, password: string) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            const user = (rows as any[])[0];
            if (!user) {
                return null;
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return null;
            }

            return user;
        } catch (error) {
            throw error;
        }
    },

    async register(userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        course: string;
        tenthMarks: number;
        twelfthMarks: number;
        cpi: number;
        yearOfStudy: number;
        interests: string;
    }) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            const [result] = await pool.execute<ResultSetHeader>(
                `INSERT INTO users (
                    email, password, first_name, last_name, phone_number,
                    course, tenth_marks, twelfth_marks, cpi, year_of_study, interests
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    userData.email,
                    hashedPassword,
                    userData.firstName,
                    userData.lastName,
                    userData.phoneNumber,
                    userData.course,
                    userData.tenthMarks,
                    userData.twelfthMarks,
                    userData.cpi,
                    userData.yearOfStudy,
                    userData.interests
                ]
            );

            return {
                id: result.insertId,
                ...userData,
                password: undefined
            };
        } catch (error) {
            throw error;
        }
    },

    async resetPassword(email: string) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            const user = (rows as any[])[0];
            if (!user) {
                throw new Error('User not found');
            }

            const resetToken = Math.random().toString(36).slice(-8);
            const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

            await pool.execute(
                'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
                [resetToken, resetTokenExpiry, user.id]
            );

            return resetToken;
        } catch (error) {
            throw error;
        }
    },

    async updatePassword(token: string, newPassword: string) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
                [token]
            );

            const user = (rows as any[])[0];
            if (!user) {
                throw new Error('Invalid or expired reset token');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            await pool.execute(
                'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
                [hashedPassword, user.id]
            );

            return true;
        } catch (error) {
            throw error;
        }
    },

    async getUserById(id: number) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );

            return (rows as any[])[0];
        } catch (error) {
            throw error;
        }
    }
}; 