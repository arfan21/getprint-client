import { combineReducers } from 'redux';
import { users } from './users';
import { line } from './line';
import { authentication } from './authentication';

export default combineReducers({
    users,
    line,
    authentication,
});
