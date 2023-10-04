import React, {useContext, useReducer, useEffect} from "react";
import reducer from "../reducers/course_reducer";
import courses from "../utils/data";
import { GET_COURSES, GET_CATEGORIES, GET_SINGLE_COURSE } from "../action";

const initialState = {
    courses: [],
    single_course: {},
    categories: [],
}

const CoursesContext = React.createContext();

export const CoursesProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCourse = () => {
        dispatch({type: GET_COURSES, payload: courses})
    }

    const fetchSingleCourse = (id) => {
        const singleCourse = courses.find(course => course.id === id);
        dispatch({type: GET_SINGLE_COURSE, payload: singleCourse})
    }

    const fetchCategories = () => {
        const categories = [...new Set(courses.map(item => item.category))];
        dispatch({type: GET_CATEGORIES, payload: categories});
    }

    useEffect(() => {
        fetchCourse();
        fetchCategories();
    }, []);

    return (
        <CoursesContext.Provider value = {{
            ...state,
            fetchSingleCourse
        }}>
            {children}
        </CoursesContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCoursesContext = () => {
    return useContext(CoursesContext);
}