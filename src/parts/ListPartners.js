import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as StarIcon } from 'assets/StarIcon.svg';
import { ReactComponent as FollowIcon } from 'assets/FollowIcon.svg';
import { ReactComponent as LoveButton } from 'assets/LoveButton.svg';
import { ReactComponent as GpsIcon } from 'assets/gps.svg';
import {
    LazyLoadImage,
    trackWindowScroll,
} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ListPartners = ({ data, scrollPosition }) => {
    const [following, setFollowing] = useState(false);
    return (
        <div className="h-32 flex items-center justify-center p-1 my-2 rounded-2xl bg-white w-full">
            <div className="relative flex w-full">
                <figure className="relative p-1 w-1/3 sm:w-1/5 flex items-center justify-center">
                    {/* {!isImageLoaded && <p className="absolute">Loading</p>} */}
                    <LazyLoadImage
                        src={data?.picture ?? ''}
                        alt={data?.name ?? 'Picture'}
                        className={`w-24 h-24 rounded-2xl `}
                        scrollPosition={scrollPosition}
                        effect="blur"
                    ></LazyLoadImage>
                    {/* <img
                        ${
                            isImageLoaded ? 'block' : 'invisible'
                        }
                        onLoad={imageLoadHandler}
                    ></img> */}
                    <div
                        className={`absolute flex items-center bottom-0 left-1/2 bg-white rounded-lg p-0 shadow`}
                        style={{ transform: 'translateX(-50%)' }}
                    >
                        <div>
                            <StarIcon className="fill-poppins-orange"></StarIcon>
                        </div>
                        <div className="px-1">
                            <p className="text-poppins-orange text-sm font-medium leading-3 inline">
                                4.5
                            </p>
                        </div>
                    </div>
                </figure>
                <div className="p-1 w-2/3 sm:w-4/5 flex justify-between">
                    <div className="relative py-1 w-3/4">
                        <div className="">
                            <p className="text-poppins-blue-700 text-sm">
                                {data?.name ?? ''}
                            </p>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex items-center">
                            <div>
                                <GpsIcon className="fill-poppins-orange w-5 h-5"></GpsIcon>
                            </div>
                            <p className="text-poppins-blue-700 inline px-1 text-sm font-normal truncate">
                                {/* {data?.address} */}
                                assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                            </p>
                        </div>
                    </div>
                    <div className="py-1 w-1/4 flex items-start justify-center ">
                        {following ? (
                            <LoveButton
                                className="fill-poppins-orange z-20 cursor-pointer"
                                onClick={() => setFollowing(!following)}
                            ></LoveButton>
                        ) : (
                            <FollowIcon
                                className="fill-poppins-orange z-20 cursor-pointer"
                                onClick={() => setFollowing(!following)}
                            ></FollowIcon>
                        )}
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

export default trackWindowScroll(ListPartners);
