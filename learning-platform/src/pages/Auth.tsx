import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, User, LoginCredentials, requestPasswordReset } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    course: '',
    tenthMarks: '',
    twelfthMarks: '',
    cpi: '',
    yearOfStudy: '',
    achievements: '',
    certifications: '',
    projects: '',
    interests: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!isLogin) {
      if (!formData.firstName) errors.firstName = 'First name is required';
      if (!formData.lastName) errors.lastName = 'Last name is required';
      if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
      if (!formData.course) errors.course = 'Course is required';
      if (!formData.tenthMarks) errors.tenthMarks = '10th marks are required';
      if (!formData.twelfthMarks) errors.twelfthMarks = '12th marks are required';
      if (!formData.cpi) errors.cpi = 'CPI is required';
      if (!formData.yearOfStudy) errors.yearOfStudy = 'Year of study is required';
      if (!formData.interests) errors.interests = 'Interests are required';
    }

    // Common validations for both login and signup
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setError(Object.values(errors)[0] || null);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { user, token } = await loginUser({
          email: loginData.email,
          password: loginData.password
        });
        login(user, token);
        navigate('/dashboard');
      } else {
        const userData: Omit<User, 'id' | 'created_at'> = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          password: formData.password,
          course: formData.course,
          tenth_marks: parseFloat(formData.tenthMarks),
          twelfth_marks: parseFloat(formData.twelfthMarks),
          cpi: parseFloat(formData.cpi),
          year_of_study: parseInt(formData.yearOfStudy),
          achievements: formData.achievements || undefined,
          certifications: formData.certifications || undefined,
          projects: formData.projects || undefined,
          interests: formData.interests
        };

        const newUser = await registerUser(userData);
        const { token } = await loginUser({
          email: formData.email,
          password: formData.password
        });
        login(newUser, token);
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!resetEmail) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset(resetEmail);
      setResetSuccess(true);
      setTimeout(() => {
        setIsForgotPassword(false);
        setResetSuccess(false);
        setResetEmail('');
      }, 3000);
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isForgotPassword ? 'Reset Password' : (isLogin ? 'Sign in to your account' : 'Create your account')}
          </h2>
        </div>

        {resetSuccess ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">
              Password reset instructions have been sent to your email.
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={isForgotPassword ? handleForgotPassword : handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {isForgotPassword ? (
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="resetEmail" className="sr-only">Email address</label>
                  <input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      name="firstName"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      name="lastName"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    name="phoneNumber"
                    type="tel"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    name="course"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Course"
                    value={formData.course}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      name="tenthMarks"
                      type="number"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="10th marks"
                      value={formData.tenthMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      name="twelfthMarks"
                      type="number"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="12th marks"
                      value={formData.twelfthMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <input
                    name="cpi"
                    type="number"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="CPI"
                    value={formData.cpi}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <select
                    name="yearOfStudy"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                  >
                    <option value="">Select year of study</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="achievements"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Achievements (comma-separated)"
                    value={formData.achievements}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <textarea
                    name="certifications"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Certifications (comma-separated)"
                    value={formData.certifications}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <textarea
                    name="projects"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Projects (comma-separated)"
                    value={formData.projects}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <textarea
                    name="interests"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Interests (comma-separated)"
                    value={formData.interests}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Processing...' : (isForgotPassword ? 'Send Reset Instructions' : (isLogin ? 'Sign in' : 'Sign up'))}
              </button>
            </div>
          </form>
        )}

        <div className="text-center space-y-2">
          {!isForgotPassword && (
            <>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-indigo-600 hover:text-indigo-500 block w-full"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
              {isLogin && (
                <button
                  onClick={() => setIsForgotPassword(true)}
                  className="font-medium text-indigo-600 hover:text-indigo-500 block w-full"
                >
                  Forgot your password?
                </button>
              )}
            </>
          )}
          {isForgotPassword && (
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setResetEmail('');
                setResetSuccess(false);
              }}
              className="font-medium text-indigo-600 hover:text-indigo-500 block w-full"
            >
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth; 