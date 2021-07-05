import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export const Loading = () => {
    return (
        <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white flex flex-col z-50">
            <div className="absolute flex items-center justify-center w-full h-full bg-poppins-blue-300 z-50 bg-opacity-50">
                <BeatLoader color="#0E0943" size="25px"></BeatLoader>
            </div>
        </div>
    );
};
