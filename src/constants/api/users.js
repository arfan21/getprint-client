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
        }),
    login: (data = {}) => axios.post('/v1/auth/login', data),
    lineCallback: (data = {}) => axios.post('/v1/auth/line-callback', data),
    verify: () => axios.post('/v1/auth/verify'),
    logout: () => axios.post('/v1/auth/logout'),
    refreshToken: (data = {}) =>
        axios.post('/v1/auth/refresh-token', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
};
