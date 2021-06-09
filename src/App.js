import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Following } from 'pages/Following';
import { Profile } from 'pages/Profile';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import DetailPartner from 'pages/DetailPartner';
import { useDispatch } from 'react-redux';
import { users } from 'constants/api/users';
import { populateProfile } from 'store/actions/users';

function App() {
    const dispatch = useDispatch();
    const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

    useEffect(() => {
        const userCookies =
            decodeURIComponent(window.document.cookie)
                ?.split(';')
                ?.find?.((item) => item.indexOf('X-GETPRINT-KEY') > -1)
                ?.split('=')[1] ?? null;
        if (userCookies) {
            users.getById().then((res) => {
                dispatch(populateProfile(res.data));
            });
        }
    }, [dispatch]);
    return (
        <>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route
                        exact
                        path="/following"
                        component={Following}
                    ></Route>
                    <Route exact path="/profile" component={Profile}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <Route
                        exact
                        path="/partner/:id"
                        component={DetailPartner}
                    ></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
