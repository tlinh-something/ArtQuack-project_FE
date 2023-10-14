
// import { useBlogsContext } from "../context/blog_context";
import Blog from "../Blog";
import blogs from "../BlogData"
import "../Blog.css";
const Pottery_blog = () => {

    return (
        <div className="blog-tabs">
            
                <div className="blog-tab-body">
                    
                {blogs.filter(blog=>blog.cateID==='pottery').map((blog) => (
                    <Blog key={blog.postID} {...blog} />
                ))}
                </div>
                
           
        </div>
    );
};

export default Pottery_blog;
