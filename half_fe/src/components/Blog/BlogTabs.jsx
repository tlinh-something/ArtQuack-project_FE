import Course from "../Course";
import { useBlogsContext } from "../context/blog_context";
import Blog from "./Blog";
import blogs from "./BlogData"
import "./Blog.css";
const BlogTabs = () => {

    return (
        <div className="blog-tabs">
            <div className="blog-tab-body">
                {blogs.map((blog) => (
                    <Blog key={blog.postID} {...blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogTabs;
