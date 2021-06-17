import { ProfileBody } from 'parts/ProfileBody';
import React from 'react';
import { withRouter } from 'react-router-dom';

const Profile = () => {
    return (
        <>
            <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full">
                <section className="bg-poppins-white container mx-auto px-3 h-full ">
                    <ProfileBody></ProfileBody>
                </section>
            </div>
        </>
    );
};

export default withRouter(Profile);
