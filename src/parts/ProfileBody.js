import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DefaultAvatar } from "../assets/default-avatar.svg";

export const ProfileBody = () => {
    return (
        <div className="py-6 px-3">
            <div className="pb-4">
                <Link to="/">{"<- Kembali"}</Link>
            </div>
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
        </div>
    );
};
