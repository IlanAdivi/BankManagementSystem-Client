import React, {
    useEffect,
    useState
}
    from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../../actions';
import Navbar from '../../navbar/Navbar';
import './Login.css';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState({
        idNumber: '',
        password: '',
    });

    const auth = useSelector(state => {
        return state.auth;
    });

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/personalDetails');
        }
    }, [auth, history]);

    const onChangeIdNumber = event => {
        setUser({
            ...user,
            idNumber: event.target.value
        });
    };

    const onChangePassword = event => {
        setUser({
            ...user,
            password: event.target.value
        });
    };

    const onLoginSubmit = event => {
        event.preventDefault();
        dispatch(loginUser(user));
    };

    return (
        <div>
            <Navbar />
            <div className="login-background-image">
                <form
                    noValidate
                    className="login-form-container"
                >
                    <h1>כניסה לחשבונך</h1>
                    <div
                        className="login-form-item">
                        <label className="label">תעודת זהות</label>
                        <input
                            type="text"
                            name="idNumber"
                            value={user.idNumber}
                            onChange={onChangeIdNumber}
                        />
                    </div>

                    <div className="login-form-item">
                        <label htmlFor="password">סיסמא</label>
                        <input
                            onChange={onChangePassword}
                            value={user.password}
                            autoComplete="new-password"
                            type="password"
                        />
                    </div>

                    <button
                        className="login-button"
                        type="submit"
                        onClick={onLoginSubmit}
                    >כניסה</button>

                    <div className="login-error"
                    >{auth ? auth.error : null}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;