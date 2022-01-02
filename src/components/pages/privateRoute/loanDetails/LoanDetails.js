import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loanBankAccount, logoutUser } from '../../../../actions';
import Navbar from '../../../navbar/Navbar';
import './LoanDetails.css';

function LoanDetails() {
    const dispatch = useDispatch();
    const [loanDetails, setLoanDetails] = useState({
        loanAmount: 0,
        loanPeriod: 4
    });
    const [loanSuccess, setLoanSuccess] = useState(false);
    const [error, setError] = useState('');

    const user = useSelector(state => {
        return state.user.user;
    });

    const onChange = e => {
        setLoanDetails({
            ...loanDetails,
            [e.target.name]: Number(e.target.value)
        })
    };

    const onClickLoan = async e => {
        e.preventDefault();
        const response = await loanBankAccount(loanDetails, user.userId);
        if (response.status === 200) {
            setLoanSuccess(true);
            setLoanDetails({
                loanAmount: 0,
                loanPeriod: 4
            });
            setError('');
        } else {
            setError(response);
        }
    };

    const onClickLoanAgain = e => {
        setLoanSuccess(false);
    };

    const onClickLogout = e => {
        e.preventDefault();
        dispatch(logoutUser());
    };

    return (
        <div>
            <Navbar />
            <div className="loan-details-background-image">
                {!loanSuccess ?
                    <div className="loan-details-form-container">
                        <h1>אנא הזינו את סכום ההלוואה המבוקש ומשך זמן ההלוואה </h1>

                        <div className="loan-details-form-item">
                            <label className="loan-details-label">סכום ההלוואה</label>
                            <label className="loan-amount-details">בין 100,000 ל-1,000,000</label>
                            <input type="number" placeholder="100,000-1,000,000" onChange={onChange} value={loanDetails.loanAmount} name="loanAmount" />
                        </div>

                        <div className="loan-details-form-item">
                            <label className="loan-details-label">משך זמן ההלוואה-בשנים</label>
                            <div className="range-slider">4-כמות מינימלית</div>
                            <input
                                type="range"
                                min="4"
                                max="8"
                                onChange={onChange}
                                value={loanDetails.loanPeriod}
                                name="loanPeriod"
                                className="range-slider-input"
                            />
                            <div className="range-slider">8-כמות מקסימלית</div>
                            <h4 className="range-slider">ההלוואה נבחרה ל-{loanDetails.loanPeriod} שנים</h4>
                        </div>

                        <button className="loan-details-button" onClick={onClickLoan}>קבל הלוואה</button>
                        <div className="loan-details-error">{error ? error : null}</div>
                    </div>
                    :
                    <div className="loan-details-success-form-container">
                        <h1 className="modal-title">תהליך לקיחת ההלוואה הסתיים בהצלחה</h1>
                        <h4 className="modal-sub-title">?האם תרצה לקחת הלוואה נוספת או להתנתק</h4>
                        <div className='loan-details-success-buttons'>
                            <button className="loan-details-loan-button" onClick={onClickLoanAgain}>קבל הלוואה נוספת</button>
                            <button className="loan-details-logout-button" onClick={onClickLogout}>התנתק</button>
                        </div>
                    </div>}
            </div>
        </div>
    );
}

export default LoanDetails;