import React from 'react';
import './BankAccounts.css';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { deleteBankAccount } from '../../../../actions';

function BankAccount({ bankAccount, styles, bankOptions }) {
    const dispatch = useDispatch();

    const onClickDeleteBankAccount = (e, id) => {
        e.preventDefault();
        dispatch(deleteBankAccount(id));
    };

    return (
        <div className="bank-account-item-row">
            <div className="bank-account-item-column">
                <div className="bank-account-type">בנק</div>
                <Select
                    styles={styles}
                    classNamePrefix="react-select__control"
                    className="bank-account-dropdown"
                    value={bankOptions.filter(function (bankOption) {
                        return bankOption.value === bankAccount.name;
                    })}
                    readOnly
                />
            </div>


            <div className="bank-account-item-column">
                <div className="bank-account-type">סניף</div>
                <input name="branch" defaultValue={bankAccount.branch} readOnly />
            </div>

            <div className="bank-account-item-column">
                <div className="bank-account-type">חשבון</div>
                <input name="accountNumber" defaultValue={bankAccount.accountNumber} readOnly/>
            </div>

            <div className="bank-account-item-column">
                <button
                    className="clear-button"
                    onClick={e => {
                        e.preventDefault();
                        onClickDeleteBankAccount(e, bankAccount.bankAccountId);
                    }}>הסר</button>
            </div>
        </div>
    );
}

export default BankAccount;