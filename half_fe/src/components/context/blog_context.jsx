import React, {useContext, useReducer, useEffect} from "react";
import reducer from "../reducers/blog_reducer";
//import courses from "../utils/data";
import { GET_POSTS, GET_SINGLE_POST, GET_CATEGORIES} from "../action";

const initialState = {
    blogs: [],
    single_blog: {},
    categories: [],
}

const BlogContext = React.createContext();

export const BlogProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchBlog = () => {
        dispatch({type: GET_POSTS, payload: initialState.blogs})
    }

    const fetchSingleBlog= (id) => {
        const singleBlog= initialState.blogs.find(blog => blog.cateID === id);
        dispatch({type: GET_SINGLE_POST, payload: singleBlog})
    }
    const fetchCategories = () => {
        const categories = [...new Set(initialState.blogs.map(item => item.cateID))];
        dispatch({type: GET_CATEGORIES, payload: categories});
        // dispatch({type: GET_BLOG_CATEGORIES, payload: categories});
    }
   

    useEffect(() => {
        fetchBlog();
        fetchCategories();
    }, []);

    return (
        <BlogContext.Provider value = {{
            ...state,
            fetchSingleBlog
        }}>
            {children}
        </BlogContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBlogsContext = () => {
    return useContext(BlogContext);
}