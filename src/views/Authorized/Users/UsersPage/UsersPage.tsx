import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks/useRedux';
import * as Antd from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { SearchUser } from '../UsersForm/Users.search/UsersSearch';
import { UserDelete } from '../UsersForm/User.delete/UserDelete';
import { UsersFilter } from '../UsersForm/Users.filter/UsersFilter';
import * as Icon from '@ant-design/icons';

// STYLE
import './UsersPage.scss';

export const UsersPage: FC = () => {
    const navigate = useNavigate();
    const { users, isLoading } = useAppSelector((state) => state.users);
    const { roles } = useAppSelector((state) => state.usersRole);
    const [search, setSearch] = useState(users);

    useEffect(() => {
        setSearch(users);
    }, [users]);

    const fakeDataUsers = Array.from({ length: 5 }).map((_, i) => ({
        _id: String(i),
        avatar: '',
        firstName: '',
        lastName: '',
        email: '',
        roleId: '',
        social: {
            facebook: '',
            twitter: '',
            telegram: '',
            linkedin: '',
        },
    }));

    return (
        <Antd.Layout className="content-layout">
            <div className="content-header">
                <span>Users</span>
            </div>
            <Content
                className="site-layout-background"
                style={{
                    margin: 0,
                    minHeight: 280,
                    border: 'none',
                }}>
                <div className="user_page__wrap">
                    <div className="user_page__sidebar">
                        <div className="user_page__pagination">
                            <Antd.Button
                                className="user_page__sidebar_button"
                                type="primary"
                                onClick={() => navigate('/users/create')}
                                icon={<Icon.PlusOutlined />}>
                                Create user
                            </Antd.Button>
                        </div>
                        <div className="user_page__search">
                            <SearchUser setSearch={setSearch} />
                        </div>
                        <UsersFilter setSearch={setSearch} />
                    </div>
                    <div className="main_content">
                        <div className="user_page__main">
                            <Antd.List
                                pagination={{
                                    defaultPageSize: 8,
                                    hideOnSinglePage: true,
                                    showSizeChanger: false,
                                }}
                                dataSource={isLoading ? fakeDataUsers : search}
                                renderItem={(user) => {
                                    const fullName = user.firstName + ' ' + user.lastName;
                                    const role = roles.find(
                                        (role) => role._id === user.roleId && role,
                                    );

                                    return (
                                        <Antd.Row
                                            style={{
                                                padding: '10px',
                                                width: '100%',
                                                backgroundColor: '#383B46',
                                                marginBottom: '5px',
                                                alignItems: 'center',
                                            }}>
                                            <Antd.Col span={5}>
                                                <Antd.List.Item.Meta
                                                    avatar={
                                                        <Antd.Avatar
                                                            size={40}
                                                            icon={<Icon.UserOutlined />}
                                                        />
                                                    }
                                                    title={fullName}
                                                    description={user.email}
                                                />
                                            </Antd.Col>
                                            <Antd.Col span={4}>
                                                <Antd.Tag color={role?.color}>
                                                    {role?.title}
                                                </Antd.Tag>
                                            </Antd.Col>
                                            <Antd.Col span={12}>
                                                <span style={{ marginRight: '20px' }}>
                                                    <Antd.Button
                                                        className="user_page__card-social"
                                                        disabled={!user.social.facebook}
                                                        shape="circle"
                                                        icon={<Icon.FacebookOutlined />}
                                                    />
                                                    <Antd.Button
                                                        className="user_page__card-social"
                                                        shape="circle"
                                                        disabled={!user.social.twitter}
                                                        icon={<Icon.TwitterOutlined />}
                                                    />
                                                    <Antd.Button
                                                        className="user_page__card-social"
                                                        shape="circle"
                                                        disabled={!user.social.linkedin}
                                                        icon={<Icon.LinkedinOutlined />}
                                                    />
                                                    <Antd.Button
                                                        className="user_page__card-social"
                                                        shape="circle"
                                                        disabled={!user.social.telegram}
                                                        icon={<Icon.SendOutlined />}
                                                    />
                                                </span>
                                            </Antd.Col>
                                            <Antd.Col
                                                span={3}
                                                style={{ display: 'flex', justifyContent: 'end' }}>
                                                <Antd.Space size="small">
                                                    <Antd.Button
                                                        onClick={() =>
                                                            navigate(`/users/edit/${user._id}`)
                                                        }>
                                                        <Icon.EditOutlined key="edit" />
                                                    </Antd.Button>
                                                    <UserDelete userId={user._id} />
                                                </Antd.Space>
                                            </Antd.Col>
                                        </Antd.Row>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </Antd.Layout>
    );
};
