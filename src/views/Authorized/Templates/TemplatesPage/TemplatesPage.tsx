import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../../axios';
import { Table, Layout, Space, Button, message, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { Content } from 'antd/lib/layout/layout';
import * as Templates from '../../../../store/templates/templates.slice';
import { TemplatesGroupUpdate } from '../TemplatesFrom/Templates.group.update';
import { EmptyCustome } from '../../../../components/EmptyCustome/EmptyCustome';

import { ITemplatesPage } from '../../../../types';
import type { ColumnsType } from 'antd/es/table';
import * as Icon from '@ant-design/icons';
import { IconNoImage } from '../../../../assets/images/svg/svg';

// STYLE
import './TemplatesPage.scss';

const key = 'updated';

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
        name: <Link to={`/template/${template._id}`}>{template.name}</Link>,
        language: (
            <div className="lang-table">
                <span>{template.language.icon}</span>
                {template.language.title}
            </div>
        ),
        template_pack: template.template_pack,
        description: template.description,
        screenshot: <IconNoImage x={220} y={50} />, // template.screenshot
    }));

    // DELETE
    const handleDelete = async (templateId: React.Key) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.delete(`/api/template/${templateId}`);
            if (data.success) {
                dispatch(Templates.remove(templateId));
                message.success({
                    content: 'Loaded!',
                    key,
                    duration: 2,
                });
            }
        } catch (e) {
            message.error({ content: 'Error!', key, duration: 2 });
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

    const columns: ColumnsType<ITemplatesPage> = [
        {
            title: 'Name',
            dataIndex: 'name',
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
            filters: filterDescription,
            filterSearch: true,
            ellipsis: true,
        },
        {
            title: 'Screenshot',
            dataIndex: 'screenshot',
            className: 'offer__image',
        },
        {
            title: 'Template pack',
            dataIndex: 'template_pack',
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
                            onClick={() => navigate(`/template/${template.key}`)}
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
                    onClick={() => navigate('/template/create')}
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
