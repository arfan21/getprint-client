import {
    SET_AUTH_ACCESS_TOKEN,
    SET_AUTH_IS_LOADING,
} from 'constants/types/authentication';

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    isLoading: true,
};

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_ACCESS_TOKEN:
            return {
                ...state,
                isAuthenticated: action.payload ? true : false,
                accessToken: action.payload,
                isLoading: false,
            };
        case SET_AUTH_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};
