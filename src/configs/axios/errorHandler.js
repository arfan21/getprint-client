import { toast } from "react-toastify";
import axios, { setAuthorizationHeader } from "./index";

export default async function errorHandler(error) {
    let message;

    if (error.response) {
        const originalRequest = error.config;

        if (error.response.status === 500) {
            message = "Something went terribly wrong";
        } else if (error.response.status === 403 && !originalRequest._retry) {
            message = error.response.data.message;
        } else {
            message = error.response.data.message;
        }

        if (typeof message === "string") toast.error(message);
        console.log(message);

        return Promise.reject(error);
    }
}
