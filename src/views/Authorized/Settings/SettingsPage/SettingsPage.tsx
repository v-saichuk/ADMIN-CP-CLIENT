import { FC } from 'react';
import { Layout, Tabs } from 'antd';
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
        <Layout className="content-layout">
            <div className="content-header">
                <span>Settings</span>
            </div>
            <Content className="site-layout-background" style={{ border: 'none' }}>
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
