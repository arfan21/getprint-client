import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from 'parts/LoginForm';
import { ReactComponent as BackButton } from 'assets/BackButton.svg';
import { Loading } from 'parts/Loading';

export const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white">
            {isLoading && <Loading></Loading>}
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
