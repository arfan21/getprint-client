import React, { useState } from "react";
import Footer from "parts/Footer";
import { Header } from "../parts/Header";
import { HomeBody } from "../parts/HomeBody";

export const Following = () => {
    const [height, setHeight] = useState("h-auto");

    const changeHeight = (data) => {
        if (data?.length <= 2) {
            setHeight("h-5/6");
        } else {
            setHeight("h-auto");
        }
    };

    return (
        <>
            <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full">
                <section className="bg-poppins-blue-200 z-10 container mx-auto px-4">
                    <Header></Header>
                </section>
                <section
                    id="homeBody"
                    className={`rounded-t-3xl bg-poppins-white container mx-auto px-4 -mt-6 ${height}`}
                >
                    <HomeBody changeHeight={changeHeight}></HomeBody>
                </section>
            </div>
            <div className="max-w-screen-sm rounded-t-2xl bg-white fixed container  mx-auto px-8 bottom-0 inset-x-0 z-20">
                <Footer></Footer>
            </div>
        </>
    );
};
