import { GET_ALL_POST_SUCCESS, GET_ALL_POST_FAIL, CREATE_POST_SUCCESS, CREATE_POST_FAIL } from "../actions/types";

const initialState = {};

const posts = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_POST_SUCCESS:
            return { data: payload.data };

        case GET_ALL_POST_FAIL:
            return { data: "" };

        case CREATE_POST_SUCCESS:
            return { ...state, data: [...state.data, payload.data] };

        case CREATE_POST_FAIL:
            //return { data: "" };
            return { ...state, data: [...state.data] };
        default:
            return state;
    }
}

export default posts