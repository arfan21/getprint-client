import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Following } from 'pages/Following';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import DetailPartner from 'pages/DetailPartner';
import { useDispatch } from 'react-redux';
import { auth } from 'constants/api/auth';
import { populateProfile } from 'store/actions/users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GuestRoute from 'components/routers/GuestRoute';
import ProtectedRoute from 'components/routers/ProtectedRoute';
import { Cart } from 'pages/Cart';
import history from 'helpers/history';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import liff from '@line/liff';
import { LineCallback } from 'pages/LineCallback';
import { liffInit } from 'store/actions/line';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const verifyUserLogin = async () => {
            try {
                const userData = await auth.verify();
                dispatch(populateProfile(userData?.data));
            } catch (error) {}
        };

        const liffInitAsync = async () => {
            try {
                await liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID });
                dispatch(liffInit(true));
            } catch (error) {
                dispatch(liffInit(false));
            }
        };

        liffInitAsync();
        verifyUserLogin();
    }, [dispatch]);
    return (
        <>
            <Router history={history}>
                <ToastContainer></ToastContainer>
                <Switch>
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
                    <ProtectedRoute
                        exact
                        path="/cart"
                        component={Cart}
                    ></ProtectedRoute>

                    <Route exact path="/" component={Home}></Route>

                    <GuestRoute
                        exact
                        path="/line-callback"
                        component={LineCallback}
                    ></GuestRoute>

                    <Route
                        exact
                        path="/following"
                        component={Following}
                    ></Route>

                    <Route exact path="/profile" component={Profile}></Route>

                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
