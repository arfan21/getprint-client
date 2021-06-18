import { combineReducers } from 'redux';
import { users } from './users';
import { line } from './line';

export default combineReducers({
    users,
    line,
});
