import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LoginForm from '../components/LoginForm';
import { ILoginParams } from '../../../models/authModel';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../config/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { Action } from 'typesafe-actions';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { getErrorMessageResponse } from '../../../utils';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../config/routes';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.jpg';
import { FormattedMessage } from 'react-intl';
import { setUserInfo } from '../redux/authReducer';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const auth = useMemo(() => {
    return Cookies.get(ACCESS_TOKEN_KEY);
  }, [])

  const onLogin = useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', {
          email: values.email,
          password: values.password
        }))

      setLoading(false)

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data))

        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });

        dispatch(replace(ROUTES.home))
        return;
      }

      setErrorMessage(getErrorMessageResponse(json))
    }
    , [dispatch])


  useEffect(() => {
    if (auth) {
      dispatch(replace(ROUTES.home))
    }
  }, [])

  return (
    <div className="container d-flex flex-column justify-content-md-center align-items-md-center"
      style={{ minHeight: "100vh" }}>
      <img src={logo} alt="logoPGA" style={{ maxWidth: '250px', margin: '32px' }} />
      <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />

      <Link to={ROUTES.register} className="text-decoration-none">
        <FormattedMessage id="accountNotAlready" />
      </Link>
    </div>
  )

};

export default LoginPage;
