import { toast } from 'react-toastify';
import axios from './index';
import { users } from 'constants/api/users';
import Cookies from 'universal-cookie';

export default async function ErrorHandler(error) {
    const cookies = new Cookies();
    let message;
    if (error.response) {
        const originalRequest = error.config;

        if (error.response.status === 500) {
            message = 'Something went terribly wrong';
        } else if (error.response.status === 401 && !originalRequest._retry) {
            try {
                if (originalRequest.url === '/v1/auth/refresh-token') {
                    cookies.remove('X-GETPRINT-KEY');
                    cookies.remove('X-GETPRINT-REFRESH-TOKEN');

                    throw new Error('session expired, please re login!');
                }

                originalRequest._retry = true;

                const userCookeis =
                    cookies.get('X-GETPRINT-REFRESH-TOKEN') ?? null;
                const newTokenRes = await users.refreshToken(userCookeis);

                cookies.set('X-GETPRINT-KEY', newTokenRes?.data?.token, {
                    sameSite: 'none',
                    secure: true,
                });

                return axios(originalRequest);
            } catch (error) {
                console.log(typeof error.message);
                message = error?.response?.data?.message ?? error;
            }
        } else {
            message = error?.response?.data?.message;
        }

        if (typeof message === 'string') {
            if (message === 'session expired, please re login!') {
                toast.error(message, {
                    position: toast.POSITION.TOP_CENTER,
                    onClose: () => {
                        window.location.replace('/login');
                    },
                });
            } else {
                toast.error(message, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }

        return Promise.reject(error);
    }
}
