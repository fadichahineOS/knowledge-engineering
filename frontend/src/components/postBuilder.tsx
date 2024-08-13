import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ArticleBuilder: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef<any>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleEditorChange = (content: string, editor: any) => {
    setContent(content);
  };

  const handleSubmit = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log({ title, content });
      // Here you would typically send the article data to your backend
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
        apiKey="7i78e68qwtspwjh0ake12ac6auzgh3xqjorizhee6z2xnr8a"
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
      <button
        onClick={handleSubmit}
        className="mt-4 bg-custom-blue text-white px-6 py-2 rounded"
      >
        Submit Article
      </button>
    </div>
  );
};

export default ArticleBuilder;