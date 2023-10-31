import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogsContext } from '../context/blog_context';
const SingleBlogPage = () => {
    const {title} =useParams();
    // const {fetchSinglePost} = useBlogsContsext;
    const {fetchSinglePost, single_post} = useBlogsContext;
    useEffect(() => {
        fetchSinglePost(title);
    },[]);

    const {title: postID,userRoleID,cateID,topicID,content} = single_post;
        return (
            <div>   
                {cateID}
            </div>
        );
}




export default SingleBlogPage;
