import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, User, Briefcase, Key } from 'lucide-react';
import SignInForm from './signInForm/signInForm';

const ContactUs: React.FC = () => {
  const navigate = useNavigate();

  const handleWriterSignup = async (data: Record<string, string>) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/writer-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Writer signup failed');
      }

      const result = await response.json();
      console.log('Writer signup successful:', result);
      navigate('/contact-confirmation');
    } catch (error) {
      console.error('Writer signup error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex h-screen bg-[#f6f6f6]">
      <div className="w-1/2 bg-cover bg-center" style={{backgroundImage: "url('/src/assets/engine.jpg')"}}>
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
              name: 'firstName', 
              type: 'text', 
              placeholder: 'First Name', 
              icon: <User size={16} />,
              validation: (value) => value.length > 0 ? null : 'First name is required'
            },
            { 
              name: 'lastName', 
              type: 'text', 
              placeholder: 'Last Name', 
              icon: <User size={16} />,
              validation: (value) => value.length > 0 ? null : 'Last name is required'
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
              name: 'phoneNumber', 
              type: 'tel', 
              placeholder: 'Phone Number',
              icon: <Phone size={16} />,
              validation: (value) => {
                const phoneRegex = /^\+?[1-9]\d{1,14}$/;
                return phoneRegex.test(value) ? null : 'Invalid phone number';
              }
            },
            { 
              name: 'discipline', 
              type: 'text', 
              placeholder: 'Engineering Discipline/Interest',
              icon: <Briefcase size={16} />,
              validation: (value) => value.length > 0 ? null : 'Engineering discipline/interest is required'
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
          onSubmit={handleWriterSignup}
          submitButtonText="Sign Up as Writer"
        />
      </div>
    </div>
  );
};

export default ContactUs;