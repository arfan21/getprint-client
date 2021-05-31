import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as FollowIcon } from "assets/FollowIcon.svg";
import { ReactComponent as LoveButton } from "assets/LoveButton.svg";
import { ReactComponent as BackButton } from "assets/BackButton.svg";

export const DetailPartnerHeader = ({ partner }) => {
    const following = true;
    return (
        <>
            <img
                src={partner?.picture}
                alt={partner?.name ?? "picture"}
                className="h-60 w-full z-0"
            ></img>
            <div className="absolute top-0 px-8 py-3 flex justify-between w-full">
                <div>
                    <Link to="/" className="text-white">
                        <BackButton className="fill-white"></BackButton>
                    </Link>
                </div>
                <div>
                    <p className="text-white">Details</p>
                </div>
                <div className="cursor-pointer">
                    {following ? (
                        <LoveButton className="fill-poppins-orange"></LoveButton>
                    ) : (
                        <FollowIcon className="fill-poppins-orange"></FollowIcon>
                    )}
                </div>
            </div>
        </>
    );
};
