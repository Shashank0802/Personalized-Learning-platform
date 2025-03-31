import { userService } from '../../services/userService';
import jwt from 'jsonwebtoken';

export async function getCurrentUser(token: string) {
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
            userId: number;
            email: string;
        };

        // Get user data from the database
        const user = await userService.getUserById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        };
    } catch (error) {
        throw error;
    }
} 