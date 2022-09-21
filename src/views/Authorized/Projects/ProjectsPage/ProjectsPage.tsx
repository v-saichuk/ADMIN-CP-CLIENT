import { Breadcrumb, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { FC } from 'react';
// STYLE
import './ProjectsPage.scss';

export const ProjectsPage: FC = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    color: 'green',
                }}>
                Content
            </Content>
        </Layout>
    );
};
