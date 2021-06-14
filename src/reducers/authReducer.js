import {
    LOGIN_USER,
    AUTH_ERROR
}
    from '../actions/types';

import isEmpty from 'is-empty';

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {},
    error: ''
};

const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                error: ''
            }
        case AUTH_ERROR:
            return {
                user: {},
                error: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;