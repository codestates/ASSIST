import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userReducer';
import propsReducer from './propsReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer'],
};

const rootReducer = combineReducers({
  userReducer,
  propsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
