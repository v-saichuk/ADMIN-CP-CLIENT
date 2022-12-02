import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../axios';
import { Table, Layout, Space, Button, message, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { Content } from 'antd/lib/layout/layout';
import * as Templates from '../../../../store/templates/templates.slice';
import { TemplatesGroupUpdate } from '../TemplatesFrom/Templates.group/Templates.group.update';

import type { ColumnsType } from 'antd/es/table';
import * as Icon from '@ant-design/icons';

// STYLE
import './TemplatesPage.scss';
import { EmptyCustome } from '../../../../components/EmptyCustome/EmptyCustome';

interface DataType {
    key: React.Key;
    name: string;
    language: React.ReactNode;
    template_pack: string;
    description: string;
    screenshot: string;
}

export const TemplatesPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { TemplatesData } = useAppSelector((state) => state.templates);
    const { lang } = useAppSelector((state) => state.language);

    const filterName = TemplatesData.map((el) => ({
        text: el.name,
        value: el._id,
    }));

    const filterLanguage = lang
        .filter((el) => el.enabled)
        .map((el) => ({
            text: el.icon + ' ' + el.title,
            value: el.title,
        }));

    const filterDescription = TemplatesData.map((el) => ({
        text: el.description,
        value: el.description,
    }));

    const filterTempatePack = TemplatesData.map((el) => ({
        text: el.template_pack,
        value: el.template_pack,
    }));

    const Data = TemplatesData.map((template) => ({
        key: template._id,
        name: template.name,
        language: (
            <div className="lang-table">
                <span>{template.language.icon}</span>
                {template.language.title}
            </div>
        ),
        template_pack: template.template_pack,
        description: template.description,
        screenshot: template.screenshot,
    }));

    // DELETE
    const handleDelete = async (templateId: React.Key) => {
        try {
            const { data } = await axios.delete(`/api/templates/${templateId}`);
            if (data.success) {
                message.success(data.message);
                dispatch(Templates.remove(templateId));
            }
        } catch (error) {
            const {
                response: {
                    data: { message: msg },
                },
            }: any = error;
            message.error(msg);
        }
    };

    const showModalDelete = (templateId: React.Key) => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: 'Once deleted, you will not be able to restore Legal',
            icon: <Icon.ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(templateId);
            },
        });
    };
    // ./DELETE

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            // width: '10%',
            filters: filterName,
            filterSearch: true,
            ellipsis: true,
            onFilter: (value: string | any, template: any) => template.key.startsWith(value),
        },
        {
            title: 'Language',
            dataIndex: 'language',
            width: '10%',
            filters: filterLanguage,
            filterSearch: true,
            onFilter: (value: string | any, template: any) =>
                template.language.props.children[1].startsWith(value),
        },

        {
            title: 'Description',
            dataIndex: 'description',
            // width: '20%',
            filters: filterDescription,
            filterSearch: true,
            ellipsis: true,
            // onFilter: (value: string | any, template: any) => template.website.startsWith(value),
        },
        {
            title: 'Screenshot',
            dataIndex: 'screenshot',
            // width: '20%',
        },
        {
            title: 'Template pack',
            dataIndex: 'template_pack',
            // width: '20%',
            filters: filterTempatePack,
            filterSearch: true,
            ellipsis: true,
            onFilter: (value: string | any, template: any) =>
                template.template_pack.startsWith(value),
        },

        {
            title: 'Action',
            key: 'action',
            width: '10%',
            className: 'offer__action',
            render: (_, template) => {
                return (
                    <Space size="small">
                        <Button
                            type="text"
                            icon={<Icon.MenuOutlined />}
                            onClick={() => navigate(`/templates/${template.key}`)}
                        />
                        <Button
                            type="text"
                            icon={<Icon.DeleteOutlined />}
                            onClick={() => showModalDelete(template.key)}
                        />
                    </Space>
                );
            },
        },
    ];

    return (
        <Layout className="content-layout">
            <div className="content-header">
                <span>Templates</span>
                <Button
                    type="primary"
                    onClick={() => navigate('/templates/create')}
                    icon={<Icon.PlusOutlined />}>
                    Create
                </Button>
            </div>
            <Content className="site-layout-background main_content offer__content">
                <EmptyCustome>
                    <Table
                        rowSelection={TemplatesGroupUpdate()}
                        columns={columns}
                        dataSource={Data}
                        pagination={{
                            defaultPageSize: 8,
                            hideOnSinglePage: true,
                            showSizeChanger: false,
                        }}
                    />
                </EmptyCustome>
            </Content>
        </Layout>
    );
};
