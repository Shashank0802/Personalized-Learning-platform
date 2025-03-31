import { userService } from '../../services/userService';
import jwt from 'jsonwebtoken';

export async function login(email: string, password: string) {
    try {
        const user = await userService.login(email, password);
        
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            token
        };
    } catch (error) {
        throw error;
    }
} 