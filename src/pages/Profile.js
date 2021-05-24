import React, { useState } from "react";
import Footer from "parts/Footer";
import { ProfileBody } from "parts/ProfileBody";

export const Profile = () => {
    return (
        <>
            <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full">
                <section className="bg-poppins-white container mx-auto px-4 h-full ">
                    <ProfileBody></ProfileBody>
                </section>
            </div>
        </>
    );
};
