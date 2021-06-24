import { auth } from 'constants/api/auth';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import liff from '@line/liff';
import { useDispatch, useSelector } from 'react-redux';
import { populateProfile } from 'store/actions/users';
import HashLoader from 'react-spinners/HashLoader';
import { setAccessToken } from 'store/actions/accessToken';
import { setAuthorizationHeader } from 'configs/axios';

export const LineCallback = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const lineLiffInit = useSelector((state) => state.line);

    useEffect(() => {
        if (lineLiffInit) {
            if (liff.isLoggedIn()) {
                const idToken = liff.getIDToken();
                auth.lineCallback({
                    id_token: idToken,
                })
                    .then(async (res) => {
                        dispatch(setAccessToken(res.data.token));
                        setAuthorizationHeader(res.data.token);
                        const userData = await auth.verify();
                        dispatch(populateProfile(userData.data));
                        history.push('/');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }, [lineLiffInit, dispatch]);

    return (
        <div className="max-w-screen-sm  my-0 mx-auto relative box-border h-full bg-poppins-white ">
            <div
                className={`absolute flex items-center justify-center w-full h-full bg-poppins-blue-300 z-50 bg-opacity-50`}
            >
                <HashLoader color="#0E0943" size="150px"></HashLoader>
            </div>
        </div>
    );
};
