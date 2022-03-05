import Cookies from 'js-cookie';
import React from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import { ROUTES } from '../../../config/routes';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';

interface Props extends RouteProps { }

const ProtectedRoute = (props: Props) => {
  const { ...rest } = props;
  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  if (auth) {
    // OUtlet component = this.props.children
    return <Route {...rest} />
  }

  return (
    <Redirect to={{
      pathname: ROUTES.login
    }} />
  )
}

export default ProtectedRoute