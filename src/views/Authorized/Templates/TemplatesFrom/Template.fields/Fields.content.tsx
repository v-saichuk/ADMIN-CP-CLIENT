import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Tabs } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import * as Icon from '@ant-design/icons';
import { useAppSelector } from '../../../../../store/hooks/useRedux';
import { TemplatesFields } from './Templates.fields';

export const FieldsContent: FC = () => {
    const { TabPane } = Tabs;
    const navigation = useNavigate();
    const { pathname } = useLocation();

    const TEMPLATE_ID = pathname.split('/')[2];
    const SECTION_ID = pathname.split('/')[4];

    const template = useAppSelector((state) =>
        state.templates.TemplatesData.find((el) => el._id === TEMPLATE_ID),
    );

    const section = template?.sections.find((el) => el._id === SECTION_ID);

    const TABCONTENT = template?.sections.map((section) => ({
        key: section._id,
        buttonText: section.title,
        content: <TemplatesFields />,
    }));

    return (
        <Layout className="content-layout-padding">
            <Breadcrumb className="Breadcrumb-custome">
                <Breadcrumb.Item>
                    <Button
                        icon={<Icon.LeftOutlined />}
                        type={'primary'}
                        style={{ marginRight: 10 }}
                        onClick={() => navigation(`/template/${TEMPLATE_ID}`)}
                    />
                    Templates
                </Breadcrumb.Item>
                <Breadcrumb.Item>{template?.name}</Breadcrumb.Item>
                <Breadcrumb.Item>{section?.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
                <Tabs
                    tabPosition="left"
                    activeKey={SECTION_ID}
                    type="card"
                    tabBarStyle={{ width: '200px' }}
                    onChange={(id) => navigation(`/template/${TEMPLATE_ID}/section/${id}`)}>
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
