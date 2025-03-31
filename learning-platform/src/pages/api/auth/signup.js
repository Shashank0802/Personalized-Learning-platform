import { NextApiRequest, NextApiResponse } from 'next';
import userService from '../../../services/userService';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const userData = req.body;

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

        const missingFields = requiredFields.filter(field => !userData[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate password length
        if (userData.password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long'
            });
        }

        // Validate phone number format
        if (!/^[0-9]{10}$/.test(userData.phoneNumber)) {
            return res.status(400).json({
                message: 'Phone number must be 10 digits'
            });
        }

        // Validate marks ranges
        if (userData.tenthMarks < 0 || userData.tenthMarks > 100) {
            return res.status(400).json({
                message: '10th marks must be between 0 and 100'
            });
        }

        if (userData.twelfthMarks < 0 || userData.twelfthMarks > 100) {
            return res.status(400).json({
                message: '12th marks must be between 0 and 100'
            });
        }

        // Validate CPI range
        if (userData.cpi < 0 || userData.cpi > 10) {
            return res.status(400).json({
                message: 'CPI must be between 0 and 10'
            });
        }

        // Validate year of study
        if (userData.yearOfStudy < 1 || userData.yearOfStudy > 4) {
            return res.status(400).json({
                message: 'Year of study must be between 1 and 4'
            });
        }

        const userId = await userService.register(userData);

        return res.status(201).json({
            message: 'User registered successfully',
            userId
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            message: error.message || 'Failed to register user'
        });
    }
} 