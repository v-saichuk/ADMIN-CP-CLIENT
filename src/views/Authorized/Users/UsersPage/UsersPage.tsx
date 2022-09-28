import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
// import { UsersFilter } from '../UsersForm/Users.filter/UsersFilter';
import { useAppSelector } from '../../../../store/hooks/useRedux';
import {
    Avatar,
    Badge,
    Breadcrumb,
    Button,
    Card,
    Col,
    Layout,
    List,
    Popover,
    Row,
    Skeleton,
} from 'antd';
import { SearchUser } from '../UsersForm/Users.search/UsersSearch';
import { UserDelete } from '../UsersForm/User.delete/UserDelete';
import * as Icon from '@ant-design/icons';

// STYLE
import './UsersPage.scss';

export const UsersPage: FC = () => {
    const navigate = useNavigate();
    const { users } = useAppSelector((state) => state.users);
    const { roles } = useAppSelector((state) => state.usersRole);
    const [search, setSearch] = useState(users);

    useEffect(() => {
        setSearch(users);
    }, [users]);

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Users</Breadcrumb.Item>
            </Breadcrumb>
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
                                <Button
                                    className="user_page__sidebar_button"
                                    type="primary"
                                    onClick={() => navigate('/users/create')}
                                    icon={<Icon.PlusOutlined />}>
                                    Create user
                                </Button>
                            </div>
                        </div>
                        <div className="user_page__main">
                            <List
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
                                dataSource={search}
                                renderItem={(user) => {
                                    const role = roles.find(
                                        (role) => role._id === user.roleId && role,
                                    );

                                    return (
                                        <List.Item>
                                            <Badge.Ribbon
                                                text={role?.title}
                                                style={{ background: role?.color }}>
                                                <Skeleton></Skeleton>
                                                <Card
                                                    className="user_page__card"
                                                    size="small"
                                                    actions={[
                                                        <Popover
                                                            content={
                                                                <>
                                                                    <Button
                                                                        className="user_page__card-social"
                                                                        disabled={
                                                                            !user.social.facebook
                                                                        }
                                                                        shape="circle"
                                                                        icon={
                                                                            <Icon.FacebookOutlined />
                                                                        }
                                                                    />
                                                                    <Button
                                                                        className="user_page__card-social"
                                                                        shape="circle"
                                                                        disabled={
                                                                            !user.social.twitter
                                                                        }
                                                                        icon={
                                                                            <Icon.TwitterOutlined />
                                                                        }
                                                                    />
                                                                    <Button
                                                                        className="user_page__card-social"
                                                                        shape="circle"
                                                                        disabled={
                                                                            !user.social.linkedin
                                                                        }
                                                                        icon={
                                                                            <Icon.LinkedinOutlined />
                                                                        }
                                                                    />
                                                                    <Button
                                                                        className="user_page__card-social"
                                                                        shape="circle"
                                                                        disabled={
                                                                            !user.social.telegram
                                                                        }
                                                                        icon={<Icon.SendOutlined />}
                                                                    />
                                                                </>
                                                            }>
                                                            <Icon.ShareAltOutlined key="social" />
                                                        </Popover>,

                                                        <Icon.EditOutlined
                                                            key="edit"
                                                            onClick={() =>
                                                                navigate(`/users/edit/${user._id}`)
                                                            }
                                                        />,
                                                        <UserDelete userId={user._id} />,
                                                    ]}>
                                                    <Row>
                                                        <Col
                                                            span={24}
                                                            className="user_page__avatar-box">
                                                            <Avatar
                                                                size={40}
                                                                icon={<Icon.UserOutlined />}
                                                            />
                                                        </Col>
                                                        <Col
                                                            span={24}
                                                            className="user_page__fullname-box">
                                                            {user.firstName} {user.lastName}
                                                        </Col>
                                                        <Col
                                                            span={24}
                                                            className="user_page__email-box">
                                                            {user.email}
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Badge.Ribbon>
                                        </List.Item>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};
