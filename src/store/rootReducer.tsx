import { configureStore, combineReducers } from '@reduxjs/toolkit';
import usersRole from './settings/usersRole.slice';
import language from './settings/language.slice';
import users from './users/users.slice';
import auth from './auth/auth.slice';

const reducers = combineReducers({
    usersRole,
    language,
    users,
    auth,
});

export const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
