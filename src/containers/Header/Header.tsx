import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Layout, Modal, Dropdown, Menu, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks/useRedux';
import { Logo } from '../../components/Logo/Logo';
import { logout } from '../../store/auth/auth.slice';
import { ExclamationCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import './Header.scss';

export const Header: FC = () => {
    const { confirm } = Modal;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const myProfileId = useAppSelector((state) => state.auth.data?._id);
    const users = useAppSelector((state) => state.users.users);
    const myProfile = users.find((user) => user._id === myProfileId);

    const menu = (
        <Menu
            theme="dark"
            items={[
                {
                    icon: <UserOutlined />,
                    label: <Link to="/my-profile">My Profile</Link>,
                    key: '0',
                },
                {
                    type: 'divider',
                },
                {
                    icon: <LogoutOutlined />,
                    label: 'Logout',
                    onClick: () => showDeleteConfirm(),
                    key: '1',
                },
            ]}
        />
    );

    const showDeleteConfirm = () => {
        confirm({
            title: 'Do you really want to go out?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(logout());
                navigate('/');
                window.localStorage.removeItem('token');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <Layout.Header className="header">
            <Logo iconClass={['logo__authorized-icon']} textClass={['logo__authorized-text']} />
            <div className="header__wrapper">
                <div className="header__search">
                    {/* search */}
                    {/* <Input.Group compact size="small">
                        <Input.Search allowClear />
                    </Input.Group> */}
                </div>
                <div className="header__user">
                    <Dropdown overlay={menu}>
                        <Space>
                            <span className="header__fullname">
                                {myProfile?.firstName} {myProfile?.lastName}
                            </span>
                            <Avatar size={{ xs: 24, sm: 28 }} icon={<UserOutlined />} />
                        </Space>
                    </Dropdown>
                </div>
            </div>
        </Layout.Header>
    );
};
