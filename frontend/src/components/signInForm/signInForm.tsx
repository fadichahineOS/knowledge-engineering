import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Field {
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  validation?: (value: string) => string | null;
}

interface SignInFormProps {
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  submitButtonText?: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ fields, onSubmit, submitButtonText = "Sign In" }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.validation) {
        const error = field.validation(formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    if (Object.keys(newErrors).length === 0) {
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        onSubmit(formData);
        return;
      }
    }

    setErrors(newErrors);
  };

  const handleGoBack = () => {
    navigate('/');  // Navigate to the root path (landing page)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-1/2">
      {fields.map((field) => (
        <div key={field.name} className="relative">
          <div className="relative">
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 rounded-md border-2 border-custom-blue focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white text-custom-blue placeholder-custom-blue/50`}
              required
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-blue">
              {field.icon}
            </div>
          </div>
          {errors[field.name] && (
            <p className="mt-1 text-red-500 text-sm">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <div className="flex justify-around items-center">
        <button
          type="submit"
          className="w-[40%] bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300"
        >
          {submitButtonText}
        </button>
        <button
          type="button"
          onClick={handleGoBack}
          className="w-[40%] bg-gray-200 text-custom-blue py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </form>
  );
};

export default SignInForm;