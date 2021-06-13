import Cookies from 'universal-cookie';
import { Route, Redirect, withRouter } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
    const cookies = new Cookies();
    const userCookies = cookies.get('X-GETPRINT-KEY');

    localStorage.removeItem('GETPRINT:redirect');

    return (
        <Route
            {...rest}
            render={(props) =>
                userCookies ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={`/login?path=${location.pathname}`} />
                )
            }
        />
    );
};
export default withRouter(ProtectedRoute);
