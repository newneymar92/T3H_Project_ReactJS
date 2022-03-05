import { ACCESS_TOKEN_KEY } from "../../../utils/constants";
import { ThunkAction } from 'redux-thunk';
import { Action } from "redux";
import Cookies from "js-cookie";
import { RESPONSE_STATUS_UNAUTHORIZED } from "../../../utils/httpResponseCode";
import { AppState } from "../../../redux/reducer";


export function fetchThunk(
  url: string,
  method: 'get' | 'post' | 'delete' | 'PUT',
  body?: object | FormData,
  auth = true,
  contentType?: string,
): ThunkAction<Promise<any>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {

    const res = await fetch(url, {
      credentials: 'include',
      method,
      // không up được form data vì nó đang stringify
      body: typeof body === 'object' ? JSON.stringify(body) : body,
      headers:
        contentType !== 'multipart/form-data'
          ? {
            'Content-Type': contentType || 'application/json',
            Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
          }
          : {
            Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
          },
      // cache: 'no-store',
    });

    const json = await res.json();

    if (res.status === RESPONSE_STATUS_UNAUTHORIZED) {
      // dispatch logout, remove access token here.
    }

    return json;
    // throw new Error('Error');
  };
}

