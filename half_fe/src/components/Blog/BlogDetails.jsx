import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Blog from './Blog';
const BlogDetails = () => {
  const { postID } = useParams();
  const [blog, setBlog] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:3000/blogs')
      .then(res => {
        setBlog(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  if (!blog) {
    return <div>Blog not found.</div>;
  }
  const PotteryPosts = [...blog.filter(blog=>blog.postID===postID).map((blog) => (
    <Blog key={blog.postID} {...blog} />
))]
  return (
    <div>
       {postID};
       {title};
    </div>
  );
};

export default BlogDetails;