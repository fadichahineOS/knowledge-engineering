import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this URL to match your backend URL

const createArticle = async (title: string, content: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/articles`, { title, content }, {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header here if required
        // 'Authorization': `Bearer ${yourAuthToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

const ArticleBuilder: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleEditorChange = (content: string, editor: any) => {
    setContent(content);
  };

  const handleSubmit = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setIsLoading(true);
      setError(null);
      try {
        const result = await createArticle(title, content);
        console.log('Article created:', result);
        // Reset form or show success message
        setTitle('');
        setContent('');
        editorRef.current.setContent('');
        alert('Article created successfully!');
      } catch (err) {
        setError('Failed to create article. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
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
      <Editor
        apiKey=""
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={handleEditorChange}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`mt-4 bg-custom-blue text-white px-6 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Submitting...' : 'Submit Article'}
      </button>
    </div>
  );
};

export default ArticleBuilder;