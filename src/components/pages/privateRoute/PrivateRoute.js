import React from 'react';
import {
    useSelector
} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    const authenticated = useSelector(state => {
        return state.auth;
    });

    return (
        <Route
            {...rest}
            render={props =>
                authenticated.isAuthenticated === true ?
                    (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/" />
                    )
            }
        />
    );
}

export default PrivateRoute;