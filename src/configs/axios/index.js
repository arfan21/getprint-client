import axios from "axios";

import errorHandler from "./errorHandler";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_GETPRINT_API_URL}`,
});

instance.interceptors.response.use((response) => response.data, errorHandler);

export { default as setAuthorizationHeader } from "./setAuthorizationHeader";
export default instance;
