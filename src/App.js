import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import Cookies from 'universal-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GuestRoute from 'components/routers/GuestRoute';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const cookies = new Cookies();
        const userCookies = cookies.get('X-GETPRINT-KEY');
        if (userCookies) {
            users
                .getById()
                .then((res) => {
                    dispatch(populateProfile(res.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [dispatch]);
    return (
        <>
            <ToastContainer></ToastContainer>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}></Route>

                    <Route
                        exact
                        path="/following"
                        component={Following}
                    ></Route>
                    <Route exact path="/profile" component={Profile}></Route>
                    <GuestRoute
                        exact
                        path="/login"
                        component={Login}
                    ></GuestRoute>
                    <GuestRoute
                        exact
                        path="/register"
                        component={Register}
                    ></GuestRoute>
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
