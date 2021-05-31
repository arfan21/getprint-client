import React from "react";
import Footer from "parts/Footer";
import { Header } from "../parts/Header";
import { HomeBody } from "../parts/HomeBody";

export const Home = () => {
    return (
        <>
            <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white ">
                <section className="bg-poppins-blue-200 z-10 container mx-auto px-4">
                    <Header></Header>
                </section>
                <section
                    id="homeBody"
                    className={`bg-poppins-white  rounded-t-3xl container mx-auto px-4 pb-5 -mt-6 `}
                >
                    <HomeBody></HomeBody>
                </section>
                <div className="items-center justify-center rounded-t-2xl bg-white fixed container w-max-inherit px-8 bottom-0 inset-x-0 z-20 m-auto">
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};
