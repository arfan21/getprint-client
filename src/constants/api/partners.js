import axios from "configs/axios";

export const partners = {
    getAll: (queryParams = {}) =>
        axios.get("/partner", { params: queryParams }),
};
