import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../axios';
import { Table, Layout, Space, Button, Switch, Tag, message, Modal, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { Content } from 'antd/lib/layout/layout';
import * as Website from '../../../../store/websites/websites.slice';
import * as Icon from '@ant-design/icons';

import type { ColumnsType } from 'antd/es/table';
import { WebsitesGroupUpdate } from '../WebsitesForm/Websites.group.update/WebsitesGroupUpdate';

// STYLE
import './WebsitesPage.scss';

interface DataType {
    key: React.Key;
    url: string;
    landing: string;
    offers: any;
    enabled: React.ReactNode;
    notes: string;
}

export const WebsitesPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const groupSelect = WebsitesGroupUpdate();
    const { websites } = useAppSelector((state) => state.websites);
    const [isLoading, setIsLoading] = useState(false);

    const urlFilter = websites.map((website) => ({
        text: website.url,
        value: website._id,
    }));

    const offersFilter = useAppSelector((state) => state.offers.offers).map((el) => ({
        text: el.name,
        value: el._id,
    }));

    const WebsiteData = websites.map((website) => ({
        key: website._id,
        landing: '1 conected',
        // ...website,
        url: website.url,
        enabled: website.enabled ? (
            <Tag color="#87d068">Active</Tag>
        ) : (
            <Tag color="#f50">Deactive</Tag>
        ),
        notes:
            // <Tooltip placement="bottom" title={website.notes}>
            website.notes,
        // </Tooltip>
        offers: website.offers.map((offer) => <Tag key={offer._id}>{offer.name}</Tag>),
    }));

    // UPDATE_ONE
    const fetchUpdateOne = async (props: any) => {
        try {
            const { data } = await axios.patch(`/api/websites/enabled/${props.id}`, {
                enabled: props.enabled,
            });
            dispatch(
                Website.updateOne({
                    id: props.id,
                    enabled: props.enabled,
                }),
            );
            message.success(data.message);
            return;
        } catch (e: any) {
            console.log('ERROR fetchUpdateOne =>', e);
            e.response.data.map((el: any) => message.error(el.msg));
            return;
        }
    };
    // ./UPDATE_ONE

    // DELETE
    const handleDelete = async (websiteId: React.Key) => {
        setIsLoading(true);
        try {
            const { data } = await axios.delete(`/api/websites/${websiteId}`);
            if (data.success) {
                message.success(data.message);
                dispatch(Website.remove(websiteId));
                setIsLoading(false);
            }
        } catch (error) {
            const {
                response: {
                    data: { message: msg },
                },
            }: any = error;
            setIsLoading(false);
            message.error(msg);
        }
    };

    const showModalDelete = (websiteId: React.Key) => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: 'Once deleted, you will not be able to restore website',
            icon: <Icon.ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(websiteId);
            },
        });
    };
    // ./DELETE

    const columns: ColumnsType<DataType> = [
        {
            title: 'URL',
            dataIndex: 'url',
            width: '20%',
            filters: urlFilter,
            filterSearch: true,
            onFilter: (value: string | any, website: any) => website.key.startsWith(value),
        },
        {
            title: 'Landing pages',
            dataIndex: 'landing',
            width: '10%',
        },
        {
            title: 'Offers',
            dataIndex: 'offers',
            width: '20%',
            // ellipsis: true,
            filters: offersFilter,
            filterSearch: true,
            onFilter: (value: string | any, website: any) =>
                website.offers.map((el: any) => el.key === value).includes(true),
        },
        {
            title: 'Status',
            dataIndex: 'enabled',
            width: '8%',
            filters: [
                {
                    text: 'Active',
                    value: 'Active',
                },
                {
                    text: 'Deactive',
                    value: 'Deactive',
                },
            ],
            onFilter: (value: string | any, website: any) =>
                website.enabled.props.children.startsWith(value),
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
            width: '32%',
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            className: 'offer__action',
            render: (_, website) => {
                return (
                    <Space size="small">
                        <Switch
                            size="small"
                            defaultChecked={
                                // @ts-ignore
                                website.enabled.props.children === 'Active' ? true : false
                            }
                            onChange={(checked) =>
                                fetchUpdateOne({ id: website.key, enabled: checked })
                            }
                        />
                        <Button
                            type="text"
                            icon={<Icon.EditOutlined />}
                            onClick={() => navigate(`/websites/edit/${website.key}`)}
                        />
                        <Button
                            type="text"
                            icon={<Icon.DeleteOutlined />}
                            onClick={() => showModalDelete(website.key)}
                        />
                    </Space>
                );
            },
        },
    ];

    return (
        <Layout className="offer__layout">
            <div className="offer__header">
                <span>Websites</span>
                <Button
                    type="primary"
                    onClick={() => navigate('/websites/create')}
                    icon={<Icon.PlusOutlined />}>
                    Create
                </Button>
            </div>
            <Content className="site-layout-background main_content offer__content">
                <Table
                    rowSelection={groupSelect}
                    columns={columns}
                    dataSource={WebsiteData}
                    pagination={{
                        defaultPageSize: 8,
                        hideOnSinglePage: true,
                        showSizeChanger: false,
                    }}
                />
            </Content>
        </Layout>
    );
};

// TODO: 4. Зробити автооновлення в локальному сторі при виконнані масових дій
// TODO: 5. При наведенні на колонку НОТЕ відкривати вспливаюче вікно з повною інформаціею
