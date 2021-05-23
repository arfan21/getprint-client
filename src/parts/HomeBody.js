import { partners } from "constants/api/partners";
import React, { useEffect, useRef, useState } from "react";
import { ListToko } from "./ListToko";

import { ListCategory } from "./ListCategory";

export const HomeBody = ({ changeHeight }) => {
    const [dataPartner, setdataPartner] = useState([]);
    const [category, setCategory] = useState("Terbaru");

    useEffect(() => {
        const queryParams = {};
        partners
            .getAll(queryParams)
            .then((res) => {
                const data = [];
                for (let i = 0; i < 2; i++) {
                    data.push(res?.data[0]);
                }
                // data[0] = res?.data[0];
                setdataPartner(data);
                changeHeight(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const categoryHandler = (textContent) => {
        setCategory(textContent);
    };

    const categoryActive = (textContent) => {
        if (textContent === category) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            <section className="pt-6 pb-2 px-2">
                <ListCategory
                    categoryHandler={categoryHandler}
                    categoryActive={categoryActive}
                ></ListCategory>
            </section>
            <section className="px-2 py-2">
                <div className="py-2">
                    <p className="text-poppins-blue-700 font-semibold text-xl">
                        {`Toko ${category}`}
                    </p>
                </div>
                <div className="py-5 flex flex-wrap items-center justify-center">
                    {dataPartner?.map((item, index) => {
                        return <ListToko data={item} key={index}></ListToko>;
                    })}
                </div>
            </section>
        </>
    );
};
