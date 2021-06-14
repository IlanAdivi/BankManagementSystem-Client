import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchUserById, updateUserById } from '../../../../actions';
import Navbar from '../../../navbar/Navbar';
import './PersonalDetails.css';

function PersonalDetails() {
    const dispatch = useDispatch();
    const history = useHistory();

    const auth = useSelector(state => {
        return state.auth;
    });

    const user = useSelector(state => {
        return state.user.user;
    });

    const error = useSelector(state => {
        return state.user.error;
    });

    const [updateUser, setUpdateUser] = useState({
        phoneNumber: '',
        email: '',
        companyName: '',
        companyNumber: '',
        dateOfBirth: undefined
    });

    const fetchUserByIdFromAPI = useCallback(id => {
        dispatch(fetchUserById(id));
    }, [dispatch]);

    useEffect(() => {
        fetchUserByIdFromAPI(auth.user.unique_name);
    }, [auth.user.unique_name, fetchUserByIdFromAPI]);

    const onChange = e => {
        setUpdateUser({
            ...updateUser,
            [e.target.name]: e.target.value
        })
    };

    const onClickContinueButton = e => {
        e.preventDefault();
        dispatch(updateUserById(updateUser, auth.user.unique_name, history));
    };

    const firstname = auth.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'][2];
    const lastname = auth.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'][3];
    const idNumber = auth.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'][4];

    return (
        <div>
            <Navbar />
            <div className="background-image">
                <form
                    noValidate
                    className="form-container"
                >
                    <h1>שלום {firstname} {lastname}, נא השלם את הפרטים הבאים</h1>
                    <div
                        className="form-item">
                        <input
                            type="text"
                            name="firstname"
                            placeholder=":שם פרטי"
                            readOnly
                            defaultValue={firstname}
                        />
                    </div>

                    <div className="form-item">
                        <input
                            type="text"
                            name="lastname"
                            placeholder=":שם משפחה"
                            readOnly
                            defaultValue={lastname}
                        />
                    </div>

                    <div className="form-item">
                        <input
                            type="text"
                            name="idNumber"
                            placeholder=":תעודת זהות"
                            readOnly
                            defaultValue={idNumber}
                        />
                    </div>

                    <div className="form-item">
                        <input
                            type="date"
                            placeholder=":תאריך לידה"
                            defaultValue={user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : null}
                            onChange={onChange}
                            name="dateOfBirth"
                        />
                    </div>

                    <div className="form-item">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder=":טלפון"
                            defaultValue={user.phoneNumber}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-item">
                        <input
                            type="text"
                            name="email"
                            placeholder=":דואר אלקטרוני"
                            defaultValue={user.email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-item">
                        <input
                            type="text"
                            name="companyName"
                            placeholder=":שם העסק"
                            defaultValue={user.companyName}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-item">
                        <input
                            type="text"
                            name="companyNumber"
                            placeholder=":ח.פ/שותפות/עמותה"
                            defaultValue={user.companyNumber}
                            onChange={onChange}
                        />
                    </div>

                    <button
                        className="continue-button"
                        type="submit"
                        onClick={onClickContinueButton}
                    > המשך למילוי פרטי החשבונות</button>

                    <div className="personal-details-error">{error ? error : null}</div>
                </form>
            </div>
        </div>
    );
}

export default PersonalDetails;