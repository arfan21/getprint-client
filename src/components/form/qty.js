import React from 'react';

export const Qty = ({ name, state, setState }) => {
    const incrementQty = (e) => {
        let tempQty = state[e.target.name] + 1;
        setState({ ...state, [e.target.name]: tempQty });
    };

    const decrementQty = (e) => {
        if (state[e.target.name] > 0) {
            let tempQty = state[e.target.name] - 1;
            setState({ ...state, [e.target.name]: tempQty });
        }
    };

    return (
        <>
            <button
                className="w-10 shadow bg-poppins-white hover:bg-poppins-orange hover:text-white rounded-lg focus:outline-none"
                name={name}
                onClick={decrementQty}
            >
                &mdash;
            </button>
            <input
                name={name}
                type="text"
                value={state[name]}
                className=" form-input outline-none border-none focus:outline-none w-12 text-center"
                readOnly
                disabled
            ></input>
            <button
                className={`w-10 shadow rounded-lg focus:outline-none bg-poppins-white hover:bg-poppins-orange hover:text-white`}
                name={name}
                onClick={incrementQty}
            >
                &#xff0b;
            </button>
        </>
    );
};
