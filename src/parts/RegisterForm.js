import { Input } from "components/form/input";
import useForm from "helpers/hooks/useForm";
import React from "react";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
    const [state, setState] = useForm({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        address: "",
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
                            labelName="Name"
                            placeholder="input your name here"
                            name="name"
                            className="border-2 border-poppins-blue-300 hover:border-poppins-blue-700 focus:border-poppins-blue-700 focus:bg-poppins-white"
                            inputType="text"
                            value={state.name}
                            onChange={setState}
                        ></Input>
                    </div>
                    <div className="w-full py-2">
                        <Input
                            labelName="Email"
                            placeholder="input your email here"
                            name="email"
                            className="border-2 border-poppins-blue-300 hover:border-poppins-blue-700 focus:border-poppins-blue-700 focus:bg-poppins-white"
                            inputType="email"
                            value={state.email}
                            onChange={setState}
                        ></Input>
                    </div>
                    <div className="w-full py-2">
                        <Input
                            labelName="Phone Number"
                            placeholder="input your phone number here"
                            name="phone_number"
                            className="border-2 border-poppins-blue-300 hover:border-poppins-blue-700 focus:border-poppins-blue-700 focus:bg-poppins-white"
                            inputType="text"
                            value={state.phone_number}
                            onChange={setState}
                        ></Input>
                    </div>
                    <div className="w-full py-2">
                        <Input
                            labelName="Address"
                            placeholder="input your address here"
                            name="address"
                            className="border-2 border-poppins-blue-300 hover:border-poppins-blue-700 focus:border-poppins-blue-700 focus:bg-poppins-white"
                            inputType="text"
                            value={state.address}
                            onChange={setState}
                        ></Input>
                    </div>
                    <div className="w-full py-2">
                        <Input
                            labelName="Password"
                            placeholder="input your password here"
                            name="password"
                            className="border-2 border-poppins-blue-300 hover:border-poppins-blue-700 focus:border-poppins-blue-700 focus:bg-poppins-white"
                            inputType="password"
                            value={state.password}
                            onChange={setState}
                        ></Input>
                    </div>
                    <div className="w-full py-2">
                        <button className="border border-poppins-blue-300 rounded-2xl p-1 w-full focus:outline-none focus:border-none text-poppins-blue-300">
                            Submit
                        </button>
                    </div>
                    <div className="w-full">
                        <p className="text-sm text-center">Or</p>
                    </div>
                    <div className="w-full py-2">
                        <button className="border border-green-500 bg-green-500 rounded-2xl p-1 w-full focus:outline-none focus:border-none text-white">
                            Sign up with Line
                        </button>
                    </div>
                </form>
                <div className="absolute inset-x-0 bottom-0 items-center text-center">
                    <p className="text-sm">
                        already have an account ?{" "}
                        <span className="hover:text-poppins-orange">
                            <Link to="/login?path=/register">Login now</Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};
