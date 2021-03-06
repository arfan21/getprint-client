import React, { useState } from 'react';
import { ReactComponent as GpsIcon } from 'assets/gps.svg';
import { ReactComponent as StarIcon } from 'assets/StarIcon.svg';
import { ReactComponent as Print } from 'assets/Print.svg';
import { ReactComponent as Scan } from 'assets/Scan.svg';
import { ReactComponent as Photocopy } from 'assets/PhotoCopy.svg';
import { ReactComponent as Cart } from 'assets/Cart.svg';
import { ReactComponent as AddToCart } from 'assets/AddToCart.svg';
import { toast } from 'react-toastify';
import { carts } from 'constants/api/carts';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const DetailPartnerBody = ({ partner }) => {
    const history = useHistory();
    const location = useLocation();
    const path = location.pathname;

    const [cartPrint, setCartPrint] = useState({
        order_type: 'print',
    });
    const [cartScan, setCartScan] = useState({
        order_type: 'scan',
    });
    const [cartFotocopy, setCartFotocopy] = useState({
        order_type: 'fotocopy',
    });

    const users = useSelector((state) => state.users);

    const addToCartHandler = () => {
        if (!users) {
            history.push(`/login?path=${path}`);
        }
        const newCart = [];
        if (cartPrint.qty > 0) {
            newCart.push({
                ...cartPrint,
                partner_id: partner?.id,
                user_id: users.sub,
            });
        }
        if (cartScan.qty > 0) {
            newCart.push({
                ...cartScan,
                partner_id: partner?.id,
                user_id: users.sub,
            });
        }
        if (cartFotocopy.qty > 0) {
            newCart.push({
                ...cartFotocopy,
                partner_id: partner?.id,
                user_id: users.sub,
            });
        }

        const toastId = 'addtocart';
        if (newCart.length === 0) {
            if (!toast.isActive(toastId.current)) {
                toast.error('Order Minimum is 1 ', {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: toastId,
                });
            }

            return;
        }

        carts
            .create(newCart)
            .then((res) => {
                if (!toast.isActive(toastId.current)) {
                    toast.info('Success add item to cart', {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: toastId,
                    });
                }
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    history.push(`/login?path=${path}`);
                }
            });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!users) {
            history.push(`/login?path=${path}`);
        }

        const formId = e.target.id;
        let newCart = {};

        if (formId === cartPrint.order_type) {
            newCart = { ...cartPrint };
        }
        if (formId === cartScan.order_type) {
            newCart = { ...cartScan };
        }
        if (formId === cartFotocopy.order_type) {
            newCart = { ...cartFotocopy };
        }

        newCart['partner_id'] = partner?.id;
        newCart['user_id'] = users.sub;

        const toastId = 'addtocart';

        carts
            .create(newCart)
            .then((res) => {
                if (!toast.isActive(toastId.current)) {
                    toast.info('Success add item to cart', {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: toastId,
                    });
                }
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    history.push(`/login?path=${path}`);
                }

                if (err?.response?.status === 409) {
                    if (!toast.isActive(toastId.current)) {
                        toast.error('Item already exist in cart', {
                            position: toast.POSITION.TOP_CENTER,
                            toastId: toastId,
                        });
                    }
                }
            });
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
                <div className="bg-white shadow flex justify-between py-2 rounded-md">
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
                    <div className="bg-white shadow py-3 px-3 my-2 w-full flex justify-start items-center rounded-md">
                        <div>
                            <Print className="w-20 h-20 "></Print>
                        </div>
                        <div className="px-5 w-full ">
                            <p className="text-poppins-blue-700">Print</p>
                            <p className="text-poppins-orange">
                                Rp.{partner?.print} / sheet
                            </p>
                        </div>
                        <form
                            onSubmit={onSubmitHandler}
                            className="flex w-full justify-end"
                            id="print"
                        >
                            <button
                                type="submit"
                                className="outline-none focus:outline-none"
                            >
                                <div className="group px-2.5 py-2.5 hover:bg-green-500 bg-poppins-white rounded-lg cursor-pointer mx-3">
                                    <AddToCart className="w-7 h-7 fill-black group-hover:fill-white"></AddToCart>
                                </div>
                            </button>
                        </form>
                    </div>
                    <div className="bg-white shadow py-3 px-3 my-2 w-full flex justify-start items-center rounded-md">
                        <div>
                            <Scan className="w-20 h-20"></Scan>
                        </div>
                        <div className="px-5 w-full ">
                            <p className="text-poppins-blue-700">Scan</p>
                            <p className="text-poppins-orange">
                                Rp.{partner?.scan} / sheet
                            </p>
                        </div>
                        <form
                            onSubmit={onSubmitHandler}
                            className="flex w-full justify-end"
                            id="scan"
                        >
                            <button
                                type="submit"
                                className="outline-none focus:outline-none"
                            >
                                <div className="group px-2.5 py-2.5 hover:bg-green-500 bg-poppins-white rounded-lg cursor-pointer mx-3">
                                    <AddToCart className="w-7 h-7 fill-black group-hover:fill-white"></AddToCart>
                                </div>
                            </button>
                        </form>
                    </div>
                    <div className="bg-white shadow py-3 px-3 my-2 w-full flex justify-start items-center rounded-md">
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
                        <form
                            onSubmit={onSubmitHandler}
                            className="flex w-full justify-end"
                            id="fotocopy"
                        >
                            <button
                                type="submit"
                                className="outline-none focus:outline-none"
                            >
                                <div className="group px-2.5 py-2.5 hover:bg-green-500 bg-poppins-white rounded-lg cursor-pointer mx-3">
                                    <AddToCart className="w-7 h-7 fill-black group-hover:fill-white"></AddToCart>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <section className="py-0 px-3 sticky bottom-0">
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
