import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore, { history } from './redux/configStore';
import { PersistGate } from 'redux-persist/integration/react'
import smoothscroll from 'smoothscroll-polyfill';
import { ConnectedRouter } from 'connected-react-router';
import ConnectedIntlProvider from './modules/intl/components/ConnectedIntlProvider';
import { setLocale } from './modules/intl/redux/intlReducer';

smoothscroll.polyfill();

const { store, persistor } = configureStore({});

store.dispatch(setLocale('vi'))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ConnectedIntlProvider>
            <App />
          </ConnectedIntlProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
