import { combineReducers } from 'redux';
import { users } from './users';
import { line } from './line';
import { accessToken } from './accessToken';

export default combineReducers({
    users,
    line,
    accessToken,
});
