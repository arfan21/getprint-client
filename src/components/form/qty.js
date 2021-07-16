import React, { useEffect, useRef } from 'react';

export const Qty = ({
    value,
    fileId,
    cartId,
    partnerId,
    name,
    state,
    setState,
    onChangeHandler,
}) => {
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const onChangeTimeOut = setTimeout(
            () => onChangeHandler(fileId, cartId, partnerId),
            500,
        );

        return () => clearTimeout(onChangeTimeOut);
    }, [value]);

    const incrementQty = (e) => {
        const cartByPartnerId = [...state[partnerId]];
        const cartIndex = state[partnerId].findIndex(
            (item) => item.id === cartId,
        );
        const cartByIndex = { ...cartByPartnerId[cartIndex] };

        const fileIndex = cartByIndex.files.findIndex(
            (file) => file.id === fileId,
        );

        const file = { ...cartByIndex.files[fileIndex], qty: value + 1 };

        cartByIndex.files[fileIndex] = file;
        cartByPartnerId[cartIndex] = cartByIndex;

        setState({ ...state, [partnerId]: cartByPartnerId });
    };

    const decrementQty = (e) => {
        if (value > 1) {
            const cartByPartnerId = [...state[partnerId]];
            const cartIndex = state[partnerId].findIndex(
                (item) => item.id === cartId,
            );
            const cartByIndex = { ...cartByPartnerId[cartIndex] };

            const fileIndex = cartByIndex.files.findIndex(
                (file) => file.id === fileId,
            );

            const file = { ...cartByIndex.files[fileIndex], qty: value - 1 };

            cartByIndex.files[fileIndex] = file;
            cartByPartnerId[cartIndex] = cartByIndex;

            setState({ ...state, [partnerId]: cartByPartnerId });
        }
    };

    return (
        <div className="flex flex-row">
            <button
                className="w-10 h-10 shadow bg-poppins-white hover:bg-poppins-orange hover:text-white rounded-lg focus:outline-none"
                name={name}
                onClick={decrementQty}
            >
                &mdash;
            </button>
            <input
                name={name}
                type="text"
                value={value}
                className=" form-input outline-none border-none focus:outline-none w-12 text-center"
                readOnly
                disabled
            ></input>
            <button
                className={`w-10 h-10  shadow rounded-lg focus:outline-none bg-poppins-white hover:bg-green-500 hover:text-white`}
                name={name}
                onClick={incrementQty}
            >
                &#xff0b;
            </button>
        </div>
    );
};
