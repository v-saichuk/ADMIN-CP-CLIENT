import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage, NotFoundPage, ResetPasswordPage, ServicePage } from '../views/NotAuthorized';

const ROUTE = [
    {
        id: 1,
        path: '/',
        element: <LoginPage />,
    },
    {
        id: 2,
        path: '/reset-password',
        element: <ResetPasswordPage />,
    },
    {
        id: 3,
        path: '/maintenance',
        element: <ServicePage />,
    },
    {
        id: 4,
        path: '*',
        element: <NotFoundPage />,
    },
];

export const NoAuthorized: FC = () => (
    <Routes>
        {ROUTE.map((el) => (
            <Route key={el.id} {...el} />
        ))}
    </Routes>
);
