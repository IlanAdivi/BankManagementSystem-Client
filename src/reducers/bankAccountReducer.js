import {
    ADD_BANK_ACCOUNT,
    BANK_ACCOUNT_ERROR,
    DELETE_BANK_ACCOUNT,
    GET_ALL_BANK_ACCOUNTS_BY_USER_ID
}
    from '../actions/types';

const DEFAULT_STATE = {
    bankAccounts: [],
    error: ''
};

const bankAccountReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_BANK_ACCOUNTS_BY_USER_ID:
            return {
                ...state,
                bankAccounts: action.payload,
                error: ''
            }
        case ADD_BANK_ACCOUNT:
            return {
                ...state,
                bankAccounts: [...state.bankAccounts, action.payload],
                error: ''
            }
        case DELETE_BANK_ACCOUNT:
            return {
                bankAccounts: state.bankAccounts.filter(bankAccount =>
                    bankAccount.bankAccountId !== action.payload.bankAccountId ?
                        bankAccount
                        :
                        null
                ),
            }
        case BANK_ACCOUNT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default bankAccountReducer;