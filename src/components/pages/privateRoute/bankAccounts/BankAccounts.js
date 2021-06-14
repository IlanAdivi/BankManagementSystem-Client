import React, { useCallback, useEffect, useState } from 'react';
import './BankAccounts.css';
import './Button.css';
import Navbar from '../../../navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { addBankAccount, getAllBankAccountsByUserId, getAllBankOptions } from '../../../../actions';
import BankAccount from './BankAccount';

function BankAccounts() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [bankOptions, setBankOptions] = useState([]);
    const [name, setName] = useState('');
    const [branch, setBranch] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const user = useSelector(state => {
        return state.user.user;
    });

    const bankAccounts = useSelector(state => {
        return state.bankAccount.bankAccounts;
    });

    const error = useSelector(state => {
        return state.bankAccount.error;
    });

    const getAllBankOptionsFromAPI = async () => {
        const response = await getAllBankOptions();
        if (response.status === 200) {
            setBankOptions(response.data);
        }
    };

    const getAllBankAccountsFromAPI = useCallback(id => {
        dispatch(getAllBankAccountsByUserId(id));
    }, [dispatch]);

    useEffect(() => {
        getAllBankAccountsFromAPI(user.userId);
    }, [getAllBankAccountsFromAPI, user.userId]);

    useEffect(() => {
        getAllBankOptionsFromAPI();
    }, []);

    const { companyName, companyNumber } = user;

    const onChangeName = e => {
        setName(e.value);
    };

    const onChangeBranch = e => {
        setBranch(e.target.value);
    };

    const onChangeAccountNumber = e => {
        setAccountNumber(e.target.value);
    };

    const onClickAddBankAccountButton = id => {
        const newBankAccount = {
            name,
            branch,
            accountNumber
        };

        dispatch(addBankAccount(newBankAccount, id));
        setName('');
        setBranch('');
        setAccountNumber('');
    };

    const onClickBackButton = e => {
        history.push('/personalDetails');
    };

    const onClickContinueButton = e => {
        history.push('/loanDetails');
    };

    const colorStyles = {
        control: styles => ({
            ...styles,
            backgroundColor: 'whitesmoke',
            color: '#182130',
            width: '180px',
            padding: '0 0.5rem 0 3.5rem',
            outline: 'none',
            margin: '0rem 0 0rem -0.6rem',
            textAlign: 'right',
            border: '2px #182130 solid',
            borderRadius: '1rem',
            height: '19.200px',
        }),
        option: (styles) => {
            return {
                ...styles,
                backgroundColor: 'whitesmoke',
                color: '#182130',
            };
        },
    };

    return (
        <div>
            <Navbar />
            <div className="bank-account-background-image">
                <button className="bank-account-back-button" onClick={onClickBackButton}>השלם פרטים אישיים</button>
                <form
                    noValidate
                    className="bank-account-form-container"
                >
                    <h1>נא למלא את פרטי החשבונות של חברת {companyName}</h1>
                    <h4>ח.פ: {companyNumber}</h4>

                    {bankAccounts.length === 0 ?
                        <h4>כדי לקבל הלוואה פתח בבקשה חשבון בנק</h4>
                        :
                        null}

                    <div className="bank-account-form-item">
                        {bankAccounts.map(bankAccount => {
                            return (
                                <BankAccount
                                    key={bankAccount.bankAccountId}
                                    bankAccount={bankAccount}
                                    styles={colorStyles}
                                    bankOptions={bankOptions}
                                />
                            )
                        }
                        )
                        }

                        <div className="bank-account-item-row">
                            <div className="bank-account-item-column">
                                <div className="bank-account-type">בנק</div>
                                <Select
                                    options={bankOptions}
                                    styles={colorStyles}
                                    defaultValue={bankOptions[0]}
                                    onChange={onChangeName}
                                    classNamePrefix="react-select__control"
                                    className="bank-account-dropdown"
                                    placeholder="שם הבנק"
                                    value={bankOptions.filter(function (bankOption) {
                                        return bankOption.value === name;
                                    })}
                                />
                            </div>

                            <div className="bank-account-item-column">
                                <div className="bank-account-type">סניף</div>
                                <input name="branch" value={branch} onChange={onChangeBranch} />
                            </div>

                            <div className="bank-account-item-column">
                                <div className="bank-account-type">חשבון</div>
                                <input name="accountNumber" value={accountNumber} onChange={onChangeAccountNumber} />
                            </div>

                            <div className="bank-account-item-column">
                                <button className="clear-button" disabled={true}>הסר</button>
                            </div>
                        </div>

                        <button className="add-button" onClick={e => {
                            e.preventDefault();
                            onClickAddBankAccountButton(user.userId);
                        }
                        }>הוסף חשבון</button>
                        <div className="bank-account-error">{error ? error.title : null}</div>
                    </div>

                </form>
            </div>

            <button
                className="bank-account-continue-button"
                onClick={onClickContinueButton}
                disabled={bankAccounts.length === 0 ? true : false}
            >
                קבל הלוואה
                </button>
        </div >
    );
}

export default BankAccounts;