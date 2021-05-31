import React from "react";
import { Input } from "components/form/input";
import useForm from "helpers/hooks/useForm";
import { Link, useLocation } from "react-router-dom";

export const LoginForm = () => {
    const [state, setState] = useForm({
        email: "",
        password: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(state);
    };
    return (
        <>
            <div className="px-5 my-5 w-full h-5/6 relative">
                <form
                    className="h-5/6 flex flex-col justify-start items-center"
                    onSubmit={submitHandler}
                >
                    <div className="w-full py-2">
                        <Input
                            labelName="Email"
                            placeholder="insert your email here"
                            name="email"
                            className="border-2 border-poppins-blue-300 hover:border-poppins-blue-700 focus:border-poppins-blue-700 focus:bg-poppins-white"
                            inputType="email"
                            value={state.email}
                            onChange={setState}
                        ></Input>
                    </div>
                    <div className="w-full py-2">
                        <Input
                            labelName="Password"
                            placeholder="insert your password here"
                            name="password"
                            className="border-2 border-poppins-blue-300 hover:border-poppins-blue-700 focus:border-poppins-blue-700 focus:bg-poppins-white"
                            inputType="password"
                            value={state.password}
                            onChange={setState}
                        ></Input>
                    </div>
                    <div className="w-full py-2">
                        <button className="border border-poppins-blue-300 rounded-2xl p-1 w-full focus:outline-none focus:border-none text-poppins-blue-300">
                            Login
                        </button>
                    </div>
                    <div className="w-full">
                        <p className="text-sm text-center">Or</p>
                    </div>
                    <div className="w-full py-2">
                        <button className="border border-green-500 bg-green-500 rounded-2xl p-1 w-full focus:outline-none focus:border-none text-white">
                            Login with Line
                        </button>
                    </div>
                    <div className="w-full py-2">
                        <p className="text-sm">
                            Forgot password ? <span>Click here</span>
                        </p>
                    </div>
                </form>
                <div className="absolute inset-x-0 bottom-0 items-center text-center">
                    <p className="text-sm">
                        don't have an account ?{" "}
                        <span className="hover:text-poppins-orange">
                            <Link to="/register?path=/login">Sign up now</Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};
