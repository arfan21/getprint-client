import axios from 'configs/axios';

export const carts = {
    create: (data = {}) => axios.post('/v1/cart', data),
    createFile: (data = {}) => axios.post('/v1/cart/cartfile', data),
    getByUserId: () => axios.get(`/v1/cart/user`),
    updateCartFile: (data = {}) => axios.put('/v1/cart/cartfile', data),
    updateBatch: (data = []) => axios.put(`/v1/cart/updatebatch`, data),
    deleteById: (id = 0) => axios.delete(`/v1/cart/id/${id}`),
};
