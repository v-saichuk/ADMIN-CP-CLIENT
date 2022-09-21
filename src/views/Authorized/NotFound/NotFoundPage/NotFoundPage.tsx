import { FC } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { IconPage404 } from '../../../../assets/images/svg/svg';

// STYLE
import './NotFoundPage.scss';

export const NotFoundPage: FC = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}>
                <div className="not-found-authorization">
                    <div className="not-found-authorization__icon">
                        <IconPage404 />
                    </div>
                    <p className="not-found-authorization__description">
                        We can't find the page that you are looking for.
                    </p>
                </div>
            </Content>
        </Layout>
    );
};
