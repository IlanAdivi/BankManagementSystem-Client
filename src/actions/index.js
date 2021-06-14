import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { ADD_BANK_ACCOUNT, AUTH_ERROR, BANK_ACCOUNT_ERROR, DELETE_BANK_ACCOUNT, FETCH_USER, GET_ALL_BANK_ACCOUNTS_BY_USER_ID, LOGIN_USER, UPDATE_USER, USER_ERROR } from './types';

const URL_SERVER = 'https://localhost:44395';

////Users
export const loginUser = user => dispatch => {
    axios
        .post(`${URL_SERVER}/User/Login`, user, { withCredentials: true })
        .then(response => {
            const { token } = response.data;
            localStorage.setItem('token', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            })
        }
        );
};

export const logoutUser = () => dispatch => {
    axios.get(`${URL_SERVER}/User/Logout`)
        .then(res => {
            localStorage.removeItem("token");
            setAuthToken(false);
            dispatch(setCurrentUser({}));
        })
        .catch(err => {
            console.log(err);
        });
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: LOGIN_USER,
        payload: decoded
    };
};

export const fetchUserById = id => dispatch => {
    axios
        .get(`${URL_SERVER}/User/GetById/${id}`)
        .then(response => {
            dispatch({
                type: FETCH_USER,
                payload: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: USER_ERROR,
                payload: err.response.data
            })
        }
        );
};

export const updateUserById = (updateUser, id, history) => dispatch => {
    axios
        .put(`${URL_SERVER}/User/UpdateById/${id}`, updateUser)
        .then(response => {
            dispatch({
                type: UPDATE_USER,
                payload: response.data
            });
            history.push('/bankAccounts');
        })
        .catch(err => {
            dispatch({
                type: USER_ERROR,
                payload: err.response.data
            })
        }
        );
};

////Bank Accounts
export const getAllBankAccountsByUserId = userId => dispatch => {
    axios
        .get(`${URL_SERVER}/BankAccount/GetAllBankAccountsByUserId/${userId}`)
        .then(response => {
            dispatch({
                type: GET_ALL_BANK_ACCOUNTS_BY_USER_ID,
                payload: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: BANK_ACCOUNT_ERROR,
                payload: err.response.data
            })
        }
        );
};

export const addBankAccount = (bankAccount, userId) => dispatch => {
    axios
        .post(`${URL_SERVER}/BankAccount/Create/${userId}`, bankAccount)
        .then(response => {
            dispatch({
                type: ADD_BANK_ACCOUNT,
                payload: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: BANK_ACCOUNT_ERROR,
                payload: err.response.data
            })
        }
        );
};

export const loanBankAccount = async (loanDetails, userId) => {
    try {
        const response = await axios.post(`${URL_SERVER}/BankAccount/Loan/${userId}`, loanDetails)
        return response;
    } catch (err) {
        return err.response.data;
    }
};

export const deleteBankAccount = bankAccountId => dispatch => {
    axios
        .delete(`${URL_SERVER}/BankAccount/Delete/${bankAccountId}`)
        .then(response => {
            dispatch({
                type: DELETE_BANK_ACCOUNT,
                payload: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: BANK_ACCOUNT_ERROR,
                payload: err.response.data
            })
        }
        );
};

export const getAllBankOptions = async () => {
    try {
        const response = await axios.get(`${URL_SERVER}/BankAccount/GetAllBanks`)
        return response;
    } catch (err) {
        return err;
    }
};