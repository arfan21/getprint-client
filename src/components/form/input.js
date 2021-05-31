import React from "react";
import propTypes from "prop-types";

export const Input = ({
    value,
    errors,
    name,
    onChange,
    placeholder,
    labelName,
    inputType,
    className,
}) => {
    return (
        <div className="flex flex-col">
            {labelName ? (
                <label className="text-poppins-blue-700" htmlFor={name}>
                    {labelName}
                </label>
            ) : (
                <label></label>
            )}
            <input
                name={name}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`rounded-lg outline-none pl-4 pr-10 py-1 ${className}`}
            ></input>
        </div>
    );
};

Input.propTypes = {
    value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    errors: propTypes.string,
    name: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string,
    labelName: propTypes.string,
    inputType: propTypes.oneOf(["text", "email", "password"]).isRequired,
    className: propTypes.string,
};
