import React from "react";
import Footer from "parts/Footer";
import { Header } from "../parts/Header";
import { FollowingBody } from "parts/FollowingBody";

export const Following = () => {
    return (
        <>
            <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white">
                <section className="bg-poppins-blue-200 z-10 container mx-auto px-4">
                    <Header></Header>
                </section>
                <section
                    className={`rounded-t-3xl bg-poppins-white container mx-auto px-4 -mt-6 `}
                >
                    <FollowingBody></FollowingBody>
                </section>
                <div className="items-center justify-center rounded-t-2xl bg-white fixed container w-max-inherit px-8 bottom-0 inset-x-0 z-20 m-auto">
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};
