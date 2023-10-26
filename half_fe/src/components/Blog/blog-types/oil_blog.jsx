
//import { useBlogsContext } from "../context/blog_context";
import Blog from "../Blog";
import blogs from "../BlogData"
import "../Blog.css";
const Oil_blog = () => {

    return (
        <div className="blog-tabs">
            <div className="blog-tab-body">
                
                    
                {blogs.filter(blog=>blog.cateID==='oil').map((blog) => (
                    <Blog key={blog.postID} {...blog} />
                ))}
               
                
            </div>
        </div>
    );
};

export default Oil_blog;
