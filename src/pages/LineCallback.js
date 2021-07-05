import { auth } from 'constants/api/auth';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import liff from '@line/liff';
import { useDispatch, useSelector } from 'react-redux';
import { populateProfile } from 'store/actions/users';
import { setAuthAccessToken } from 'store/actions/authentication';
import { Loading } from 'parts/Loading';
export const LineCallback = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const lineLiffInit = useSelector((state) => state.line);
    const authentication = useSelector((state) => state.authentication);

    useEffect(() => {
        if (lineLiffInit) {
            if (liff.isLoggedIn()) {
                const idToken = liff.getIDToken();
                auth.lineCallback({
                    id_token: idToken,
                })
                    .then(async (res) => {
                        dispatch(setAuthAccessToken(res.data.token));
                        const userData = await auth.verify();
                        dispatch(populateProfile(userData.data));
                        history.push('/');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }, [lineLiffInit, dispatch, history]);

    if (authentication.IsLoading) {
        return <Loading></Loading>;
    }

    return <Loading></Loading>;
};
