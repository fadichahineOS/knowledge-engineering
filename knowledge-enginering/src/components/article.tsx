import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import articleData from './article-data-json.json';

const ArticlePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="w-full h-[20vh] overflow-hidden">
          <img
            src={articleData.imageUrl}
            alt="Article header image"
            className="w-full h-full object-cover"
          />
        </div>
        <article className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-8">
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
            {articleData.content.map((paragraph, index) => (
              <React.Fragment key={index}>
                <p className="mb-4 text-justify">{paragraph}</p>
                {index === Math.floor(articleData.content.length / 2) && (
                  <div className="float-right ml-4 mb-4 w-1/3">
                    <img
                      src={articleData.imageUrl}
                      alt="Inline article image"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;