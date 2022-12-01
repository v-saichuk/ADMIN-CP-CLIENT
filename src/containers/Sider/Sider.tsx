import { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import { ROUT_PATH } from '../../router/Authorized.route';
import * as Icon from '@ant-design/icons';

import './Sider.scss';

export const Sider: FC = () => {
    const { Sider } = Layout;
    const navigation = useNavigate();
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const MENU_ITEMS: MenuProps['items'] = [
        {
            key: ROUT_PATH.WEBSITES,
            icon: <Icon.DesktopOutlined />,
            label: 'Websites',
            onClick: () => navigation(ROUT_PATH.WEBSITES),
        },
        {
            key: ROUT_PATH.LANDINGS,
            icon: <Icon.LayoutOutlined />,
            label: 'Landings page',
            onClick: () => navigation(ROUT_PATH.LANDINGS),
        },
        {
            key: ROUT_PATH.TEMPLATES,
            icon: <Icon.RobotOutlined />,
            label: 'Templates',
            onClick: () => navigation(ROUT_PATH.TEMPLATES),
        },
        {
            key: ROUT_PATH.LEGALS,
            icon: <Icon.FileProtectOutlined />,
            label: 'Legals page',
            onClick: () => navigation(ROUT_PATH.LEGALS),
        },
        {
            key: ROUT_PATH.OFFER_OWNER,
            icon: <Icon.SafetyCertificateOutlined />,
            label: 'Offer owner',
            onClick: () => navigation(ROUT_PATH.OFFER_OWNER),
        },
        {
            key: ROUT_PATH.OFFERS,
            icon: <Icon.ClusterOutlined />,
            label: 'Offers',
            onClick: () => navigation(ROUT_PATH.OFFERS),
        },
        {
            key: ROUT_PATH.USERS,
            icon: <Icon.TeamOutlined />,
            label: 'Users',
            onClick: () => navigation(ROUT_PATH.USERS),
        },
        {
            type: 'divider',
        },
        {
            key: ROUT_PATH.SETTINGS,
            icon: <Icon.SettingOutlined />,
            label: 'Settings',
            onClick: () => navigation(ROUT_PATH.SETTINGS),
        },
    ];

    console.log('pathname', pathname.split('/'));

    const ActivePage = MENU_ITEMS.find(
        (item) => pathname.split('/')[1] === item?.key?.toString().split('/')[1] && item,
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
                selectedKeys={[String(ActivePage?.key)]}
                style={{ height: '100%', borderRight: 0 }}
                items={MENU_ITEMS}
            />
        </Sider>
    );
};
