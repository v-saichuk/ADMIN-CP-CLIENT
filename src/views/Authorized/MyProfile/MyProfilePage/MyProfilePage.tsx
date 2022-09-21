import { FC } from 'react';
import { Breadcrumb, Layout, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ChangePasswordForm, PersonalInfoForm, SocialForm } from '../MyProfileForm';
import { ApartmentOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

// STYLE
import './MyProfilePage.scss';

export const MyProfilePage: FC = () => {
    const { TabPane } = Tabs;

    const TABCONTENT = [
        {
            key: '1',
            icon: <UserOutlined />,
            buttonText: 'Personal Info',
            content: <PersonalInfoForm />,
        },
        {
            key: '2',
            icon: <LockOutlined />,
            buttonText: 'Change Password',
            content: <ChangePasswordForm />,
        },
        {
            key: '3',
            icon: <ApartmentOutlined />,
            buttonText: 'Social',
            content: <SocialForm />,
        },
    ];

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>My Profile</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="site-layout-background">
                <Tabs tabPosition="left" type="card">
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
