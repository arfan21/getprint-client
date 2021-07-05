import axios from 'configs/axios';

export const carts = {
    create: (data = {}) => axios.post('/v1/cart', data),
    getByUserId: (userId = '') => axios.get(`/v1/cart/user/${userId}`),
    updateBatch: (data = []) => axios.put(`/v1/cart/updatebatch`, data),
};
