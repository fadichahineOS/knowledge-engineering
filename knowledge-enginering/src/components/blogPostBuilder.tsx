import React from 'react';
import Header from './header/header';
import HeaderImageInput from './headerImageInput/headerImageInput';

const BlogPostBuilder: React.FC = () => {
  return (
    <>
      <Header />
      <HeaderImageInput />
      {/* Add other components here */}
    </>
  );
};

export default BlogPostBuilder;