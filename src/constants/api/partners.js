import axios from 'configs/axios';

export const partners = {
    getAll: (queryParams = {}) =>
        axios.get('/v1/partner', { params: queryParams }),
    getById: (id) => axios.get(`/v1/partner/${id}`),
};
