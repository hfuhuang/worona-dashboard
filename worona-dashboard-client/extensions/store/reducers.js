import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { accounts } from 'accounts/reducers';
import { theme } from 'chess-theme/reducers';

const reducers = combineReducers({
  accounts,
  theme,
  form,
  routing: routerReducer,
});

export default reducers;
