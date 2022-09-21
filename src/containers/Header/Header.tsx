import { FC } from 'react';
import { Avatar, Layout, Modal } from 'antd';
import { ExclamationCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { Logo } from '../../components/Logo/Logo';

import { Dropdown, Menu, Space } from 'antd';

import './Header.scss';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
    const { Header } = Layout;
    const { confirm } = Modal;

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
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <Header className="header">
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
                            <span className="header__fullname">John Dou</span>
                            <Avatar size={{ xs: 24, sm: 28 }} icon={<UserOutlined />} />
                        </Space>
                    </Dropdown>
                </div>
            </div>
        </Header>
    );
};
