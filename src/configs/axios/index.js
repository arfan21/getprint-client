import axios from 'axios';
import errorHandler from './errorHandler';
import store from 'store';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_GETPRINT_API_URL}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


instance.interceptors.response.use((response) => response.data, errorHandler);
instance.interceptors.request.use((config) => {
    const state = store.getState();
    const accessToken = state.accessToken;
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`; 
    }else{
        delete config.headers.Authorization 
    }
    
    return config
})

export default instance;
