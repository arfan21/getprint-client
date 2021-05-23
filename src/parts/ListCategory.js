import React from "react";

import { ReactComponent as Sun } from "assets/Sun.svg";
import { ReactComponent as Map } from "assets/map.svg";
import { ReactComponent as Badge } from "assets/badge.svg";

export const ListCategory = ({ categoryHandler, categoryActive }) => {
    const categoryTerbaru = "Terbaru";
    const categoryTerdekat = "Terdekat";
    const categoryBestRating = "Best Rating";

    return (
        <>
            <div className="py-2">
                <p className="text-poppins-blue-700 font-semibold text-xl">
                    Category
                </p>
            </div>
            <div className="py-5">
                <ul className="flex flex-row justify-between ">
                    <li
                        onClick={() => categoryHandler(categoryTerbaru)}
                        className={`group cursor-pointer font-semibold flex flex-col items-center ${
                            categoryActive(categoryTerbaru)
                                ? "text-poppins-blue-700"
                                : "text-poppins-gray"
                        }`}
                    >
                        <div
                            className={`w-16 h-16 flex justify-center items-center rounded-2xl group-hover:bg-poppins-orange ${
                                categoryActive(categoryTerbaru)
                                    ? "bg-poppins-orange"
                                    : "bg-white"
                            } `}
                        >
                            <Sun
                                className={`w-10 h-10 group-hover:fill-white ${
                                    categoryActive(categoryTerbaru)
                                        ? "fill-white"
                                        : "fill-poppins-gray"
                                }`}
                            ></Sun>
                        </div>

                        <p className="group-hover:text-poppins-blue-700">
                            {categoryTerbaru}
                        </p>
                    </li>
                    <li
                        onClick={() => categoryHandler(categoryTerdekat)}
                        className={`group cursor-pointer font-semibold flex flex-col items-center ${
                            categoryActive(categoryTerdekat)
                                ? "text-poppins-blue-700"
                                : "text-poppins-gray"
                        }`}
                    >
                        <div
                            className={`w-16 h-16 flex justify-center items-center rounded-2xl group-hover:bg-poppins-orange ${
                                categoryActive(categoryTerdekat)
                                    ? "bg-poppins-orange"
                                    : "bg-white"
                            } `}
                        >
                            <Map
                                className={`w-10 h-10 group-hover:fill-white   ${
                                    categoryActive(categoryTerdekat)
                                        ? "fill-white"
                                        : "fill-poppins-gray"
                                }`}
                            ></Map>
                        </div>
                        <p className="group-hover:text-poppins-blue-700">
                            {categoryTerdekat}
                        </p>
                    </li>
                    <li
                        onClick={() => categoryHandler(categoryBestRating)}
                        className={`group cursor-pointer font-semibold flex flex-col items-center ${
                            categoryActive(categoryBestRating)
                                ? "text-poppins-blue-700"
                                : "text-poppins-gray"
                        }`}
                    >
                        <div
                            className={`w-16 h-16 flex justify-center items-center rounded-2xl group-hover:bg-poppins-orange ${
                                categoryActive(categoryBestRating)
                                    ? "bg-poppins-orange"
                                    : "bg-white"
                            } `}
                        >
                            <Badge
                                className={`w-10 h-10 group-hover:fill-white   ${
                                    categoryActive(categoryBestRating)
                                        ? "fill-white"
                                        : "fill-poppins-gray"
                                }`}
                            ></Badge>
                        </div>
                        <p className="group-hover:text-poppins-blue-700">
                            {categoryBestRating}
                        </p>
                    </li>
                </ul>
            </div>
        </>
    );
};
