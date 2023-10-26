import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogsContext } from '../context/blog_context';
const SingleBlogPage = () => {
    const {id} =useParams();
    const {fetchSinglePost} = useBlogsContext;
    //const {fetchSinglePost, single_post} = useBlogsContext;
    useEffect(() => {
        fetchSinglePost(id);
    },[fetchSinglePost, id]);

    //const {id: postID,userRoleID,cateID,topicID,content} = single_post;
        return (
            <div>
                
            </div>
        );
}




export default SingleBlogPage;
