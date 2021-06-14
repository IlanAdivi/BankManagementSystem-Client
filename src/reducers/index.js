import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import bankAccountReducer from './bankAccountReducer';

export const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    bankAccount: bankAccountReducer
});