import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Image {
  id: string;
  file: File;
  preview: string;
  position: 'left' | 'center' | 'right';
}

const PostBuilder: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: Image[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        position: 'center'
      }));
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const handleImagePositionChange = (id: string, position: 'left' | 'center' | 'right') => {
    setImages(prevImages => 
      prevImages.map(img => 
        img.id === id ? { ...img, position } : img
      )
    );
  };

  const handleSubmit = () => {
    // Here you would typically send the article data to your backend
    console.log({ title, content, images });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter article title"
        className="w-full text-2xl font-bold mb-4 p-2 border rounded"
      />
      <ReactQuill value={content} onChange={handleContentChange} className="mb-4" />
      <div className="mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          multiple
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Images
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {images.map((image) => (
          <div key={image.id} className="border p-2 rounded">
            <img src={image.preview} alt="Preview" className="w-full h-32 object-cover mb-2" />
            <select
              value={image.position}
              onChange={(e) => handleImagePositionChange(image.id, e.target.value as 'left' | 'center' | 'right')}
              className="w-full p-1 border rounded"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-6 py-2 rounded"
      >
        Submit Article
      </button>
    </div>
  );
};

export default PostBuilder;