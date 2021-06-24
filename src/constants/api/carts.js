import axios from 'configs/axios';

export const carts = {
    create: (data = {}) => axios.post('/v1/cart', data),
};
