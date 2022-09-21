import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authentication/authentication.slice';
import usersRole from './settings/usersRole.slice';
import language from './settings/language.slice';
import users from './users/users.slice';

const reducers = combineReducers({
    authSlice,
    usersRole,
    language,
    users,
});

export const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
