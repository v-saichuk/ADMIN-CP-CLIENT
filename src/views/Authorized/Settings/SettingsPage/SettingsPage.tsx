import { FC } from 'react';
import { Breadcrumb, Layout, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { LanguageSettings, RoleSettings } from '../SettingsForm';
import { GlobalOutlined, TeamOutlined } from '@ant-design/icons';

// STYLE
import './SettingsPage.scss';

export const SettingsPage: FC = () => {
    const { TabPane } = Tabs;

    const TABCONTENT = [
        {
            key: '1',
            icon: <TeamOutlined />,
            buttonText: 'Roles',
            content: <RoleSettings />,
        },
        {
            key: '2',
            icon: <GlobalOutlined />,
            buttonText: 'Languages',
            content: <LanguageSettings />,
        },
    ];

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Settings</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="site-layout-background">
                <Tabs tabPosition="left" type="card" tabBarStyle={{ width: '200px' }}>
                    {TABCONTENT.map((el) => (
                        <TabPane
                            key={el.key}
                            tab={
                                <span>
                                    {el.icon}
                                    {el.buttonText}
                                </span>
                            }>
                            {el.content}
                        </TabPane>
                    ))}
                </Tabs>
            </Content>
        </Layout>
    );
};
