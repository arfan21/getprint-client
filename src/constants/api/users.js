import axios from 'configs/axios';

export const users = {
    create: (data = {}) => axios.post('/v1/user', data),
    getById: (token) =>
        axios.get(`/v1/user`, {
            auth: token,
            withCredentials: true,
        }),
    login: (data = {}) => axios.post('/v1/auth/login', data),
};
