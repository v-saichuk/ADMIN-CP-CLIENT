import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import * as Icon from '@ant-design/icons';
import { useAppSelector } from '../../../../../store/hooks/useRedux';
import { LandingFields } from './Landing.fields';

export const LandingFieldsContent: FC = () => {
    const { TabPane } = Tabs;
    const navigation = useNavigate();
    const { pathname } = useLocation();

    const LANDING_ID = pathname.split('/')[2];
    const SECTION_ID = pathname.split('/')[3];

    const landing = useAppSelector((state) =>
        state.landings.landingsData.find((landing) => landing._id === LANDING_ID),
    );

    const section = landing?.sections.find((section) => section._id === SECTION_ID);

    const TABCONTENT = landing?.sections.map((section) => ({
        key: section._id,
        buttonText: section.title,
        content: <LandingFields />,
    }));

    return (
        <Layout className="content-layout-padding">
            <Breadcrumb className="Breadcrumb-custome">
                <Breadcrumb.Item>
                    <Button
                        icon={<Icon.LeftOutlined />}
                        type={'primary'}
                        style={{ marginRight: 10 }}
                        onClick={() => navigation(`/landing/${LANDING_ID}`)}
                    />
                    Landing
                </Breadcrumb.Item>
                <Breadcrumb.Item>{landing?.name}</Breadcrumb.Item>
                <Breadcrumb.Item>{section?.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
                <Tabs
                    tabPosition="left"
                    activeKey={SECTION_ID}
                    type="card"
                    tabBarStyle={{ width: '200px' }}
                    onChange={(id) => navigation(`/landing/${LANDING_ID}/${id}`)}>
                    {TABCONTENT?.map((el) => (
                        <TabPane
                            key={el.key}
                            tab={
                                <span>
                                    {el.key === SECTION_ID ? (
                                        <Icon.FolderOpenOutlined />
                                    ) : (
                                        <Icon.FolderOutlined />
                                    )}
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
