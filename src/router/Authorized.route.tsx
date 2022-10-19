import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Page from '../views/Authorized';

export const ROUT_PATH = {
    HOME: '/',
    LANDINGS: '/landings',
    TEMPLATES: '/templates',
    LEGALS: '/legals',
    OFFER_OWNER: '/offer-owner',
    OFFERS: '/offers',
    USERS: '/users',
    USERS_EDIT_ID: '/users/edit/:userId',
    USERS_CREATE: '/users/create',
    MY_PROFILE: '/my-profile',
    SETTINGS: '/settings',
    ALL: '*',
};

const ROUTE = [
    {
        id: 1,
        path: ROUT_PATH.HOME,
        element: <Page.WebsitesPage />,
    },
    {
        id: 2,
        path: ROUT_PATH.LANDINGS,
        element: <Page.LandingsPage />,
    },
    {
        id: 3,
        path: ROUT_PATH.TEMPLATES,
        element: <Page.TemplatesPage />,
    },
    {
        id: 4,
        path: ROUT_PATH.LEGALS,
        element: <Page.LegalsPage />,
    },
    {
        id: 5,
        path: ROUT_PATH.OFFER_OWNER,
        element: <Page.OfferOwnerPage />,
    },
    {
        id: 6,
        path: ROUT_PATH.OFFERS,
        element: <Page.OffersPage />,
    },
    {
        id: 7,
        path: ROUT_PATH.USERS,
        element: <Page.UsersPage />,
    },
    {
        id: 8,
        path: ROUT_PATH.USERS_EDIT_ID,
        element: <Page.UsersEdit />,
    },
    {
        id: 9,
        path: ROUT_PATH.USERS_CREATE,
        element: <Page.UserCreate />,
    },
    {
        id: 10,
        path: ROUT_PATH.MY_PROFILE,
        element: <Page.MyProfilePage />,
    },
    {
        id: 11,
        path: ROUT_PATH.SETTINGS,
        element: <Page.SettingsPage />,
    },
    {
        id: 12,
        path: ROUT_PATH.ALL,
        element: <Page.NotFoundPage />,
    },
];

export const Authorized: FC = () => (
    <Routes>
        {ROUTE.map((el) => (
            <Route key={el.id} {...el} />
        ))}
    </Routes>
);
