import { GET_USER_SUCCESS, GET_USER_FAIL, SET_MESSAGE } from "./types";
import usersServices from "../services/users.services";

export const getUsers = () => (dispatch) => {
    return usersServices.getUsers().then((response) => {
        console.log("res ==>", response);
        /** this is for set users data  */
        dispatch({
            type: GET_USER_SUCCESS,
            payload: response
        })
        /** this is for set message  */
        dispatch({
            type: SET_MESSAGE,
            payload: "Users get successfully",
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
            type: GET_USER_FAIL
        })

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    })
}