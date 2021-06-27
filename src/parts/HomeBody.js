import { partners } from 'constants/api/partners';
import React, { useEffect, useState } from 'react';
import CardLoader from './CardLoader';

import { ListCategory } from './ListCategory';
import ListPartners from './ListPartners';

export const HomeBody = () => {
    const [dataPartner, setdataPartner] = useState([]);
    const [category, setCategory] = useState('Terbaru');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const queryParams = {};
        partners
            .getAll(queryParams)
            .then((res) => {
                const data = res?.data;
                for (let i = 0; i < 50; i++) {
                    data.push(res?.data[0]);
                }
                setdataPartner(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
        return () => {
            setIsLoading(false);
        }
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
                <div className="py-2 flex flex-col items-center justify-center">
                    {isLoading && <CardLoader key="1"></CardLoader>}
                    {isLoading && <CardLoader key="2"></CardLoader>}
                    {dataPartner?.map((item, index) => {
                        return (
                            <ListPartners
                                data={item}
                                key={index}
                            ></ListPartners>
                        );
                    })}
                </div>
            </section>
        </>
    );
};
