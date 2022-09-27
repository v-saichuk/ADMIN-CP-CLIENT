import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';
import { Content } from 'antd/lib/layout/layout';
// import { UsersFilter } from '../UsersForm/Users.filter/UsersFilter';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { deleteUser } from '../../../../store/users/users.slice';
import { Avatar, Badge, Breadcrumb, Button, Card, Col, Layout, List, Popover, Row } from 'antd';
import { SearchUser } from '../UsersForm/SearchUser/SearchUser';
import {
    DeleteOutlined,
    EditOutlined,
    ShareAltOutlined,
    UserOutlined,
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    SendOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons';

// STYLE
import './UsersPage.scss';

export const UsersPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { users } = useAppSelector((state) => state.users);
    const { roles } = useAppSelector((state) => state.usersRole);
    const [search, setSearch] = useState(users);

    useEffect(() => {
        setSearch(users);
    }, [users]);

    const showDeleteRoleConfirm = (id: string) => {
        confirm({
            title: 'Do you really want to user delete?',
            content: 'Once deleted, you can no longer restore it.',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(deleteUser(id));
            },
        });
    };

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
                                <SearchUser setSearch={setSearch} search={search} />
                            </div>
                            <div className="user_page__pagination">
                                <Button
                                    className="user_page__sidebar_button"
                                    type="primary"
                                    onClick={() => navigate('/users/create')}
                                    icon={<PlusOutlined />}>
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
                                renderItem={(item) => {
                                    const role = roles.find((el) => el._id === item.roleId && el);

                                    return (
                                        <List.Item>
                                            <Badge.Ribbon
                                                text={role?.title}
                                                style={{ background: role?.color }}>
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
                                                                            !item.social.facebook
                                                                        }
                                                                        shape="circle"
                                                                        icon={<FacebookOutlined />}
                                                                    />
                                                                    <Button
                                                                        className="user_page__card-social"
                                                                        shape="circle"
                                                                        disabled={
                                                                            !item.social.twitter
                                                                        }
                                                                        icon={<TwitterOutlined />}
                                                                    />
                                                                    <Button
                                                                        className="user_page__card-social"
                                                                        shape="circle"
                                                                        disabled={
                                                                            !item.social.linkedin
                                                                        }
                                                                        icon={<LinkedinOutlined />}
                                                                    />
                                                                    <Button
                                                                        className="user_page__card-social"
                                                                        shape="circle"
                                                                        disabled={
                                                                            !item.social.telegram
                                                                        }
                                                                        icon={<SendOutlined />}
                                                                    />
                                                                </>
                                                            }>
                                                            <ShareAltOutlined key="social" />
                                                        </Popover>,

                                                        <EditOutlined
                                                            key="edit"
                                                            onClick={() =>
                                                                navigate(`/users/edit/${item.id}`)
                                                            }
                                                        />,
                                                        <DeleteOutlined
                                                            key="delete"
                                                            onClick={() =>
                                                                showDeleteRoleConfirm(item.id)
                                                            }
                                                        />,
                                                    ]}>
                                                    <Row>
                                                        <Col
                                                            span={24}
                                                            className="user_page__avatar-box">
                                                            <Avatar
                                                                size={40}
                                                                icon={<UserOutlined />}
                                                            />
                                                        </Col>
                                                        <Col
                                                            span={24}
                                                            className="user_page__fullname-box">
                                                            {item.firstname}
                                                        </Col>
                                                        <Col
                                                            span={24}
                                                            className="user_page__email-box">
                                                            {item.email}
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
