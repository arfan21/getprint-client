import { useSelector } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
    const accessToken = useSelector((state) => state.accessToken);

    localStorage.removeItem('GETPRINT:redirect');

    return (
        <Route
            {...rest}
            render={(props) =>
                accessToken ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={`/login?path=${location.pathname}`} />
                )
            }
        />
    );
};
export default withRouter(ProtectedRoute);
