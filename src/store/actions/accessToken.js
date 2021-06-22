import { SET_ACCESS_TOKEN } from 'constants/types/accessToken';

export const setAccessToken = (token = null) => ({
    type: SET_ACCESS_TOKEN,
    payload: token,
});
