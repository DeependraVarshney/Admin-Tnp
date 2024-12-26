// store/slices/index.js
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import jnfReducer from './jnfSlice';
import studentReducer from './studentSlice';
import companyReducer from './companySlice';
import uiReducer from './uiSlice';
import notificationReducer from './notificationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  jnf: jnfReducer,
  student: studentReducer,
  company: companyReducer,
  ui: uiReducer,
  notifications: notificationReducer
});

export default rootReducer;

