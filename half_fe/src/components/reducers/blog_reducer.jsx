import { GET_POSTS,GET_SINGLE_POST } from "../action";

const blog_reducer = (state, action) => {
    if(action.type === GET_POSTS){
        return {
            ...state,
            posts: action.payload
        }
    }

    if(action.type === GET_SINGLE_POST){
        return {
            ...state,
            single_post: action.payload
        }
    }

    

    throw new Error(`No matching "${action.type}" - action type`);
}

export default blog_reducer;