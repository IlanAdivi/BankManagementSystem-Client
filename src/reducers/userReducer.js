import {
    FETCH_USER, UPDATE_USER, USER_ERROR
}
    from '../actions/types';

const DEFAULT_STATE = {
    user: {},
    error: ''
};

const userReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                user: action.payload,
                error: ''
            }

            case UPDATE_USER:
                return {
                    user: action.payload,
                    error: ''
                }
        case USER_ERROR:
            return {
                user: {},
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;