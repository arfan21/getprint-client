import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as FollowIcon } from 'assets/FollowIcon.svg';
import { ReactComponent as LoveButton } from 'assets/LoveButton.svg';
import { ReactComponent as BackButton } from 'assets/BackButton.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const DetailPartnerHeader = ({ partner }) => {
    const [following, setFollowing] = useState(false);
    const lazyParentRef = useRef();

    useEffect(() => {
        const lazyParentCurrent = lazyParentRef.current;
        lazyParentCurrent.firstChild.style.display = 'block';
    }, []);

    return (
        <>
            <div className="w-full z-0" ref={lazyParentRef}>
                <LazyLoadImage
                    src={partner?.picture}
                    alt={partner?.name ?? 'picture'}
                    className="h-60 w-full"
                    effect="blur"
                ></LazyLoadImage>
            </div>

            <div className="absolute top-0 px-8 py-3 flex justify-between w-full">
                <div className="w-8 h-8">
                    <div className="bg-white w-full h-full flex items-center justify-center rounded-lg shadow">
                        <Link to="/" className="text-poppins-blue-700">
                            <BackButton className="fill-poppins-blue-700"></BackButton>
                        </Link>
                    </div>
                </div>
                <div className="w-20 h-8">
                    <div className="bg-white w-full h-full flex items-center justify-center rounded-lg shadow">
                        <p className="text-poppins-blue-700">Details</p>
                    </div>
                </div>
                <div
                    className="cursor-pointer w-8 h-8"
                    onClick={() => setFollowing(!following)}
                >
                    <div className="bg-white w-full h-full flex items-center justify-center rounded-lg shadow">
                        {following ? (
                            <LoveButton className="fill-poppins-orange"></LoveButton>
                        ) : (
                            <FollowIcon className="fill-poppins-orange"></FollowIcon>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
