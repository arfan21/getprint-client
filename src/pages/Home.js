import React from 'react';
import Footer from 'parts/Footer';
import { Header } from '../parts/Header';
import { HomeBody } from '../parts/HomeBody';
import { withRouter } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white flex flex-col">
                <section className="bg-poppins-blue-200 z-10 container mx-auto px-4">
                    <Header></Header>
                </section>
                <section
                    className={`bg-poppins-white  rounded-t-3xl container mx-auto px-4 pb-5 -mt-6 z-10`}
                >
                    <HomeBody></HomeBody>
                </section>
                <section className="container sticky w-full bottom-0 z-50 mt-auto flex flex-col">
                    <div className="w-full rounded-t-2xl bg-white px-8 -mt-5">
                        <Footer></Footer>
                    </div>
                </section>
            </div>
        </>
    );
};

export default withRouter(Home);
