import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { auth } from 'constants/api/auth';
import { useForm } from 'helpers/hooks/useForm';
import { populateProfile } from 'store/actions/users';
import { useDispatch } from 'react-redux';
import liff from '@line/liff';
import qs from 'query-string';
import { setAuthAccessToken } from 'store/actions/authentication';

export const LoginForm = ({ setIsLoading }) => {
    const history = useHistory();
    const location = useLocation();
    const queryString = qs.parse(location.search);

    const [state, setState] = useForm({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const dataToken = await auth.login(state);
            dispatch(setAuthAccessToken(dataToken.data.token));

            const userData = await auth.verify();
            dispatch(populateProfile(userData.data));

            history.push(
                queryString?.path === '/profile'
                    ? '/'
                    : queryString?.path ?? '/',
            );
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const loginLineHandler = async (e) => {
        e.preventDefault();

        if (liff.isLoggedIn()) {
            liff.logout();
        } else {
            liff.login();
        }
    };

    return (
        <>
            <div className="px-5 my-5 w-full h-5/6 relative">
                <div className="h-5/6 flex flex-col justify-start items-center">
                    <form className="w-full" onSubmit={submitHandler}>
                        <div className="w-full py-2">
                            <label
                                className="text-poppins-blue-700"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-input w-full p-1 pl-3 bg-poppins-white text-poppins-blue-700 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-poppins-blue-700"
                                placeholder="jhon@example.com"
                                name="email"
                                value={state.email}
                                onChange={setState}
                            ></input>
                        </div>
                        <div className="w-full py-2">
                            <label
                                className="text-poppins-blue-700"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-input w-full p-1 pl-3 bg-poppins-white text-poppins-blue-700 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-poppins-blue-700"
                                name="password"
                                value={state.password}
                                onChange={setState}
                            ></input>
                        </div>
                        <div className="w-full py-2">
                            <button className="border border-poppins-blue-300 rounded-2xl p-1 w-full focus:outline-none focus:border-none text-poppins-blue-300">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="w-full">
                        <p className="text-sm text-center">Or</p>
                    </div>
                    <div className="w-full py-2">
                        <button
                            onClick={loginLineHandler}
                            className="border border-green-500 bg-green-500 rounded-2xl p-1 w-full focus:outline-none focus:border-none text-white"
                        >
                            Login with Line
                        </button>
                    </div>
                    <div className="w-full py-2">
                        <p className="text-sm">
                            Forgot password ? <span>Click here</span>
                        </p>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 items-center text-center">
                    <p className="text-sm">
                        don't have an account ?{' '}
                        <span className="hover:text-poppins-orange">
                            <Link to="/register?path=/login">Sign up now</Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};
