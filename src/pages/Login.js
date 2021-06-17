import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LoginForm } from 'parts/LoginForm';
import { ReactComponent as BackButton } from 'assets/BackButton.svg';
import HashLoader from 'react-spinners/HashLoader';

export const Login = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white">
            <div
                className={`absolute flex items-center justify-center w-full h-full bg-poppins-blue-300 z-50 bg-opacity-50 ${
                    isLoading ? 'visible' : 'invisible'
                }`}
            >
                <HashLoader color="#0E0943" size="150px"></HashLoader>
            </div>
            <div className="py-6 px-3 h-full">
                <div className="pb-4  px-4">
                    <Link to="/">
                        <BackButton className="fill-poppins-blue-700"></BackButton>
                    </Link>
                </div>
                <div className="px-5 my-5 w-full flex items-center justify-center">
                    <h1>Login</h1>
                </div>
                <LoginForm setIsLoading={setIsLoading}></LoginForm>
            </div>
        </div>
    );
};
