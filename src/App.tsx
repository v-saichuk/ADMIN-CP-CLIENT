import { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks/useRedux';
import { fetchLogin } from './store/auth/auth.slice';

import { NoAuthorized } from './router/NoAuthorized.route';
import { Layout } from './containers/Layout/Layout';

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchLogin());
    }, [dispatch]);

    return <BrowserRouter>{isAuth ? <Layout /> : <NoAuthorized />}</BrowserRouter>;
};
