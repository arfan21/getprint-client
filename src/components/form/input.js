import React from "react";
import propTypes from "prop-types";

export const Input = ({
    value,
    errors,
    name,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    labelName,
    inputType,
}) => {
    return (
        <div className="flex flex-col">
            {labelName ?? <label></label>}
            <input
                name={name}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={[
                    "bg-poppins-blue-300 rounded-lg text-poppins-blue-100 border-none outline-none pl-4 pr-10 py-2 hover:bg-indigo-800 focus:bg-indigo-800",
                ]}
            ></input>
        </div>
    );
};

Input.propTypes = {
    value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    errors: propTypes.string,
    name: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    onFocus: propTypes.func,
    onBlur: propTypes.func,
    placeholder: propTypes.string,
    labelName: propTypes.string,
    inputType: propTypes.oneOf(["text", "email", "password"]).isRequired,
};
