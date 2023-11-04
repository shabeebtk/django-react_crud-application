import authReducer from '../reducer/authReducer'
import allUsersReducer from '../reducer/allUserReducer';
import { combineReducers, legacy_createStore as createStore } from "redux";

export const rootReducer = combineReducers({
    auth : authReducer,
    all : allUsersReducer
})

const store = createStore(rootReducer)

export default store;