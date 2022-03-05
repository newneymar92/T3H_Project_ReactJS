import { push } from 'connected-react-router'
import React, { useCallback, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'typesafe-actions'
import { API_PATHS } from '../../../config/api'
import { ROUTES } from '../../../config/routes'
import { ILocationParams, IRegisterParams } from '../../../models/authModel'
import { AppState } from '../../../redux/reducer'
import { getErrorMessageResponse } from '../../../utils'
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import { fetchThunk } from '../../common/redux/thunk'
import RegisterForm from '../components/RegisterForm'
import logo from '../../../assets/img/logo.jpg';

type Props = {}

const RegisterPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<{
    regions: ILocationParams[],
    states: ILocationParams[]
  }>({
    regions: [],
    states: []
  });

  const getLocations = useCallback(async (id?: string) => {
    // điều kiện nếu có id thì gọi state và setState còn nếu không có id thì phải gọi region và setRegion
    const json = await dispatch(fetchThunk(id ? `${API_PATHS.location}?pid=${id}` : API_PATHS.location, 'get'));

    if (!id && json?.code === RESPONSE_STATUS_SUCCESS) {
      setLocations((prev) => ({
        ...prev,
        regions: json.data
      }))
    }

    if (id && json?.code === RESPONSE_STATUS_SUCCESS) {
      setLocations((prev) => ({
        ...prev,
        states: json.data
      }))

      return
    }
  }, [dispatch])

  const onRegister = useCallback(async (values: IRegisterParams) => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.register, 'post', {
      email: values.email,
      password: values.password,
      repeatPassword: values.repeatPassword,
      name: values.name,
      gender: values.gender,
      region: values.region,
      state: values.state
    }))

    setLoading(false);

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      dispatch(push(ROUTES.login))
      return;
    }

    setErrorMessage(getErrorMessageResponse(json))
  }, [dispatch])

  useEffect(() => {
    getLocations();
  }, [])

  return (
    <div className="container d-flex flex-column justify-content-md-center align-items-md-center"
      style={{ minHeight: "100vh" }}>
      <img src={logo} alt="logoPGA" style={{ maxWidth: '250px', margin: '32px' }} />
      <RegisterForm
        loading={loading}
        errorMessage={errorMessage}
        onRegister={onRegister}
        regions={locations.regions}
        states={locations.states}
        getLocations={getLocations}
      />

      <Link to={ROUTES.login} className="text-decoration-none">
        <FormattedMessage id="accountAlready" />
      </Link>
    </div>
  )
}

export default RegisterPage