import { Route, Redirect, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = ({ component: Component, location, ...rest }) => {
    const accessToken = useSelector((state) => state.accessToken);
    const params = location?.search.substring(1).split('&');
    const path = params.find((item) => item.indexOf('path') > -1);
    const redirect = path?.split('=')?.[1];

    if (!accessToken && redirect)
        localStorage.setItem('GETPRINT:redirect', redirect);

    return (
        <Route
            {...rest}
            render={(props) =>
                accessToken ? <Redirect to={`/`} /> : <Component {...props} />
            }
        />
    );
};
export default withRouter(GuestRoute);
