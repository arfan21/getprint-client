import React from 'react';
import ContentLoader from 'react-content-loader';

const CardLoader = (props) => (
    <div className="h-32 flex items-center justify-center p-1 my-2 rounded-2xl bg-white w-full">
        <div className="relative flex w-full">
            <div className="relative p-1 flex items-center justify-center w-full">
                <ContentLoader
                    className="w-full"
                    speed={2}
                    // width={476}
                    // height={w-full}
                    viewBox="0 0 476 124"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    {...props}
                >
                    <rect x="2" y="22" rx="16" ry="16" className="w-20 h-20" />
                    <rect
                        x="113"
                        y="24"
                        rx="16"
                        ry="16"
                        width="277"
                        height="16"
                    />
                    <rect
                        x="113"
                        y="46"
                        rx="16"
                        ry="16"
                        width="122"
                        height="16"
                    />
                    <rect
                        x="116"
                        y="83"
                        rx="16"
                        ry="16"
                        width="277"
                        height="16"
                    />
                    <rect
                        x="403"
                        y="24"
                        rx="16"
                        ry="16"
                        width="23"
                        height="16"
                    />
                    <rect
                        x="405"
                        y="83"
                        rx="16"
                        ry="16"
                        width="23"
                        height="16"
                    />
                </ContentLoader>
            </div>
        </div>
    </div>
    //   width="96" height="96
);

export default CardLoader;
