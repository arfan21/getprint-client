import { toast } from 'react-toastify';
import axios from './index';
import { auth } from 'constants/api/auth';
import history from 'helpers/history';
import store from 'store';
import liff from '@line/liff';
import { populateProfile } from 'store/actions/users';
import { setAccessToken } from 'store/actions/accessToken';

export default async function ErrorHandler(error) {
    let message;
    if (!error.response) {
        return Promise.reject(error);
    }
    
    const originalRequest = error.config;

    try {
        if (error.response.status === 500){
            throw new Error('something went terribly wrong')
        } 

        if (error.response.status === 401 && !originalRequest._retry) {  
            if (originalRequest.url === '/v1/auth/refresh-token') {
                await auth.logout();
                store.dispatch(setAccessToken(null));
                store.dispatch(populateProfile(null));
                throw new Error('session expired, please re login!');
            }

            originalRequest._retry = true;

            const state = store.getState();
            const accessToken = state.accessToken;
            const user = state.users
            let expired
                    
            if(user){
                expired  = Date.now() >= user.exp * 1000
            }        
            
            if (!accessToken || expired) {
                const newToken = await auth.refreshToken();
                store.dispatch(setAccessToken(newToken.data.token));
            };
            
            return axios(originalRequest);
        }

        message = error?.response?.data?.message;
        
    } catch (error) {
        message = error?.response?.data?.message ?? error?.message;
    }

    

    if (typeof message === 'string') {
        if (message === 'session expired, please re login!') {
            if (!liff.isInClient()) {
                toast.error(message, {
                    position: toast.POSITION.TOP_CENTER,
                    onClose: () => {
                        history.push('/login');
                    },
                });
            }
        } else if (message === 'something went terribly wrong') {
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    return Promise.reject(error);
}
