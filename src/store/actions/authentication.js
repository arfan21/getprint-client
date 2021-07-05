import {
    SET_AUTH_ACCESS_TOKEN,
    SET_AUTH_IS_LOADING,
} from 'constants/types/authentication';

export const setAuthAccessToken = (token = null) => ({
    type: SET_AUTH_ACCESS_TOKEN,
    payload: token,
});

export const setAuthIsLoading = (loading = false) => ({
    type: SET_AUTH_IS_LOADING,
    payload: loading,
});
