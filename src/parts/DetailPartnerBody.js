import React from "react";
import { ReactComponent as GpsIcon } from "assets/gps.svg";
import { ReactComponent as StarIcon } from "assets/StarIcon.svg";

export const DetailPartnerBody = ({ partner }) => {
    return (
        <>
            <section className=" pt-6 px-2">
                <div>
                    <p className="text-poppins-blue-700 font-semibold text-xl">
                        {partner?.name}
                    </p>
                </div>

                <div className="py-1 flex items-center">
                    <div>
                        <GpsIcon className="fill-poppins-orange w-5 h-5"></GpsIcon>
                    </div>
                    <p className="text-poppins-blue-700 inline px-1 text-sm font-normal truncate">
                        {partner?.address}
                    </p>
                </div>
            </section>
            <section className="my-3 py-3 px-2 bg-white flex justify-between">
                <div className="flex items-center px-3">
                    <div className="px-1">
                        <StarIcon className="fill-poppins-orange"></StarIcon>
                    </div>
                    <div className="px-1">
                        <p className="text-poppins-orange text-sm font-medium leading-3 inline">
                            4.5
                        </p>
                    </div>
                </div>
                <div className="flex items-center px-3">tes</div>
                <div className="flex items-center px-3">tes</div>
            </section>
        </>
    );
};
