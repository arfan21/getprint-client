import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loading } from 'parts/Loading';

const GuestRoute = ({ component: Component, location, ...rest }) => {
    const authentication = useSelector((state) => state.authentication);
    const params = location?.search.substring(1).split('&');
    const path = params.find((item) => item.indexOf('path') > -1);
    const redirect = path?.split('=')?.[1];

    if (!authentication.isAuthenticated && redirect)
        localStorage.setItem('GETPRINT:redirect', redirect);

    if (authentication.isLoading) {
        return <Loading></Loading>;
    }

    if (authentication.isAuthenticated) {
        return <Redirect to={`/`} />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
    // return (
    //     <>
    //         {authentication.isLoading && <Loading></Loading>}
    //         {!authentication.isLoading && authentication.isAuthenticated ? (
    //             <Redirect to={`/`} />
    //         ) : (
    //             <Route {...rest} render={(props) => <Component {...props} />} />
    //         )}
    //     </>
    // );
};
export default withRouter(GuestRoute);
