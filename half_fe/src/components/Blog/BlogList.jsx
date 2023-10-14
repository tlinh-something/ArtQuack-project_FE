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
    return(
        <div className="container ">
            <div className="blogs-list-top">
                <h4>Blog testing</h4>
            </div>
            <div className="blogs-list-body">
            <div className="blog-categories">
                <div className="cate-title">
                <h2>POTTERY</h2>
                <span className="show-all">See all</span>
                </div>
            <Pottery_blog blogs = {posts}/>
            </div>
            <div className="blog-categories">
            <div className="cate-title">
                <h2>OIL</h2>
                <span className="show-all">See all</span>
                </div>
            <Oil_blog blogs = {posts}/>
            </div>
            <div className="blog-categories">
            <div className="cate-title">
                <h2>INLAY</h2>
                <span className="show-all">See all</span>
                </div>
            <BlogTabs blogs = {posts}/>
            </div>  
            </div>
            
            
        </div>
    )
}
export default BlogList