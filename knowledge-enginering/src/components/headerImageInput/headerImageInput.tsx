import React, { useState, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';

const HeaderImageInput: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-[40vh] bg-gray-100 relative overflow-hidden">
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Header"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-xl font-semibold text-gray-700">Upload header image</p>
            <Upload size={32} className="mx-auto text-gray-400" />
          </div>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default HeaderImageInput;