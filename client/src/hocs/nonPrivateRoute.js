import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const NonPrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated)
                return <Redirect to={{
                    pathname: '/null',
                    state: { from: props.location }
                }} />

            return <Component {...props} />
        }} />
    )
}

export default NonPrivateRoute;