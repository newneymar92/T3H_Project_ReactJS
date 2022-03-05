import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './reducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile', 'router', 'intl']
};

export default function configureStore(preloadedState: any) {

  // delay quá trình render UI app của bạn cho đến khi state đã được lấy ra và lưu trở lại vào Redux.
  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history),
  );

  const store = createStore(
    persistedReducer, // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        // ... other middlewares ...
      ),
    ),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
