import { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';

import './Sider.scss';

export const Sider: FC = () => {
    const { Sider } = Layout;
    const navigation = useNavigate();
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const MENU_ITEMS: MenuProps['items'] = [
        {
            key: 1,
            icon: <HomeOutlined />,
            label: 'Home',
            onClick: () => navigation('/'),
        },
        {
            key: 2,
            icon: <AppstoreOutlined />,
            label: 'Projects',
            onClick: () => navigation('/projects'),
        },
        {
            key: 3,
            icon: <TeamOutlined />,
            label: 'Users',
            onClick: () => navigation('/users'),
        },
        {
            type: 'divider',
        },
        {
            key: 4,
            icon: <SettingOutlined />,
            label: 'Settings',
            onClick: () => navigation('/settings'),
        },
    ];

    const ActivePage = MENU_ITEMS.filter((el) =>
        // @ts-ignore
        pathname.slice(1) === '' ? ['1'] : el.label?.toLowerCase() === pathname.split('/')[1] && el,
    );
    return (
        <Sider
            width={220}
            theme="dark"
            breakpoint={'lg'}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="site-layout-background">
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[String(ActivePage[0]?.key)]}
                style={{ height: '100%', borderRight: 0 }}
                items={MENU_ITEMS}
            />
        </Sider>
    );
};
