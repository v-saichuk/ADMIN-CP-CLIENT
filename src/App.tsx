import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppSelector } from './store/hooks/useRedux';

import { NoAuthorized } from './router/NoAuthorized.route';
import { Layout } from './containers/Layout/Layout';

export const App: FC = () => {
    const { isActive } = useAppSelector((state) => state.authSlice);

    return <BrowserRouter>{!isActive ? <Layout /> : <NoAuthorized />}</BrowserRouter>;
};
