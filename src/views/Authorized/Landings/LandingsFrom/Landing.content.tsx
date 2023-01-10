import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks/useRedux';
import { Breadcrumb, Button, Layout, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { LandingSettings } from './Landing.settings';
import { LandingSections } from './Landing.sections/Landing.sections';

import { DatabaseOutlined, LeftOutlined, SettingOutlined } from '@ant-design/icons';

export const LandingContent: FC = () => {
    const navigation = useNavigate();
    const { id: LANDING_PAGE_ID } = useParams();
    const LANDING = useAppSelector((state) =>
        state.landings.landingsData.find((landing) => landing._id === LANDING_PAGE_ID),
    );

    const TABCONTENT = [
        {
            key: '1',
            icon: <DatabaseOutlined />,
            buttonText: 'Sections',
            content: <LandingSections />,
        },
        {
            key: '2',
            icon: <SettingOutlined />,
            buttonText: 'Settings',
            content: <LandingSettings />,
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
                        onClick={() => navigation('/landings')}
                    />
                    Landing
                </Breadcrumb.Item>
                <Breadcrumb.Item>{LANDING?.name}</Breadcrumb.Item>
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
