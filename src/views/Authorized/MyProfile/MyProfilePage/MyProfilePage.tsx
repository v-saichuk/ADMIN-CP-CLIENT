import { FC } from 'react';
import { Layout, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ApartmentOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { ChangePasswordForm } from '../MyProfileForm/ChangePasswordForm/ChangePasswordForm';
import { PersonalInfoForm } from '../MyProfileForm/PersonalInfoForm/PersonalInfoForm';
import { SocialForm } from '../MyProfileForm/SocialForm/SocialForm';

export const MyProfilePage: FC = () => {
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
        <Layout className="content-layout">
            <div className="content-header">
                <span>My profile</span>
            </div>
            <Content className="site-layout-background" style={{ border: 'none' }}>
                <Tabs tabPosition="left" type="card">
                    {TABCONTENT.map((el) => (
                        <Tabs.TabPane
                            key={el.key}
                            tab={
                                <span>
                                    {el.icon}
                                    {el.buttonText}
                                </span>
                            }>
                            {el.content}
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </Content>
        </Layout>
    );
};
