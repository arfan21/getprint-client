import { LIFF_INIT } from 'constants/types/line';

export const liffInit = (init = false) => ({
    type: LIFF_INIT,
    payload: init,
});
