import React from 'react';
import { Mail, Key, User } from 'lucide-react';
import SignInForm from './signInForm/signInForm';

const SignUpPage: React.FC = () => {
  const handleSignUp = (data: Record<string, string>) => {
    console.log('Sign up data:', data);
    // Handle sign up logic here
  };

  return (
    <div className="flex h-screen bg-[#f6f6f6]">
      <div className="w-1/2 bg-cover bg-center" style={{backgroundImage: "url('/src/assets/blue-leds.jpg')"}}>
        {/* Left side with background image */}
      </div>
      <div className="w-1/2 flex flex-col items-start p-12">
        <div className="mb-12 flex flex-col items-start -space-y-3">
          <span className="text-2xl font-bold">Knowledge</span>
          <span className="text-2xl font-bold text-custom-blue ml-[25%]">Engineering</span>
        </div>
        <SignInForm
          fields={[
            { 
              name: 'fullName', 
              type: 'text', 
              placeholder: 'Full Name', 
              icon: <User size={16} />,
              validation: (value) => value.length > 0 ? null : 'Full name is required'
            },
            { 
              name: 'email', 
              type: 'email', 
              placeholder: 'Email Address', 
              icon: <Mail size={16} />,
              validation: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? null : 'Invalid email address';
              }
            },
            { 
              name: 'password', 
              type: 'password', 
              placeholder: 'Password',
              icon: <Key size={16} />,
              validation: (value) => value.length >= 8 ? null : 'Password must be at least 8 characters'
            },
            { 
              name: 'confirmPassword', 
              type: 'password', 
              placeholder: 'Confirm Password',
              icon: <Key size={16} />,
              validation: (value) => value.length >= 8 ? null : 'Password must be at least 8 characters'
            }
          ]}
          onSubmit={handleSignUp}
          submitButtonText="Sign Up"
        />
        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <a href="/signin" className="text-custom-blue hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;