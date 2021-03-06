import { GET_ALL_POST_SUCCESS, GET_ALL_POST_FAIL, SET_MESSAGE, CREATE_POST_FAIL, CREATE_POST_SUCCESS } from "./types";
import postsServices from "../services/posts";

export const getAllPosts = () => (dispatch) => {
    return postsServices.getAllPosts().then((response) => {
        console.log("res ==>", response);
        /** this is for set users data  */
        dispatch({
            type: GET_ALL_POST_SUCCESS,
            payload: response
        })
        /** this is for set message  */
        dispatch({
            type: SET_MESSAGE,
            payload: "Posts get successfully",
        });
        return Promise.resolve();
    }, (error) => {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: GET_ALL_POST_FAIL
        })

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    })
}


export const createNewPost = (newpost) => (dispatch) => {
    return postsServices.createNewPost(newpost).then((response) => {
        console.log("res ==>", response);
        /** this is for set users data  */
        dispatch({
            type: CREATE_POST_SUCCESS,
            payload: response
        })
        /** this is for set message  */
        dispatch({
            type: SET_MESSAGE,
            payload: "Posts get successfully",
        });
        return Promise.resolve();
    }, (error) => {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: CREATE_POST_FAIL
        })

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    })
}