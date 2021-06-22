import { toast } from 'react-toastify';
import axios from './index';
import { users } from 'constants/api/users';
import Cookies from 'universal-cookie';
import history from 'helpers/history';
import store from 'store';
import { setAuthorizationHeader } from './setAuthorizationHeader';
import { setAccessToken } from 'store/actions/accessToken';

export default async function ErrorHandler(error) {
    const cookies = new Cookies();
    let message;
    if (error.response) {
        const originalRequest = error.config;
        console.log();
        if (error.response.status === 500) {
            message = 'Something went terribly wrong';
        } else if (error.response.status === 401 && !originalRequest._retry) {
            try {
                if (originalRequest.url === '/v1/auth/refresh-token') {
                    await users.logout();
                    throw new Error('session expired, please re login!');
                }

                originalRequest._retry = true;

                const state = store.getState();
                const accessToken = state.accessToken;
                if (!accessToken) {
                    const newToken = await users.refreshToken();
                    setAuthorizationHeader(newToken.data.token);
                    store.dispatch(setAccessToken(newToken.data.token));
                }

                return axios(originalRequest);
            } catch (error) {
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
                        history.push('/login');
                    },
                });
            } else if (message === 'Something went terribly wrong') {
                toast.error(message, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }

        return Promise.reject(error);
    }
}
