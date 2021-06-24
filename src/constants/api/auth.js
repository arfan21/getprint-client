import axios from 'configs/axios';

export const auth = {
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
