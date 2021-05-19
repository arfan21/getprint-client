import { Input } from "components/form/input";
import React, { useState } from "react";
import { ReactComponent as DefaultAvatar } from "../assets/default-avatar.svg";
import { ReactComponent as SearchIcon } from "../assets/SearchIcon.svg";

export const Header = () => {
    const [focused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const name = undefined;
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    const onChange = (e) => {
        setSearchValue(e.target.value);
    };
    return (
        <div className="flex flex-col items-center py-5 w-full">
            <div className="flex flex-row w-full py-3">
                <div className="px-2">
                    <DefaultAvatar className="fill-poppins-gray w-14 h-14"></DefaultAvatar>
                </div>
                <div className="px-2 items-center">
                    <p className="text-white">Hello, {name ?? "Arfan"}</p>
                    <p className="text-poppins-blue-100">
                        What do you want to buy today?
                    </p>
                </div>
            </div>
            <div className="py-3 w-full">
                <div
                    className={`flex flex-row w-full  hover:bg-indigo-800 ${
                        focused ? "bg-indigo-800" : "bg-poppins-blue-300 "
                    } rounded-md`}
                >
                    <div className="w-5/6">
                        <Input
                            placeholder="find your favorite shop"
                            onBlur={onBlur}
                            onFocus={onFocus}
                            onChange={onChange}
                            inputType="text"
                            value={searchValue}
                            name="search"
                        ></Input>
                    </div>
                    <div className="w-1/6 items-center m-auto">
                        <SearchIcon className="fill-poppins-blue-100 m-auto block"></SearchIcon>
                    </div>
                </div>
            </div>
        </div>
    );
};
