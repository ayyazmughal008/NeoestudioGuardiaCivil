import { createStore, applyMiddleware } from 'redux';
//import {AsyncStorage} from 'react-native'
import thunk from 'redux-thunk';
import reducer from './reducer';
import { persistReducer, persistStore } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
  blacklist: ['dialog']
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const Store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(Store);

//module.exports = { Store, persistor };
