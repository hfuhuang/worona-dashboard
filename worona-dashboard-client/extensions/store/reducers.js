import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import accounts from 'accounts/reducers';
import connection from 'connection/reducers';
import theme from 'chess-theme/reducers';

const reducers = combineReducers({
  routing,
  form,
  accounts,
  connection,
  theme,
});

export default reducers;
