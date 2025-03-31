import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true
  },
  tenthMarks: {
    type: Number,
    required: [true, '10th marks are required'],
    min: [0, 'Marks cannot be negative'],
    max: [100, 'Marks cannot exceed 100']
  },
  twelfthMarks: {
    type: Number,
    required: [true, '12th marks are required'],
    min: [0, 'Marks cannot be negative'],
    max: [100, 'Marks cannot exceed 100']
  },
  cpi: {
    type: Number,
    required: [true, 'CPI is required'],
    min: [0, 'CPI cannot be negative'],
    max: [10, 'CPI cannot exceed 10']
  },
  yearOfStudy: {
    type: Number,
    required: [true, 'Year of study is required'],
    min: [1, 'Year of study must be at least 1'],
    max: [4, 'Year of study cannot exceed 4']
  },
  achievements: [{
    type: String,
    trim: true
  }],
  certifications: [{
    type: String,
    trim: true
  }],
  projects: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ course: 1 });
userSchema.index({ yearOfStudy: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 