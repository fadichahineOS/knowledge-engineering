import React, { useRef, useEffect } from 'react';
import Header from './header/header';
import { Mail, Phone, Edit, Lock, Settings, Users } from 'lucide-react';

interface Article {
  title: string;
  category: string;
  imageUrl: string;
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Software':
      return 'bg-custom-blue';
    case 'Electrical':
      return 'bg-red-400';
    case 'Civil':
      return 'bg-yellow-400';
    case 'Mechanical':
      return 'bg-green-400';
    case 'Chemical':
      return 'bg-purple-400';
    default:
      return 'bg-custom-blue';
  }
};

const WriterProfile: React.FC = () => {
  const writerName = "Ben Granger";
  const writerEmail = "Bengranger@windowslive.com";
  const writerPhone = "+44 7755 775544";
  const writerImageUrl = "/src/assets/profile.svg";
  const followerCount = 1234;
  const followingCount = 567;

  const aboutText = `Hello everyone! I'm an avid blogger with a passion for exploring the fascinating world of engineering organizations. Through my blog, I aim to share insights, news, and stories about the diverse range of professional bodies that support and advance the field of engineering. From the Institution of Mechanical Engineers (IMechE) to the Institute of Electrical and Electronics Engineers (IEEE), I delve into the history, mission, and impact of these esteemed institutions. By highlighting their contributions to research, education, and industry collaboration, I hope to inspire aspiring engineers and foster a deeper appreciation for the vital role these bodies play in shaping our world. `;

  const articles: Article[] = [
    { title: "Software Engineering Article 1", category: "Software", imageUrl: "/src/assets/se.svg" },
    { title: "Software Engineering Article 2", category: "Software", imageUrl: "/src/assets/bigSe.jpg" },
    { title: "Electrical Engineering Article", category: "Electrical", imageUrl: "/src/assets/ee.svg" },
    { title: "Civil Engineering Article", category: "Civil", imageUrl: "/src/assets/ce.svg" },
    { title: "Mechanical Engineering Article", category: "Mechanical", imageUrl: "/src/assets/me.svg" },
    { title: "Chemical Engineering Article", category: "Chemical", imageUrl: "/src/assets/ce.svg" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
      container.scrollLeft = scrollAmount;
    };

    const intervalId = setInterval(scroll, 16);

    const keepAlive = setInterval(() => {
      container.scrollLeft += 1;
      setTimeout(() => {
        container.scrollLeft -= 1;
      }, 50);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      clearInterval(keepAlive);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f6]">
      <Header />
      <main className="flex justify-around items-center w-[100vw] h-[90vh] p-8">
        <div className="rounded-[25px] overflow-hidden" style={{ height: '75vh', width: '25vw' }}>
          <img src={writerImageUrl} alt={writerName} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-between h-[75vh]" style={{ width: '60vw' }}>
          <div className="flex flex-col items-start w-full">
            <div className="flex justify-between items-center w-full mb-4">
              <h1 className="text-4xl font-bold">{writerName}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Users size={20} className="mr-2 text-custom-blue" />
                  <span className="font-semibold">{followerCount}</span>
                  <span className="text-gray-600 ml-1">Followers</span>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="mr-2 text-custom-blue" />
                  <span className="font-semibold">{followingCount}</span>
                  <span className="text-gray-600 ml-1">Following</span>
                </div>
              </div>
            </div>
            <p className="flex items-center text-gray-600 mb-2">
              <Mail size={20} className="mr-2" />
              {writerEmail}
            </p>
            <p className="flex items-center text-gray-600 mb-4">
              <Phone size={20} className="mr-2" />
              {writerPhone}
            </p>
            <div className="flex space-x-4 mb-6">
              <button className="flex items-center bg-custom-blue text-white px-6 py-3 rounded-md">
                <Edit size={20} className="mr-2" />
                Write New Article
              </button>
              <button className="flex items-center bg-gray-200 text-gray-700 px-6 py-3 rounded-md">
                <Lock size={20} className="mr-2" />
                Change Password
              </button>
              <button className="flex items-center bg-gray-200 text-gray-700 px-6 py-3 rounded-md">
                <Settings size={20} className="mr-2" />
                Settings
              </button>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed">{aboutText}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Articles</h2>
            <div className="relative flex items-center" style={{ height: '300px' }}>
              <div 
                ref={scrollRef}
                className="flex w-full overflow-x-hidden py-4 scrollbar-hide"
              >
                {[...articles, ...articles].map((article, index) => (
                  <div key={`${article.title}-${index}`} className="flex-shrink-0 px-2">
                    <div className="w-[250px] h-[280px] relative group cursor-pointer bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
                      <div className={`absolute left-0 top-0 bottom-0 w-8 ${getCategoryColor(article.category)} flex items-center justify-center z-10`}>
                        <div className="text-white text-sm transform -rotate-90 whitespace-nowrap">
                          {article.category}
                        </div>
                      </div>
                      <div className="flex-grow flex items-center justify-center overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 text-center bg-white relative z-20">
                        <h3 className="text-sm font-semibold">{article.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f6f6f6] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f6f6f6] to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WriterProfile;