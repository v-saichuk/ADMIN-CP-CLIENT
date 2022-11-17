import { FC } from 'react';
import { Breadcrumb, Button, Layout, Modal, Tabs, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { TemplatesBasic } from '../Templates.settings/Templates.settings';
import { TemplatesSections } from '../Templates.sections/Templates.sections';

import * as Icon from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

// STYLE
// import './SettingsPage.scss';

export const TemplatesEdit: FC = () => {
    const { TabPane } = Tabs;
    const navigation = useNavigate();
    const { id: TEMPLATE_PAGE_ID } = useParams();

    const TABCONTENT = [
        {
            key: '1',
            icon: <Icon.DatabaseOutlined />,
            buttonText: 'Sections',
            content: <TemplatesSections />,
        },
        {
            key: '2',
            icon: <Icon.SettingOutlined />,
            buttonText: 'Settings',
            content: <TemplatesBasic />,
        },
    ];

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Breadcrumb className="Breadcrumb-custome">
                    <Breadcrumb.Item>
                        <Button
                            icon={<Icon.LeftOutlined />}
                            type={'primary'}
                            style={{ marginRight: 10 }}
                            onClick={() => navigation('/templates')}
                        />
                        Templates
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Edit</Breadcrumb.Item>
                    <Breadcrumb.Item>ID:{TEMPLATE_PAGE_ID}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Content className="site-layout-background" style={{ border: 'none' }}>
                <Tabs tabPosition="left" type="card" tabBarStyle={{ width: '200px' }}>
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
    );
};
