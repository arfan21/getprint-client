import Footer from 'parts/Footer';
import { Header } from 'parts/Header';
import React from 'react';

export const Cart = () => {
    return (
        <>
            <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white ">
                <section className="bg-poppins-blue-200 z-10 container mx-auto px-4">
                    <Header></Header>
                </section>
                <section
                    className={`bg-poppins-white  rounded-t-3xl container mx-auto px-4 pb-5 -mt-6 `}
                ></section>
                <div className="items-center justify-center rounded-t-2xl bg-white fixed container w-max-inherit px-8 bottom-0 inset-x-0 z-50 m-auto">
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};