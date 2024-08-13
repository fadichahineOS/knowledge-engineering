import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Image {
  id: string;
  url: string;
  position: 'left' | 'right' | 'center';
}

interface ArticleData {
  title: string;
  author: string;
  uploadDate: string;
  likes: number;
  dislikes: number;
  content: string;
  images: Image[];
}

const Article: React.FC<{ articleData: ArticleData }> = ({ articleData }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
      <Header />
      <main className="flex-grow flex flex-col">
        <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-4">{articleData.title}</h1>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Written by {articleData.author} | Uploaded {articleData.uploadDate}
            </p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-custom-blue hover:text-green-500 transition-colors">
                <ThumbsUp size={20} className="mr-1" />
                <span>{articleData.likes}</span>
              </button>
              <button className="flex items-center text-custom-blue hover:text-red-500 transition-colors">
                <ThumbsDown size={20} className="mr-1" />
                <span>{articleData.dislikes}</span>
              </button>
            </div>
          </div>
          <div className="prose max-w-none">
            {articleData.content.split('\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                <p className="mb-4 text-justify">{paragraph}</p>
                {articleData.images.map((image, imgIndex) => {
                  if (imgIndex === index) {
                    return (
                      <div 
                        key={image.id} 
                        className={`mb-4 ${
                          image.position === 'left' ? 'float-left mr-4' :
                          image.position === 'right' ? 'float-right ml-4' :
                          'mx-auto'
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={`Article image ${imgIndex + 1}`}
                          className="max-w-full h-auto"
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </React.Fragment>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Article;