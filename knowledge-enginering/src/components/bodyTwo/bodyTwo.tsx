import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import SVG assets
import codeSvg from '../../assets/se.svg';
import eeSvg from '../../assets/ee.svg';
import aeSvg from '../../assets/ae.svg';
import bmSvg from '../../assets/bm.svg';
import ceSvg from '../../assets/ce.svg';
import meSvg from '../../assets/me.svg';

interface Article {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  publishDate: string;
  author: string;
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Software':
      return 'bg-custom-blue';
    case 'Electrical':
      return 'bg-red-400'; // Changed to a more visible reddish color
    case 'Aerospace':
      return 'bg-gray-400'; // Slightly darkened for better visibility
    case 'Bio-Medical':
      return 'bg-green-400'; // Slightly darkened for better visibility
    case 'Civil':
      return 'bg-yellow-400'; // Slightly darkened for better visibility
    case 'Materials':
      return 'bg-purple-400'; // Slightly darkened for better visibility
    default:
      return 'bg-blue-600';
  }
};


const articles: Article[] = [
  { id: 1, title: 'Software Engineering Article', category: 'Software', imageUrl: codeSvg, publishDate: '2023-07-15', author: 'John Doe' },
  { id: 2, title: 'Electrical Engineering Article', category: 'Electrical', imageUrl: eeSvg, publishDate: '2023-07-14', author: 'Jane Smith' },
  { id: 3, title: 'Aerospace Engineering Article', category: 'Aerospace', imageUrl: aeSvg, publishDate: '2023-07-13', author: 'Alex Johnson' },
  { id: 4, title: 'Bio-Medical Engineering Article', category: 'Bio-Medical', imageUrl: bmSvg, publishDate: '2023-07-12', author: 'Emily Brown' },
  { id: 5, title: 'Civil Engineering Article', category: 'Civil', imageUrl: ceSvg, publishDate: '2023-07-11', author: 'Michael Lee' },
  { id: 6, title: 'Materials Engineering Article', category: 'Materials', imageUrl: meSvg, publishDate: '2023-07-10', author: 'Sarah Wilson' },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3) ? 0 : (day % 100 - 20) % 10] || 'th';
  return `${month} ${day}<sup>${suffix}</sup>, ${year}`;
};

const BodyTwo: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="flex-1 overflow-hidden relative flex flex-col">
      <h2 className="text-3xl font-bold text-center my-4">Jump Right In</h2>
      <div className="relative flex-1 flex items-center px-16 pb-4">
        <div 
          ref={scrollRef}
          className="flex w-full overflow-x-auto space-x-4 py-4 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {articles.map((article) => (
            <div key={article.id} className="flex-shrink-0">
              <div className="w-[250px] h-[300px] relative group cursor-pointer bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-8 ${getCategoryColor(article.category)} flex items-center justify-center z-10`}>
                  <div className="text-white text-sm transform -rotate-90 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: formatDate(article.publishDate) }} />
                </div>
                <div className="flex-grow flex items-center justify-center overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-tr-lg"
                  />
                </div>
                <div className="p-2 text-center bg-white relative z-20">
                  <h3 className="text-sm font-semibold">{article.title}</h3>
                  <p className="text-xs text-gray-600">{article.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-md z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default BodyTwo;