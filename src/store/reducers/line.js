import { LIFF_INIT } from 'constants/types/line';

const initialState = null;

export const line = (state = initialState, action) => {
    switch (action.type) {
        case LIFF_INIT:
            return action.payload;
        default:
            return state;
    }
};
