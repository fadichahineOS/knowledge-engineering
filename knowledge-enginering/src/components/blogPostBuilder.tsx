import React from 'react';
import Header from './header/header';
import HeaderImageInput from './headerImageInput/headerImageInput';
import ContentGrid from './contentGrid/ contentGrid';

const BlogPostBuilder: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeaderImageInput />
      <ContentGrid/>

    </div>
  );
};

export default BlogPostBuilder;