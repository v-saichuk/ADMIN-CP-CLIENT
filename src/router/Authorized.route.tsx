import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Page from '../views/Authorized';

const ROUTE = [
    {
        id: 1,
        path: '/',
        element: <Page.HomePage />,
    },
    {
        id: 2,
        path: '/projects',
        element: <Page.ProjectsPage />,
    },
    {
        id: 3,
        path: '/users',
        element: <Page.UsersPage />,
    },
    {
        id: 4,
        path: '/users/edit/:userId',
        element: <Page.UsersEdit />,
    },
    {
        id: 5,
        path: '/users/create',
        element: <Page.UserCreate />,
    },
    {
        id: 6,
        path: '/my-profile',
        element: <Page.MyProfilePage />,
    },
    {
        id: 7,
        path: '/settings',
        element: <Page.SettingsPage />,
    },
    {
        id: 8,
        path: '*',
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
