import React, { useEffect, useState } from 'react';
import { ReactComponent as GpsIcon } from 'assets/gps.svg';
import { ReactComponent as StarIcon } from 'assets/StarIcon.svg';
import { ReactComponent as Print } from 'assets/Print.svg';
import { ReactComponent as Scan } from 'assets/Scan.svg';
import { ReactComponent as Photocopy } from 'assets/PhotoCopy.svg';
import { ReactComponent as Cart } from 'assets/Cart.svg';
import { Qty } from 'components/form/qty';
import { toast } from 'react-toastify';
import { carts } from 'constants/api/carts';
import { useHistory, useLocation } from 'react-router-dom';
export const DetailPartnerBody = ({ partner }) => {
    const history = useHistory();
    const location = useLocation();
    const path = location.pathname;
    const [state, setState] = useState({
        print: 0,
        scan: 0,
        fotocopy: 0,
    });

    const [cart, setCart] = useState([]);

    useEffect(() => {
        for (let key in state) {
            setCart((prevCart) => {
                const index = prevCart.findIndex(
                    (item) => item.order_type === key,
                );

                if (index >= 0) {
                    if (state[key] === 0) {
                        prevCart.splice(index, 1);
                    } else {
                        prevCart[index].qty = state[key];
                    }

                    return prevCart;
                } else if (index === -1 && state[key] > 0) {
                    const prevCartTemp = [
                        ...prevCart,
                        {
                            order_type: key,
                            qty: state[key],
                            partner_id: partner?.id,
                        },
                    ];

                    return prevCartTemp;
                } else {
                    return prevCart;
                }
            });
        }
    }, [state]);

    const addToCartHandler = async () => {
        if (cart.length === 0) {
            const toastId = 'prevCart-length';
            console.log('Order Minimum is 1 ');
            if (!toast.isActive(toastId.current)) {
                toast.error('Order Minimum is 1 ', {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: toastId,
                });
            }
        } else {
            try {
                await carts.create(cart);
            } catch (err) {
                if (err?.response?.status === 401) {
                    const toastId = '401';
                    if (!toast.isActive(toastId.current)) {
                        toast.error('You need to login first', {
                            position: toast.POSITION.TOP_CENTER,
                            toastId: toastId,
                            onClose: () => {
                                history.push(`/login?path=${path}`);
                            },
                        });
                    }
                }
            }
        }
    };

    return (
        <>
            <section className="pt-6 px-3">
                <div>
                    <p className="text-poppins-blue-700 font-semibold text-xl">
                        {partner?.name}
                    </p>
                </div>

                <div className="py-1 flex items-center">
                    <div>
                        <GpsIcon className="fill-poppins-orange w-5 h-4"></GpsIcon>
                    </div>
                    <p className="text-poppins-blue-700 inline px-1 text-sm font-normal truncate">
                        {partner?.address}
                    </p>
                </div>
            </section>
            <section className="my-3 py-0 px-3">
                <div className="bg-white shadow flex justify-between py-2">
                    <div className="flex items-center px-3 ">
                        <div className="px-1">
                            <StarIcon className="fill-poppins-orange"></StarIcon>
                        </div>
                        <div className="px-1">
                            <p className="text-poppins-orange text-sm font-medium leading-3 inline">
                                4.5
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center px-3">tes</div>
                    <div className="flex items-center px-3">tes</div>
                </div>
            </section>
            <section className="py-3 px-3">
                <div className="flex items-start justify-start flex-col w-full">
                    <div className="bg-white shadow py-3 px-3 my-2 w-full flex justify-start items-center">
                        <div>
                            <Print className="w-20 h-20"></Print>
                        </div>
                        <div className="px-5 w-full ">
                            <p className="text-poppins-blue-700">Print</p>
                            <p className="text-poppins-orange">
                                Rp.{partner?.print} / sheet
                            </p>
                        </div>
                        <div className="flex w-full justify-end">
                            <Qty
                                name="print"
                                state={state}
                                setState={setState}
                            ></Qty>
                        </div>
                    </div>
                    <div className="bg-white shadow py-3 px-3 my-2 w-full flex justify-start items-center">
                        <div>
                            <Scan className="w-20 h-20"></Scan>
                        </div>
                        <div className="px-5 w-full ">
                            <p className="text-poppins-blue-700">Scan</p>
                            <p className="text-poppins-orange">
                                Rp.{partner?.scan} / sheet
                            </p>
                        </div>
                        <div className="flex w-full justify-end">
                            <Qty
                                name="scan"
                                state={state}
                                setState={setState}
                            ></Qty>
                        </div>
                    </div>
                    <div className="bg-white shadow py-3 px-3 my-2 w-full flex justify-start items-center">
                        <div>
                            <Photocopy className="w-20 h-20"></Photocopy>
                        </div>
                        <div className="px-5 w-full ">
                            <p className="text-poppins-blue-700">Photocopy</p>
                            <p className="text-poppins-orange">
                                {' '}
                                Rp.{partner?.fotocopy} / sheet
                            </p>
                        </div>
                        <div className="flex w-full justify-end">
                            <Qty
                                name="fotocopy"
                                state={state}
                                setState={setState}
                            ></Qty>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-3 px-3">
                <div className="flex items-start justify-items-start flex-col w-full">
                    <button
                        onClick={addToCartHandler}
                        className="bg-poppins-orange shadow py-1.5 rounded-lg px-3 my-2 w-full flex items-center justify-center"
                    >
                        <div className="px-2">
                            <Cart className="w-7 h-7 fill-white"></Cart>
                        </div>
                        <div className="px-2">
                            <p className="text-white">Add to cart</p>
                        </div>
                    </button>
                </div>
            </section>
        </>
    );
};
