import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import albumReducer, { AlbumState } from '../modules/album/redux/albumReducer';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import tableReducer, { TableState } from '../modules/table/redux/tableReducer'

export interface AppState {
  profile: AuthState;
  router: RouterState;
  intl: IntlState;
  album: AlbumState,
  table: TableState
}

export default function createRootReducer(history: History) {
  return combineReducers({
    // để quản lý router trong redux
    router: connectRouter(history),
    profile: authReducer,
    intl: intlReducer,
    album: albumReducer,
    table: tableReducer
  });
}