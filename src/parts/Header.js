import { Input } from "components/form/input";
import React, { useState } from "react";
import { ReactComponent as DefaultAvatar } from "../assets/default-avatar.svg";
import { ReactComponent as SearchIcon } from "../assets/SearchIcon.svg";
import { ReactComponent as Logo } from "../assets/Logo.svg";

export const Header = () => {
    const [loginStatus, setloginStatus] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const name = undefined;
    const onChange = (e) => {
        setSearchValue(e.target.value);
    };
    return (
        <div className="py-5 w-full">
            {loginStatus ? (
                <div className="flex flex-row w-full py-1 items-center">
                    <div className="px-2">
                        <DefaultAvatar className="fill-poppins-gray w-14 h-14"></DefaultAvatar>
                    </div>
                    <div className="px-2">
                        <p className="text-white">
                            Hello, {name ?? "Nickname"}
                        </p>
                        <p className="text-poppins-blue-100">
                            what are yout looking for on Getprint?
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row w-full py-1 items-center">
                    <div className="px-2">
                        <Logo className="fill-poppins-gray w-14 h-14"></Logo>
                    </div>
                    <div className="px-2 flex justify-center items-center">
                        <p className="text-poppins-blue-100">
                            what are yout looking for on Getprint?
                        </p>
                    </div>
                </div>
            )}

            <div className="pt-4 pb-8 w-full flex justify-center">
                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="find your favorite shop"
                        className="form-input w-full p-1 pl-3 pr-9 bg-poppins-blue-300 hover:bg-indigo-800 focus:bg-indigo-800 text-poppins-blue-100 border-0 border-b-2 border-indigo-800 focus:ring-0 focus:border-poppins-blue-100 hover:border-poppins-blue-100 rounded-lg"
                        value={searchValue}
                        name="search"
                        onChange={onChange}
                    ></input>
                    <span className="absolute right-2 top-1.5">
                        <SearchIcon className="fill-poppins-blue-100 m-auto block"></SearchIcon>
                    </span>
                </div>
            </div>
        </div>
    );
};
