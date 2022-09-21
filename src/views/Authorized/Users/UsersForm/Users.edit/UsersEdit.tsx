import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Layout, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ApartmentOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { UsersChangePassword } from './UsersChangePassword/UsersChangePassword';
import { UsersPersonalInformation } from './UsersPersonalInformation/UsersPersonalInformation';
import { UsersSocial } from './UsersSocial/UsersSocials';
import { useAppSelector } from '../../../../../store/hooks/useRedux';
import { NotFoundPage } from '../../../NotFound/NotFoundPage/NotFoundPage';

// STYLE
import './UsersEdit.scss';

export const UsersEdit: FC = () => {
    const { TabPane } = Tabs;
    const { userId } = useParams();

    const { users } = useAppSelector((state) => state.users);
    const user = users.filter((el) => userId && el.id === userId)[0];

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
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Users</Breadcrumb.Item>
                        <Breadcrumb.Item>Edit</Breadcrumb.Item>
                        <Breadcrumb.Item>ID: {userId}</Breadcrumb.Item>
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
            ) : (
                <NotFoundPage />
            )}
        </>
    );
};
