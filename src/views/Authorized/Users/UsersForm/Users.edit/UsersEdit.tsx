import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ApartmentOutlined, LeftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { UsersChangePassword } from './UsersChangePassword/UsersChangePassword';
import { UsersPersonalInformation } from './UsersPersonalInformation/UsersPersonalInformation';
import { UsersSocial } from './UsersSocial/UsersSocials';
import { useAppSelector } from '../../../../../store/hooks/useRedux';
import { NotFoundPage } from '../../../NotFound/NotFoundPage/NotFoundPage';

// STYLE
import './UsersEdit.scss';

export const UsersEdit: FC = () => {
    const { userId } = useParams();
    const navigation = useNavigate();

    const { users } = useAppSelector((state) => state.users);
    const user = users.filter((el) => userId && el._id === userId)[0];

    const TABCONTENT = [
        {
            key: '1',
            icon: <UserOutlined />,
            buttonText: 'Personal Info',
            content: <UsersPersonalInformation />,
        },
        {
            key: '2',
            icon: <LockOutlined />,
            buttonText: 'Change Password',
            content: <UsersChangePassword />,
        },
        {
            key: '3',
            icon: <ApartmentOutlined />,
            buttonText: 'Social',
            content: <UsersSocial />,
        },
    ];

    return (
        <>
            {user ? (
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb className="Breadcrumb-custome">
                        <Breadcrumb.Item>
                            <Button
                                icon={<LeftOutlined />}
                                type={'primary'}
                                style={{ marginRight: 10 }}
                                onClick={() => navigation('/users')}
                            />
                            Users
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Edit</Breadcrumb.Item>
                        <Breadcrumb.Item>ID: {userId}</Breadcrumb.Item>
                    </Breadcrumb>
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
            ) : (
                <NotFoundPage />
            )}
        </>
    );
};
