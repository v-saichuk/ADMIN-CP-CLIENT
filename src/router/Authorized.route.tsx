import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Page from '../views/Authorized';

export const ROUT_PATH = {
    WEBSITES: '/',
    WEBSITES_CREATE: '/websites/create',
    WEBSITES_EDIT: '/websites/edit/:id',

    LANDINGS: '/landings',
    LANDING_CREATE: '/landing/create',
    LANDING_CONTENT: '/landing/:id',
    LANDING_FIELDS: '/landing/:id/:id',

    TEMPLATES: '/templates',
    TEMPLATES_CREATE: '/template/create',
    TEMPLATES_SECTION: '/template/:id',
    TEMPLATES_FIELDS: '/template/:id/:id',

    LEGALS: '/legals',
    LEGALS_CREATE: '/legals/create',
    LEGALS_EDIT: '/legals/edit/:legalId',

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
        path: ROUT_PATH.WEBSITES,
        element: <Page.WebsitesPage />,
    },
    {
        path: ROUT_PATH.WEBSITES_CREATE,
        element: <Page.WebsitesCreate />,
    },
    {
        path: ROUT_PATH.WEBSITES_EDIT,
        element: <Page.WebsitesEdit />,
    },
    {
        path: ROUT_PATH.LANDINGS,
        element: <Page.LandingsPage />,
    },
    {
        path: ROUT_PATH.LANDING_CREATE,
        element: <Page.LandingCreate />,
    },
    {
        path: ROUT_PATH.LANDING_CONTENT,
        element: <Page.LandingContent />,
    },
    {
        path: ROUT_PATH.LANDING_FIELDS,
        element: <Page.LandingFieldsContent />,
    },
    {
        path: ROUT_PATH.TEMPLATES,
        element: <Page.TemplatesPage />,
    },
    {
        path: ROUT_PATH.TEMPLATES_CREATE,
        element: <Page.TemplatesCreate />,
    },
    {
        path: ROUT_PATH.TEMPLATES_SECTION,
        element: <Page.TemplatesContent />,
    },
    {
        path: ROUT_PATH.TEMPLATES_FIELDS,
        element: <Page.FieldsContent />,
    },
    {
        path: ROUT_PATH.LEGALS,
        element: <Page.LegalsPage />,
    },
    {
        path: ROUT_PATH.LEGALS_CREATE,
        element: <Page.LegalsCreate />,
    },
    {
        path: ROUT_PATH.LEGALS_EDIT,
        element: <Page.LegalsEdit />,
    },
    {
        path: ROUT_PATH.OFFER_OWNER,
        element: <Page.OfferOwnerPage />,
    },
    {
        path: ROUT_PATH.OFFERS,
        element: <Page.OffersPage />,
    },
    {
        path: ROUT_PATH.USERS,
        element: <Page.UsersPage />,
    },
    {
        path: ROUT_PATH.USERS_EDIT_ID,
        element: <Page.UsersEdit />,
    },
    {
        path: ROUT_PATH.USERS_CREATE,
        element: <Page.UserCreate />,
    },
    {
        path: ROUT_PATH.MY_PROFILE,
        element: <Page.MyProfilePage />,
    },
    {
        path: ROUT_PATH.SETTINGS,
        element: <Page.SettingsPage />,
    },
    {
        path: ROUT_PATH.ALL,
        element: <Page.NotFoundPage />,
    },
];

export const Authorized: FC = () => (
    <Routes>
        {ROUTE.map((path, index) => (
            <Route key={index} {...path} />
        ))}
    </Routes>
);
