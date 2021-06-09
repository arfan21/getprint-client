import { toast } from 'react-toastify';
import axios from './index';

export default async function errorHandler(error) {
    let message;

    if (error.response) {
        const originalRequest = error.config;

        if (error.response.status === 500) {
            message = 'Something went terribly wrong';
        } else if (error.response.status === 403 && !originalRequest._retry) {
            try {
                if (originalRequest.url === '/refresh-tokens')
                    throw new Error('session expired, please re login!');
                originalRequest._retry = true;
                return axios(originalRequest);
            } catch (error) {
                message = error.response.data.message;
            }
        } else {
            message = error.response.data.message;
        }

        if (typeof message === 'string') toast.error(message);
        console.log(message);

        return Promise.reject(error);
    }
}
