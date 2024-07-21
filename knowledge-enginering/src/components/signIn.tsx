import React from 'react';
import { Mail, Key } from 'lucide-react';
import SignInForm from './signInForm/signInForm';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = (data: Record<string, string>) => {
    console.log('Sign in data:', data);
    // Here you would typically make an API call to authenticate the user
    // For this example, we'll simulate a successful sign-in
    
    // Simulating an API call
    setTimeout(() => {
      // Assume sign-in is successful
      console.log('Sign-in successful');
      // Redirect to the writer profile page
      navigate('/writer-profile');
    }, 1000);
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