import { carts } from 'constants/api/carts';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Print } from 'assets/Print.svg';
import { ReactComponent as Scan } from 'assets/Scan.svg';
import { ReactComponent as Photocopy } from 'assets/PhotoCopy.svg';
import { ReactComponent as Delete } from 'assets/delete.svg';
import { Qty } from 'components/form/qty';
import CardLoader from './CardLoader';
import { partners } from 'constants/api/partners';
import { Link } from 'react-router-dom';

export const CartBody = () => {
    const [cart, setCart] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [dataPartners, setDataPartners] = useState([]);
    const [isDeleteCart, setIsDeleteCart] = useState(false);
    const firstRender = useRef(true);

    useEffect(() => {
        const fetchCartsandPartners = async () => {
            try {
                const cartResponse = await carts.getByUserId();

                const dataCart = cartResponse?.data.reduce((r, a) => {
                    r[a.partner_id] = [...(r[a.partner_id] || []), a];
                    return r;
                }, {});
                const promisisFetchPartner = [];
                Object.keys(dataCart).forEach(async (partnerId) => {
                    promisisFetchPartner.push(partners.getById(partnerId));
                });
                const resPartners = await Promise.all(promisisFetchPartner);
                resPartners.forEach((dataPartner) => {
                    setDataPartners((oldDataPartners) => [
                        ...oldDataPartners,
                        dataPartner?.data,
                    ]);
                });
                setCart(dataCart);

                setIsLoading(false);
            } catch (error) {
                setCart({});

                setIsLoading(false);
            }
        };

        fetchCartsandPartners();
    }, []);

    useEffect(() => {
        if (Object.keys(cart).length > 0) {
            if (firstRender.current) {
                firstRender.current = false;
                return;
            }

            if (isDeleteCart) {
                setIsDeleteCart(false);
                return;
            }

            const updateCart = setTimeout(async () => {
                try {
                    const newCart = [];

                    Object.keys(cart).forEach((partnerId) => {
                        cart[partnerId].forEach((item) => {
                            newCart.push(item);
                        });
                    });

                    if (newCart.length > 0) {
                        await carts.updateBatch(newCart);
                    }
                } catch (error) {
                    firstRender.current = false;
                }
            }, 1000);
            return () => clearTimeout(updateCart);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    const deleteCartHandler = (cartId) => {
        setIsDeleteCart(true);
        const tempCart = { ...cart };

        // find partner id
        const partnerId = Object.keys(tempCart).find((partnerId) =>
            tempCart[partnerId].find((item) => item.id === cartId),
        );

        // find cart index
        const cartIndex = tempCart[partnerId].findIndex(
            (item) => item.id === cartId,
        );

        tempCart[partnerId].splice(cartIndex, 1);

        carts
            .deleteById(cartId)
            .then((res) => {
                if (tempCart[partnerId].length === 0) {
                    delete tempCart[partnerId];
                }

                setCart(tempCart);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="pt-6 pb-2 px-2">
            <div className="flex items-start justify-start flex-col w-full">
                {isLoading && <CardLoader></CardLoader>}
                {isLoading && <CardLoader></CardLoader>}
                {Object.keys(cart).length > 0 ? (
                    Object.keys(cart).map((partnerId, idx) => {
                        let partner = dataPartners.find(
                            (data) => data.id === Number(partnerId),
                        );
                        return (
                            <React.Fragment key={idx}>
                                <div>
                                    <Link to={`/partner/${partnerId}`}>
                                        <p>{partner?.name ?? ''}</p>
                                    </Link>
                                </div>
                                {cart[partnerId].map((item, index) => {
                                    return (
                                        <div
                                            className="relative bg-white shadow py-3 px-3 my-2 w-full h-full flex justify-start items-center rounded-md"
                                            key={index}
                                        >
                                            <div>
                                                <div>
                                                    {item?.order_type ===
                                                    'print' ? (
                                                        <Print className="w-20 h-20"></Print>
                                                    ) : item?.order_type ===
                                                      'fotocopy' ? (
                                                        <Photocopy className="w-20 h-20"></Photocopy>
                                                    ) : (
                                                        <Scan className="w-20 h-20"></Scan>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="px-5 w-full ">
                                                <p className="text-poppins-blue-700">
                                                    {item?.order_type ?? ''}
                                                </p>
                                                {/* <p className="text-poppins-orange">
                                                Rp.{partner?.print} / sheet
                                            </p> */}
                                            </div>
                                            <div className="flex w-full justify-end items-center">
                                                <div
                                                    onClick={() =>
                                                        deleteCartHandler(
                                                            item?.id,
                                                        )
                                                    }
                                                    className="group cursor-pointer px-1 mx-1 w-10 h-10 flex justify-center items-center shadow bg-poppins-white rounded-lg  hover:bg-poppins-orange"
                                                >
                                                    <Delete className="w-5 h-5 fill-poppins-orange group-hover:fill-white"></Delete>
                                                </div>
                                                <div className="px-1 mx-1">
                                                    <Qty
                                                        name={item?.order_type}
                                                        state={item}
                                                        setState={setCart}
                                                    ></Qty>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })
                ) : isLoading ? (
                    ''
                ) : (
                    <div>Your Getprint Cart is Empty</div>
                )}
            </div>
        </div>
    );
};
