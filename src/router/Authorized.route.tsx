import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
    HomePage,
    ProjectsPage,
    UsersPage,
    NotFoundPage,
    MyProfilePage,
    SettingsPage,
    UsersEdit,
    UsersCreate,
} from '../views/Authorized';

const ROUTE = [
    {
        id: 1,
        path: '/',
        element: <HomePage />,
    },
    {
        id: 2,
        path: '/projects',
        element: <ProjectsPage />,
    },
    {
        id: 3,
        path: '/users',
        element: <UsersPage />,
    },
    {
        id: 4,
        path: '/users/edit/:userId',
        element: <UsersEdit />,
    },
    {
        id: 5,
        path: '/users/create',
        element: <UsersCreate />,
    },
    {
        id: 6,
        path: '/my-profile',
        element: <MyProfilePage />,
    },
    {
        id: 7,
        path: '/settings',
        element: <SettingsPage />,
    },
    {
        id: 8,
        path: '*',
        element: <NotFoundPage />,
    },
];

export const Authorized: FC = () => (
    <Routes>
        {ROUTE.map((el) => (
            <Route key={el.id} {...el} />
        ))}
    </Routes>
);
