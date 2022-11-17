import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Modal, Tabs, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { FieldsEdit } from './Fields.edit/Fields.edit';

import * as Icon from '@ant-design/icons';
import { useAppSelector } from '../../../../../../store/hooks/useRedux';

export const SectionEdit: FC = () => {
    const { TabPane } = Tabs;
    const navigation = useNavigate();
    // const param = useParams();
    const { SectionsData } = useAppSelector((state) => state.templates);

    const TABCONTENT = SectionsData.map((el) => ({
        // @ts-ignore
        key: el._id,
        // @ts-ignore
        icon: <Icon.FolderOutlined />,
        // @ts-ignore
        buttonText: el.title,
        // @ts-ignore
        content: <FieldsEdit />,
    }));
    // [
    // {
    //     key: '1',
    //     icon: <Icon.FolderOutlined />,
    //     buttonText: 'Fields',
    //     content: <FieldsEdit />,
    // },
    // {
    //     key: '2',
    //     icon: <Icon.SettingOutlined />,
    //     buttonText: 'Settings',
    //     content: <FieldsSettings />,
    // },
    // ];

    const info = () => {
        Modal.info({
            title: 'API',
            content: (
                <div>
                    <Typography.Paragraph ellipsis copyable={{ tooltips: false }}>
                        {`http://localhost:4000/api/template/content/`}
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
                            onClick={() => navigation(`/templates/`)}
                        />
                        Templates
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Edit</Breadcrumb.Item>
                    <Breadcrumb.Item>ID:</Breadcrumb.Item>
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
