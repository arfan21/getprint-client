import { useSelector } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
    const user = useSelector((state) => state.users);

    localStorage.removeItem('GETPRINT:redirect');

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={`/login?path=${location.pathname}`} />
                )
            }
        />
    );
};
export default withRouter(ProtectedRoute);
