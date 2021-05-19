import React from "react";
import Footer from "parts/Footer";
import { Header } from "../parts/Header";
import { HomeBody } from "../parts/HomeBody";

export const Home = () => {
    return (
        <>
            <section className="bg-poppins-blue-200 z-10 container mx-auto px-8">
                <Header></Header>
            </section>
            <section className="container mx-auto px-8">
                <HomeBody></HomeBody>
            </section>
            <section className="rounded-t-2xl bg-white fixed container w-max-inherit mx-auto px-8 bottom-0">
                <Footer></Footer>
            </section>
        </>
    );
};
