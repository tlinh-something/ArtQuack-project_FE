import { useState } from "react";
import Blog from "./Blog";
// import BlogData from "./BlogData";
import { Link } from "react-router-dom";
import BlogTabs from "./BlogTabs";
import { useBlogsContext } from "../context/blog_context";
import blogs from "./BlogData";
import Pottery_blog from "../Blog/blog-types/pottery_blog";
import Oil_blog from "./blog-types/oil_blog";
import "./Blog.css";
const BlogList = ()=> { 
    const posts = useBlogsContext();
    const PotteryPosts = [...blogs.filter(blog=>blog.cateID==='pottery').map((blog) => (
        <Blog key={blog.postID} {...blog} />
    ))]
    const OilPosts = [...blogs.filter(blog=>blog.cateID==='oil').map((blog) => (
        <Blog key={blog.postID} {...blog} />
    ))]
    const InlayPosts = [...blogs.filter(blog=>blog.cateID==='inlay').map((blog) => (
        <Blog key={blog.postID} {...blog} />
    ))]
    
    const DataComponent = ({ data }) => {
        const [startIndex, setStartIndex] = useState(0);
        const endIndex = startIndex + 3;
        const currentData = data.slice(startIndex, endIndex);
      
        const handleNext = () => {
          if (startIndex + 3 < data.length) {
            setStartIndex(startIndex + 3);
          }
        };
      
        const handlePrev = () => {
          if (startIndex - 3 >= 0) {
            setStartIndex(startIndex - 3);
          }
        };
      
        return (
          <div className="post-carousel">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            <button onClick={handlePrev} disabled={startIndex === 0}>
              {'<'}
            </button>
            {currentData.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', margin: '15px 20px', padding: '10px' }}>
                    {item}
                </div>
            ))}
            <button onClick={handleNext} disabled={startIndex + 3 >= data.length}>
              {'>'}
            </button>
            </div>
          </div>
        );
      };
      
    return(
        <div className="container ">
            <div className="blogs-list-top">
                <h4>Blog testing</h4>
            </div>
            <div className="blogs-list-body">
            <div className="blog-categories">
                <div className="cate-title">
                <h2>POTTERY</h2>
                
                <span className="show-all">See all from Pottery</span>
                <div className="dataComponent">
                <DataComponent data={PotteryPosts} />
                </div>
                
                    
                </div>
            
            </div>
            <div className="blog-categories">
            <div className="cate-title">
                <h2>OIL</h2>
                
                <button className="show-all">See all from Oil</button>
                <div className="dataComponent">
                <DataComponent data={OilPosts} />
                </div>
                
                </div>
            
            </div>
            <div className="blog-categories">
            <div className="cate-title">
                <h2>INLAY</h2>
                
                <span className="show-all">See all from Inlay </span>
                <div className="dataComponent">
                <DataComponent data={InlayPosts} />
                </div>
                
                </div>
            
            </div>  
            </div>
            
            
        </div>
    )
}
export default BlogList