import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as StarIcon } from "assets/StarIcon.svg";

export const ListPartners = ({ data }) => {
    return (
        <div className="w-36 h-56 mx-2 p-3 rounded-2xl bg-white">
            <div className="relative">
                <figure className="relative ">
                    <img
                        src={data?.picture ?? ""}
                        alt={data?.name ?? "Picture"}
                        className="w-32 h-36 rounded-2xl"
                    ></img>
                </figure>
                <div className="py-2">
                    <div className="py-1">
                        <p className="text-poppins-blue-700 text-sm font-medium leading-3">
                            {data?.name ?? ""}
                        </p>
                    </div>

                    <div className="py-1 flex items-center">
                        <div>
                            <StarIcon className="fill-poppins-orange"></StarIcon>
                        </div>
                        <div className="px-1">
                            <p className="text-poppins-orange text-sm font-medium leading-3 inline">
                                4.5
                            </p>
                        </div>
                    </div>
                </div>
                <Link
                    to={`/partner/${data?.id}`}
                    className="link-wrapped"
                ></Link>
            </div>
        </div>
    );
};
