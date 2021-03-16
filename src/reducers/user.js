import { GET_USER_SUCCESS, GET_USER_FAIL } from "../actions/types";

const initialState = {};

const message = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USER_SUCCESS:
            return { data: payload.data };

        case GET_USER_FAIL:
            return { data: "" };

        default:
            return state;
    }
}

export default message