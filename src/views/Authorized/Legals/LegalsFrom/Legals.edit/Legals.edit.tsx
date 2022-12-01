import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Modal, Tabs, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { LegalsBasic } from './Legals.basic/Legals.settings';
import { LegalsContent } from './Legals.content/Legals.content';

import * as Icon from '@ant-design/icons';

export const LegalsEdit: FC = () => {
    const { TabPane } = Tabs;
    const navigation = useNavigate();
    const { legalId: LEGAL_PAGE_ID } = useParams();

    const TABCONTENT = [
        {
            key: '1',
            icon: <Icon.PicLeftOutlined />,
            buttonText: 'Content',
            content: <LegalsContent />,
        },
        {
            key: '2',
            icon: <Icon.SettingOutlined />,
            buttonText: 'Settings',
            content: <LegalsBasic />,
        },
    ];

    const info = () => {
        Modal.info({
            title: 'API',
            content: (
                <div>
                    <Typography.Paragraph ellipsis copyable={{ tooltips: false }}>
                        {`http://localhost:4000/api/legal/content/${LEGAL_PAGE_ID}`}
                    </Typography.Paragraph>
                </div>
            ),
            onOk() {},
        });
    };

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Breadcrumb className="Breadcrumb-custome">
                    <Breadcrumb.Item>
                        <Button
                            icon={<Icon.LeftOutlined />}
                            type={'primary'}
                            style={{ marginRight: 10 }}
                            onClick={() => navigation('/legals')}
                        />
                        Legals
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Edit</Breadcrumb.Item>
                    <Breadcrumb.Item>ID:{LEGAL_PAGE_ID}</Breadcrumb.Item>
                </Breadcrumb>
                <Button type="primary" onClick={info} icon={<Icon.DeploymentUnitOutlined />}>
                    API
                </Button>
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
