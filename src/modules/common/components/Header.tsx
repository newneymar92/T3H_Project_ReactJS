import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';
import React from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../config/routes';
import { AppState } from '../../../redux/reducer'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { removeAuthorization } from '../../auth/redux/authReducer';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

interface Props {
  name?: string,
  avatar?: string,
}

const Header = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid mx-5">
        <div className="" id="navbarNav">
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.album}>
                <FormattedMessage id="album" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.userInfo} >
                <FormattedMessage id="userInfo" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.table}>
                <FormattedMessage id="table" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center ">
          {props.avatar ? (
            <div>
              <img src="" alt="" />
            </div>
          ) : (
            <div className="rounded-circle d-flex align-items-center justify-content-center bg-primary me-3" style={{
              width: '50px',
              height: '50px'
            }}>
              <p style={{
                fontSize: '20px',
                lineHeight: '20px',
                fontWeight: 'bold',
                marginBottom: '0'
              }}>
                {props.name?.charAt(0).toUpperCase()}
              </p>
            </div>
          )}
          <div>
            <button type="button" className="btn btn-secondary " onClick={() => {
              Cookies.remove(ACCESS_TOKEN_KEY)
              dispatch(replace(ROUTES.login))
              dispatch(removeAuthorization())
            }}>
              <FormattedMessage id="signOut" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header