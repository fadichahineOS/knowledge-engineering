import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Image {
  id: string;
  url: string;
  position: 'left' | 'right' | 'center';
}

const PostBuilder: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<Image[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: Image = {
          id: Date.now().toString(),
          url: reader.result as string,
          position: 'center',
        };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagePositionChange = (id: string, position: 'left' | 'right' | 'center') => {
    setImages(images.map(img => img.id === id ? { ...img, position } : img));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
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
      <ReactQuill value={content} onChange={handleContentChange} />
      <div className="my-4">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4"
                    >
                      <img src={image.url} alt="Uploaded content" className="max-w-full h-auto" />
                      <select
                        value={image.position}
                        onChange={(e) => handleImagePositionChange(image.id, e.target.value as 'left' | 'right' | 'center')}
                        className="mt-2"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-custom-blue text-white px-4 py-2 rounded"
      >
        Submit Article
      </button>
    </div>
  );
};

export default PostBuilder;

