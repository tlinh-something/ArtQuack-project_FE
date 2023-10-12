// import BlogData from  "../Blog/BlogData";
// import Blog from "./Blog";
// import { useBlogsContext } from "../context/blog_context";
import BlogList from "./BlogList"
const BlogPage = () => {
    // const {blogs} = useBlogsContext();
    return (
        <div className="blog-page">
             <BlogList/>
        </div>
       
    )
}
export default BlogPage;