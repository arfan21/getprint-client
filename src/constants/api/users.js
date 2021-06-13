import axios from 'configs/axios';

export const users = {
    create: (data = {}) =>
        axios.post('/v1/user', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    getById: (token) =>
        axios.get(`/v1/user`, {
            auth: token,
            withCredentials: true,
        }),
    login: (data = {}) => axios.post('/v1/auth/login', data),
    refreshToken: (data = {}) =>
        axios.post('/v1/auth/refresh-token', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
};
