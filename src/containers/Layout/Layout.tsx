import { FC } from 'react';
import { Layout as Container } from 'antd';
import { Header, Sider, Main } from '../index';

import './Layout.scss';

export const Layout: FC = () => {
    return (
        <Container style={{ height: '100vh' }}>
            <Header />
            <Container>
                <Sider />
                <Main />
            </Container>
        </Container>
    );
};
