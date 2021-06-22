import { SET_ACCESS_TOKEN } from 'constants/types/accessToken';

const initialState = null;
export const accessToken = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return action.payload;
        default:
            return state;
    }
};
