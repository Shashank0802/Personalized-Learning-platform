-- Create the database
CREATE DATABASE IF NOT EXISTS learning_platform;
USE learning_platform;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    course VARCHAR(100) NOT NULL,
    tenth_marks DECIMAL(5,2) NOT NULL,
    twelfth_marks DECIMAL(5,2) NOT NULL,
    cpi DECIMAL(3,2) NOT NULL,
    year_of_study INT NOT NULL,
    interests TEXT NOT NULL,
    reset_token VARCHAR(255),
    reset_token_expiry DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_tenth_marks CHECK (tenth_marks >= 0 AND tenth_marks <= 100),
    CONSTRAINT chk_twelfth_marks CHECK (twelfth_marks >= 0 AND twelfth_marks <= 100),
    CONSTRAINT chk_cpi CHECK (cpi >= 0 AND cpi <= 10),
    CONSTRAINT chk_year_of_study CHECK (year_of_study >= 1 AND year_of_study <= 4)
);

-- Create indexes for better performance
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_reset_token ON users(reset_token);

-- Create a view for user profiles (excluding sensitive information)
CREATE OR REPLACE VIEW user_profiles AS
SELECT 
    id,
    email,
    first_name,
    last_name,
    phone_number,
    course,
    tenth_marks,
    twelfth_marks,
    cpi,
    year_of_study,
    interests,
    created_at
FROM users;

-- Create trigger to validate phone number format
DELIMITER //
CREATE TRIGGER validate_phone_number
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NOT (NEW.phone_number REGEXP '^[0-9]{10}$') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Phone number must be exactly 10 digits';
    END IF;
END //
DELIMITER ; 