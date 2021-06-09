import { partners } from 'constants/api/partners';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { DetailPartnerHeader } from 'parts/DetailPartnerHeader';
import { DetailPartnerBody } from 'parts/DetailPartnerBody';

const DetailPartner = ({ match, history }) => {
    const [partner, setPartner] = useState({});

    const partnerId = match.params?.id;

    useEffect(() => {
        partners
            .getById(partnerId)
            .then((res) => {
                setPartner(res?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [partnerId]);
    return (
        <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white ">
            <section className="relative container mx-auto h-60 z-0">
                <DetailPartnerHeader partner={partner}></DetailPartnerHeader>
            </section>
            <section className="bg-poppins-white rounded-t-3xl container mx-auto px-4 pb-5 -mt-6 z-50 relative">
                <DetailPartnerBody partner={partner}></DetailPartnerBody>
            </section>
        </div>
    );
};

export default withRouter(DetailPartner);
