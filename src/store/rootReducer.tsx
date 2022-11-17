import { configureStore, combineReducers } from '@reduxjs/toolkit';
import websites from './websites/websites.slice';
import templates from './templates/templates.slice';
import legals from './legals/legalas.slice';
import offerOwner from './offerOwner/offerOwner.slice';
import offers from './offers/offers.slice';
import usersRole from './settings/usersRole.slice';
import language from './settings/language.slice';
import users from './users/users.slice';
import auth from './auth/auth.slice';

const reducers = combineReducers({
    websites,
    templates,
    legals,
    offerOwner,
    offers,
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
