import React from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { LoginForm } from "parts/LoginForm";

export const Login = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);

    return (
        <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white">
            <div className="py-6 px-3 h-full ">
                <div className="pb-4">
                    <Link to={queryParams?.path ?? "/"}>{"<- Kembali"}</Link>
                </div>
                <div className="px-5 my-5 w-full flex items-center justify-center">
                    <h1>Login</h1>
                </div>
                <LoginForm></LoginForm>
            </div>
        </div>
    );
};
