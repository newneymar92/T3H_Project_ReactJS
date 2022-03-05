import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../config/api';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../../auth/redux/authReducer';
import Header from '../../common/components/Header'

const HomePage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

  const getProfile = React.useCallback(async () => {

    if (accessToken && !user) {
      const json = await dispatch(async (dispatch, getState) => {
        const res = await fetch(API_PATHS.userProfile, {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
            cache: 'no-store',
          }
        })

        const resData = await res.json();

        return resData
      });
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo({ ...json.data, token: accessToken }));
      }
    }
  }, [dispatch, user]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <Header name={user?.name} avatar={user?.avatar} />
  )
}

export default HomePage