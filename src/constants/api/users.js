import axios from 'configs/axios';

export const users = {
    create: (data = {}) =>
        axios.post('/v1/user', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    getById: () => axios.get(`/v1/user`),
};
