import React, { useState } from 'react';
import { ReactComponent as DefaultAvatar } from '../assets/default-avatar.svg';
import { ReactComponent as SearchIcon } from '../assets/SearchIcon.svg';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import liff from '@line/liff';

export const Header = () => {
    const [searchValue, setSearchValue] = useState('');
    const onChange = (e) => {
        // setSearchValue(e.target.value);
        setSearchValue(liff.getIDToken());
    };

    const user = useSelector((state) => state.users);
    return (
        <div className="py-5 w-full">
            {user ? (
                <div className="flex flex-row w-full py-1 items-center">
                    <div className="px-2">
                        {user?.picture ? (
                            <LazyLoadImage
                                src={user?.picture}
                                alt={user?.name}
                                className="w-14 h-14 rounded-full"
                                effect="blur"
                            ></LazyLoadImage>
                        ) : (
                            <DefaultAvatar className="fill-poppins-gray "></DefaultAvatar>
                        )}
                    </div>
                    <div className="px-2">
                        <p className="text-white">
                            Hi, {user?.name ?? 'Nickname'}
                        </p>
                        <p className="text-poppins-blue-100">
                            What are yout looking for on Getprint?
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row w-full py-1 items-center">
                    <div className="px-2">
                        <Logo className="fill-poppins-gray w-14 h-14" width="14" height="14"></Logo>
                    </div>
                    <div className="px-2 flex justify-center items-center">
                        <p className="text-poppins-blue-100">
                            Hi, What are yout looking for on Getprint?
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
