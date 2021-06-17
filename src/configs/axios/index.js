import axios from 'axios';

import errorHandler from './errorHandler';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_GETPRINT_API_URL}`,
    withCredentials: true,
    crossDomain: true,
    origin: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use((response) => response.data, errorHandler);

export { setAuthorizationHeader } from './setAuthorizationHeader';
export default instance;
