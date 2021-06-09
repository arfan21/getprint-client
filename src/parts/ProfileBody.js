import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as DefaultAvatar } from "../assets/default-avatar.svg";
import { ReactComponent as BackButton } from "assets/BackButton.svg";

export const ProfileBody = () => {
    const location = useLocation();
    const loginStatus = false;
    return (
        <div className="py-6 h-full">
            <div className="pb-4 px-4">
                <Link to="/">
                    <BackButton className="fill-poppins-blue-700"></BackButton>
                </Link>
            </div>
            {loginStatus ? (
                <div className="px-5 my-5">
                    <div>
                        <DefaultAvatar></DefaultAvatar>
                    </div>
                    <div className="flex flex-col py-2">
                        <div className="py-2">
                            <p>Akun</p>
                        </div>
                        <div className="py-1">
                            <ul>
                                <li className="py-1 border-b border-gray-400">
                                    Notifikasi
                                </li>
                                <li className="py-1 border-b border-gray-400">
                                    Pengaturan Akun
                                </li>
                                <li className="py-1 border-b border-gray-400">
                                    Pesanan
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col py-2">
                        <div className="py-2">
                            <p>Info Lainnya</p>
                        </div>
                        <div className="py-1">
                            <ul>
                                <li className="py-1 border-b border-gray-400">
                                    Kebijakan Privasi
                                </li>
                                <li className="py-1 border-b border-gray-400">
                                    Ketentuan Layanan
                                </li>
                                <li className="py-1 border-b border-gray-400">
                                    Pusat Bantuan
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="py-10">
                        <div className="flex justify-center border border-red-600 rounded-2xl p-1">
                            <button className="focus:outline-none focus:border-none text-red-600">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-5 my-5 flex flex-col justify-center items-center h-2/3">
                    <Link
                        className="w-full m-2"
                        to={`/login?path=${location.pathname}`}
                    >
                        <button className="border border-red-600 rounded-2xl p-1 w-full focus:outline-none focus:border-none text-red-600">
                            Login
                        </button>
                    </Link>
                    <Link
                        className="w-full m-2"
                        to={`/register?path=${location.pathname}`}
                    >
                        <button className="focus:outline-none focus:border-none text-red-600 border border-red-600 rounded-2xl p-1 w-full">
                            Sign Up
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};
