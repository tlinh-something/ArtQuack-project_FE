//import { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Blog.css";


const Blog = (props)=> {
        //const {postID,title,cateID,userRoleID,content} = props
        const {postID,title,cateID,userRoleID} = props
        
        return (    
            <div className='post-body'>
                <h3 className='blog-name'>{cateID}</h3>
                {/* <div className='blog-topic'>
                    <Link to = {`/BlogPage/${topicID}`}>{topicID}</Link>
                </div> */}
                <div className='blog-content'>
                <Link to={`/${postID}`}>{title}</Link>
                    </div>
                <div className='blog-creator'>{userRoleID}</div>

                
            </div>
        );
        
    }






export default Blog;
