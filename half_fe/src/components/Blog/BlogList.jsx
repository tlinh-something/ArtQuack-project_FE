import { useState } from "react";
import Blog from "./Blog";
// import BlogData from "./BlogData";
import BlogTabs from "./BlogTabs";
import { useBlogsContext } from "../context/blog_context";
import "./Blog.css";
const BlogList = ()=> { 
    const blogs = useBlogsContext();
    return(
        <div className="container ">
            <div className="blogs-list-top">
                <h4>Blog testing</h4>
            </div>
            <BlogTabs blogs = {blogs}/>
        </div>
    )
}
export default BlogList