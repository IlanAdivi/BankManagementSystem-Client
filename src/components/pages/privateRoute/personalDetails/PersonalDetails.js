import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchUserById, updateUserById } from '../../../../actions';
import Navbar from '../../../navbar/Navbar';
import './PersonalDetails.css';
import { allPropertiesAreEmpty, fillUpdatedUser } from '../../../../utils/propertiesLogic';

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

    useEffect(() => {
        if (allPropertiesAreEmpty(updateUser) === true) {
            fillUpdatedUser(updateUser, user);
        }
    }, [user, updateUser]);

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

                    <div className="form-item-row">
                        <div className='form-item-column'>
                            <label className="firstname-label">שם פרטי</label>
                            <input
                                type="text"
                                name="firstname"
                                placeholder=":שם פרטי"
                                readOnly
                                defaultValue={firstname}
                                className='firstname'
                            />
                        </div>



                        <div className='form-item-column'>
                            <label className="lastname-label">שם משפחה</label>
                            <input
                                type="text"
                                name="lastname"
                                placeholder=":שם משפחה"
                                readOnly
                                defaultValue={lastname}
                                className='lastname'
                            />
                        </div>
                    </div>

                    <div className="form-item-row">
                        <div className='form-item-column'>
                            <label className="idNumber-label">תעודת זהות</label>
                            <input
                                type="text"
                                name="idNumber"
                                placeholder=":תעודת זהות"
                                readOnly
                                defaultValue={idNumber}
                                className='idNumber'
                            />
                        </div>

                        <div className='form-item-column'>
                            <label className="dateOfBirth-label">תאריך לידה</label>
                            <input
                                type="date"
                                placeholder=":תאריך לידה"
                                defaultValue={user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : null}
                                onChange={onChange}
                                name="dateOfBirth"
                            />
                        </div>
                    </div>

                    <div className="form-item-row">
                        <div className='form-item-column'>
                            <label className="label">טלפון</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder=":טלפון"
                                defaultValue={user.phoneNumber}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-item-column'>
                            <label className="email-label">דואר אלקטרוני</label>
                            <input
                                type="text"
                                name="email"
                                placeholder=":דואר אלקטרוני"
                                defaultValue={user.email}
                                onChange={onChange}
                                className='email'
                            />
                        </div>
                    </div>

                    <div className="form-item-row">
                        <div className='form-item-column'>
                            <label className="label">שם העסק</label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder=":שם העסק"
                                defaultValue={user.companyName}
                                onChange={onChange}
                                className='companyName'
                            />
                        </div>

                        <div className='form-item-column'>
                            <label className="companyNumber-label">ח.פ/שותפות/עמותה</label>
                            <input
                                type="text"
                                name="companyNumber"
                                placeholder=":ח.פ/שותפות/עמותה"
                                defaultValue={user.companyNumber}
                                onChange={onChange}
                                className='companyNumber'
                            />
                        </div>
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