import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
// import { UsersFilter } from '../UsersForm/Users.filter/UsersFilter';
import { useAppSelector } from '../../../../store/hooks/useRedux';
import * as Antd from 'antd';
import { SearchUser } from '../UsersForm/Users.search/UsersSearch';
import { UserDelete } from '../UsersForm/User.delete/UserDelete';
import * as Icon from '@ant-design/icons';

// STYLE
import './UsersPage.scss';
import Meta from 'antd/lib/card/Meta';

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
        <Antd.Layout style={{ padding: '0 24px 24px' }}>
            <Antd.Breadcrumb style={{ margin: '16px 0' }}>
                <Antd.Breadcrumb.Item>Users</Antd.Breadcrumb.Item>
            </Antd.Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    margin: 0,
                    minHeight: 280,
                    backgroundColor: '#323541',
                }}>
                <div className="user_page__wrap">
                    {/* <div className="user_page__sidebar">
                        <UsersFilter />
                    </div> */}
                    <div className="user_page__content">
                        <div className="user_page__content-header">
                            <div className="user_page__search">
                                <SearchUser setSearch={setSearch} />
                            </div>
                            <div className="user_page__pagination">
                                <Antd.Button
                                    className="user_page__sidebar_button"
                                    type="primary"
                                    onClick={() => navigate('/users/create')}
                                    icon={<Icon.PlusOutlined />}>
                                    Create user
                                </Antd.Button>
                            </div>
                        </div>
                        <div className="user_page__main">
                            <Antd.List
                                grid={{
                                    gutter: 16,
                                    xs: 1,
                                    sm: 2,
                                    md: 3,
                                    lg: 3,
                                    xl: 4,
                                    xxl: 5,
                                }}
                                pagination={{
                                    defaultPageSize: 12,
                                    hideOnSinglePage: true,
                                    showSizeChanger: false,
                                }}
                                dataSource={isLoading ? fakeDataUsers : search}
                                renderItem={(user) => {
                                    const role = roles.find(
                                        (role) => role._id === user.roleId && role,
                                    );

                                    return (
                                        <Antd.List.Item>
                                            {isLoading ? (
                                                <Antd.Card
                                                    className="user_page__card"
                                                    size="small"
                                                    actions={[
                                                        <Icon.ShareAltOutlined key="social" />,
                                                        <Icon.EditOutlined key="edit" />,
                                                        <Icon.DeleteOutlined key="delete" />,
                                                    ]}>
                                                    <Antd.Skeleton avatar active>
                                                        <Meta
                                                            avatar={
                                                                <Antd.Avatar src="https://joeschmoe.io/api/v1/random" />
                                                            }
                                                            title="Card title"
                                                            description="This is the description"
                                                        />
                                                    </Antd.Skeleton>
                                                </Antd.Card>
                                            ) : (
                                                <Antd.Badge.Ribbon
                                                    text={role?.title}
                                                    style={{ background: role?.color }}>
                                                    <Antd.Card
                                                        className="user_page__card"
                                                        size="small"
                                                        actions={[
                                                            <Antd.Popover
                                                                content={
                                                                    <>
                                                                        <Antd.Button
                                                                            className="user_page__card-social"
                                                                            disabled={
                                                                                !user.social
                                                                                    .facebook
                                                                            }
                                                                            shape="circle"
                                                                            icon={
                                                                                <Icon.FacebookOutlined />
                                                                            }
                                                                        />
                                                                        <Antd.Button
                                                                            className="user_page__card-social"
                                                                            shape="circle"
                                                                            disabled={
                                                                                !user.social.twitter
                                                                            }
                                                                            icon={
                                                                                <Icon.TwitterOutlined />
                                                                            }
                                                                        />
                                                                        <Antd.Button
                                                                            className="user_page__card-social"
                                                                            shape="circle"
                                                                            disabled={
                                                                                !user.social
                                                                                    .linkedin
                                                                            }
                                                                            icon={
                                                                                <Icon.LinkedinOutlined />
                                                                            }
                                                                        />
                                                                        <Antd.Button
                                                                            className="user_page__card-social"
                                                                            shape="circle"
                                                                            disabled={
                                                                                !user.social
                                                                                    .telegram
                                                                            }
                                                                            icon={
                                                                                <Icon.SendOutlined />
                                                                            }
                                                                        />
                                                                    </>
                                                                }>
                                                                <Icon.ShareAltOutlined key="social" />
                                                            </Antd.Popover>,

                                                            <Icon.EditOutlined
                                                                key="edit"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/users/edit/${user._id}`,
                                                                    )
                                                                }
                                                            />,
                                                            <UserDelete userId={user._id} />,
                                                        ]}>
                                                        <Antd.Row>
                                                            <Antd.Col
                                                                span={24}
                                                                className="user_page__avatar-box">
                                                                <Antd.Avatar
                                                                    size={40}
                                                                    icon={<Icon.UserOutlined />}
                                                                />
                                                            </Antd.Col>
                                                            <Antd.Col
                                                                span={24}
                                                                className="user_page__fullname-box">
                                                                {user.firstName} {user.lastName}
                                                            </Antd.Col>
                                                            <Antd.Col
                                                                span={24}
                                                                className="user_page__email-box">
                                                                {user.email}
                                                            </Antd.Col>
                                                        </Antd.Row>
                                                    </Antd.Card>
                                                </Antd.Badge.Ribbon>
                                            )}
                                        </Antd.List.Item>
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
