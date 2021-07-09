import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
    const authentication = useSelector((state) => state.authentication);

    localStorage.removeItem('GETPRINT:redirect');

    if (authentication.isAuthenticated) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    }

    return (
        !authentication.isLoading && (
            <Redirect to={`/login?path=${location.pathname}`} />
        )
    );
};
export default withRouter(ProtectedRoute);
