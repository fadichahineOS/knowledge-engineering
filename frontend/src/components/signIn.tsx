import React, { useState } from 'react';
import { Mail, Key } from 'lucide-react';
import SignInForm from './signInForm/signInForm';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000'; // Update this if your backend URL changes

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (data: Record<string, string>) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrUsername: data.emailOrPhone,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Successful login
        console.log('Sign-in successful');
        localStorage.setItem('token', responseData.token);
        // Redirect based on user role
        if (responseData.user.role === 'writer') {
          navigate('/writer-profile');
        } else if (responseData.user.role === 'reader') {
          navigate('/reader-profile');
        } else {
          navigate('/dashboard');
        }
      } else if (response.status === 403 && responseData.role === 'writer' && responseData.isApproved === false) {
        // Unapproved writer
        setError('Your writer account is pending approval. Please wait for admin approval.');
      } else {
        // Other error cases
        setError(responseData.message || 'An error occurred during login.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex h-screen bg-[#f6f6f6]">
      <div className="w-1/2 bg-cover bg-center" style={{backgroundImage: "url('/src/assets/blue.jpg')"}}>
        {/* Left side with background image */}
      </div>
      <div className="w-1/2 flex flex-col items-start p-12">
        <div className="mb-12 flex flex-col items-start -space-y-3">
          <span className="text-2xl font-bold">Knowledge</span>
          <span className="text-2xl font-bold text-custom-blue ml-[25%]">Engineering</span>
        </div>
        {error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}
        <SignInForm
          fields={[
            { 
              name: 'emailOrPhone', 
              type: 'text', 
              placeholder: 'E-mail or Phone Number', 
              icon: <Mail size={16} />,
              validation: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^\+?[1-9]\d{1,14}$/;
                return emailRegex.test(value) || phoneRegex.test(value) 
                  ? null 
                  : 'Invalid email or phone number';
              }
            },
            { 
              name: 'password', 
              type: 'password', 
              placeholder: 'Password',
              icon: <Key size={16} />
            }
          ]}
          onSubmit={handleSignIn}
        />
      </div>
    </div>
  );
};

export default SignIn;