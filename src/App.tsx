import { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks/useRedux';
import { fetchLogin } from './store/auth/auth.slice';
import { NoAuthorized } from './router/NoAuthorized.route';
import { Layout } from './containers/Layout/Layout';
import { getWebsites } from './store/websites/websites.slice';
import { getTemplates } from './store/templates/templates.slice';
import { getLegals } from './store/legals/legalas.slice';
import { getOfferOwner } from './store/offerOwner/offerOwner.slice';
import { getOffers } from './store/offers/offers.slice';
import { getRoles } from './store/settings/usersRole.slice';
import { getCountry } from './store/settings/language.slice';
import { getUsers } from './store/users/users.slice';
import { Preloader } from './components/Preloader/Preloader';

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { isAuth, isLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchLogin());

        if (isAuth) {
            dispatch(getWebsites());
            dispatch(getTemplates());
            dispatch(getLegals());
            dispatch(getWebsites());
            dispatch(getOfferOwner());
            dispatch(getOffers());
            dispatch(getRoles());
            dispatch(getCountry());
            dispatch(getUsers());
        }
    }, [dispatch, isAuth]);

    return (
        <BrowserRouter>
            {isAuth ? isLoading ? <Preloader /> : <Layout /> : <NoAuthorized />}
        </BrowserRouter>
    );
};
