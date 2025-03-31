import { userService } from '../../services/userService';

export async function signup(userData: {
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
        // Validate required fields
        const requiredFields = [
            'email',
            'password',
            'firstName',
            'lastName',
            'phoneNumber',
            'course',
            'tenthMarks',
            'twelfthMarks',
            'cpi',
            'yearOfStudy',
            'interests'
        ];

        for (const field of requiredFields) {
            if (!userData[field as keyof typeof userData]) {
                throw new Error(`${field} is required`);
            }
        }

        // Validate password length
        if (userData.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Validate phone number format
        if (!/^\d{10}$/.test(userData.phoneNumber)) {
            throw new Error('Phone number must be exactly 10 digits');
        }

        // Validate marks ranges
        if (userData.tenthMarks < 0 || userData.tenthMarks > 100) {
            throw new Error('10th marks must be between 0 and 100');
        }
        if (userData.twelfthMarks < 0 || userData.twelfthMarks > 100) {
            throw new Error('12th marks must be between 0 and 100');
        }
        if (userData.cpi < 0 || userData.cpi > 10) {
            throw new Error('CPI must be between 0 and 10');
        }
        if (userData.yearOfStudy < 1 || userData.yearOfStudy > 4) {
            throw new Error('Year of study must be between 1 and 4');
        }

        const user = await userService.register(userData);
        return {
            success: true,
            userId: user.id
        };
    } catch (error) {
        throw error;
    }
} 