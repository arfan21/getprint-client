import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Following } from 'pages/Following';
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
import ProtectedRoute from 'components/routers/ProtectedRoute';
import { Cart } from 'pages/Cart';
import history from 'helpers/history';
import Home from 'pages/Home';
import Profile from 'pages/Profile';

function App() {
    const dispatch = useDispatch();
    console.log(process.env.REACT_APP_BASE_URL);

    useEffect(() => {
        const cookies = new Cookies();
        const verifyUserLogin = async () => {
            try {
                const userData = await users.verify();
                dispatch(populateProfile(userData.data));
            } catch (error) {}
        };

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
