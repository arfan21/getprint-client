import Cookies from 'universal-cookie';
import { Route, Redirect, withRouter } from 'react-router-dom';

const GuestRoute = ({ component: Component, location, ...rest }) => {
    const cookies = new Cookies();
    const userCookies = cookies.get('X-GETPRINT-KEY');
    const params = location?.search.substring(1).split('&');
    const path = params.find((item) => item.indexOf('path') > -1);
    const redirect = path?.split('=')?.[1];

    if (!userCookies && redirect)
        localStorage.setItem('GETPRINT:redirect', redirect);

    return (
        <Route
            {...rest}
            render={(props) =>
                userCookies ? <Redirect to={`/`} /> : <Component {...props} />
            }
        />
    );
};
export default withRouter(GuestRoute);
