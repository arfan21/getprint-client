import React from 'react';

export const Qty = ({ name, state, setState }) => {
    const incrementQty = (e) => {
        if (state.id) {
            setState((oldState) => {
                const foundIdx = oldState[state?.partner_id].findIndex(
                    (item) => item?.id === state.id,
                );

                let tempQty = state?.qty + 1;
                oldState[state?.partner_id][foundIdx] = {
                    ...state,
                    qty: tempQty,
                };

                return { ...oldState };
            });

            return;
        }
        let tempQty = state?.qty + 1;

        setState({ ...state, qty: tempQty });
    };

    const decrementQty = (e) => {
        if (state.id && state?.qty > 1) {
            setState((oldState) => {
                const foundIdx = oldState[state?.partner_id].findIndex(
                    (item) => item?.id === state.id,
                );

                let tempQty = state?.qty - 1;
                oldState[state?.partner_id][foundIdx] = {
                    ...state,
                    qty: tempQty,
                };

                return { ...oldState };
            });

            return;
        }
        if (!state.id && state?.qty > 0) {
            let tempQty = state?.qty - 1;
            setState({ ...state, qty: tempQty });
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
                value={state?.qty ?? 0}
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
