import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { TemplatesSettings } from './Templates.settings';
import { TemplatesSections } from './Templates.sections/Templates.sections';
import { useAppSelector } from '../../../../store/hooks/useRedux';

import { DatabaseOutlined, LeftOutlined, SettingOutlined } from '@ant-design/icons';

export const TemplatesContent: FC = () => {
    const navigation = useNavigate();
    const { id: TEMPLATE_PAGE_ID } = useParams();
    const template = useAppSelector((state) =>
        state.templates.TemplatesData.find((el) => el._id === TEMPLATE_PAGE_ID),
    );

    const TABCONTENT = [
        {
            key: '1',
            icon: <DatabaseOutlined />,
            buttonText: 'Sections',
            content: <TemplatesSections />,
        },
        {
            key: '2',
            icon: <SettingOutlined />,
            buttonText: 'Settings',
            content: <TemplatesSettings />,
        },
    ];

    return (
        <Layout className="content-layout-padding">
            <Breadcrumb className="Breadcrumb-custome">
                <Breadcrumb.Item>
                    <Button
                        icon={<LeftOutlined />}
                        type={'primary'}
                        style={{ marginRight: 10 }}
                        onClick={() => navigation('/templates')}
                    />
                    Templates
                </Breadcrumb.Item>
                <Breadcrumb.Item>{template?.name}</Breadcrumb.Item>
            </Breadcrumb>

            <Content>
                <Tabs tabPosition="left" type="card" tabBarStyle={{ width: '200px' }}>
                    {TABCONTENT.map((el) => (
                        <Tabs.TabPane
                            key={el.key}
                            tab={
                                <span>
                                    {el.icon}
                                    {el.buttonText}
                                </span>
                            }>
                            {el.content}
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </Content>
        </Layout>
    );
};
