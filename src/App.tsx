import { FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks/useRedux';
import { fetchLogin } from './store/auth/auth.slice';
import { Layout } from './containers/Layout/Layout';
import { getRoles } from './store/settings/usersRole.slice';
import { getCountry } from './store/settings/language.slice';
import { NoAuthorized } from './router/NoAuthorized.route';
import { getUsers } from './store/users/users.slice';

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchLogin());

        if (isAuth) {
            dispatch(getRoles());
            dispatch(getCountry());
            dispatch(getUsers());
        }
    }, [dispatch, isAuth]);

    return <BrowserRouter>{isAuth ? <Layout /> : <NoAuthorized />}</BrowserRouter>;
};

// TODO: Видилати модуль створення унікальних ідентифікаторів
// TODO: При пошуку користувача а потім його видалення, стаеця помилка розібратися з нейю
// TODO: Зробити завантаження і збреження зображення користувача
