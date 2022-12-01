import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../../axios';
import { Table, Layout, Space, Button, Switch, Tag, message, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { Content } from 'antd/lib/layout/layout';
import * as LegalPage from '../../../../store/legals/legalas.slice';
import { LegalsGroupUpdate } from '../LegalsFrom/Legals.group.update';
import { EmptyCustome } from '../../../../components/EmptyCustome/EmptyCustome';

import type { ColumnsType } from 'antd/es/table';
import * as Icon from '@ant-design/icons';

// STYLE
import './LegalsPage.scss';

interface ColumnsDataType {
    key: React.Key;
    name: React.ReactNode;
    language: React.ReactNode;
    offer: React.ReactNode;
    website: React.ReactNode;
    offerOwner: React.ReactNode;
    enabled: React.ReactNode;
}

const key = 'updated';

export const LegalsPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const groupUpdate = LegalsGroupUpdate();
    const { LegalsData } = useAppSelector((state) => state.legals);
    const { lang } = useAppSelector((state) => state.language);
    const { offers } = useAppSelector((state) => state.offers);
    const { offerOwner } = useAppSelector((state) => state.offerOwner);
    const { websites } = useAppSelector((state) => state.websites);
    const [isLoadingOne, setIsLoadingOne] = useState({ id: null, enabled: false });

    const filterName = LegalsData.map((el) => ({
        text: el.name,
        value: el._id,
    }));

    const filterLanguage = lang
        .filter((el) => el.enabled)
        .map((el) => ({
            text: el.icon + ' ' + el.title,
            value: el.title,
        }));

    const filterOffer = offers.map((el) => ({
        text: el.name,
        value: el._id,
    }));

    const filterWebsite = websites.map((el) => ({
        text: el.url,
        value: el.url,
    }));

    const filterOfferOwner = offerOwner.map((el) => ({
        text: el.name,
        value: el.name,
    }));

    const Data = LegalsData.map((legal) => ({
        key: legal._id,
        name: <Link to={`/legals/edit/${legal._id}`}>{legal.name}</Link>,
        language: (
            <div className="lang-table">
                <span>{legal.language[0].icon}</span>
                {legal.language[0].title}
            </div>
        ),
        offer: (
            <Tag key={legal.offer[0]._id}>
                <Icon.StarOutlined /> {legal.offer[0].name}
            </Tag>
        ),
        website: legal.website[0].url,
        offerOwner: <Tag color={legal.offerOwner[0].color}>{legal.offerOwner[0].name}</Tag>,
        enabled: legal.enabled ? (
            <Tag color="#87d068">Active</Tag>
        ) : (
            <Tag color="#f50">Deactive</Tag>
        ),
    }));

    // UPDATE_ONE
    const fetchUpdateOne = async (props: any) => {
        message.loading({ content: 'Loading...', key });
        setIsLoadingOne({
            id: props.id,
            enabled: true,
        });
        try {
            await axios.patch(`/api/legals/enabled/${props.id}`, {
                enabled: props.enabled,
            });
            dispatch(
                LegalPage.updateOne({
                    id: props.id,
                    enabled: props.enabled,
                }),
            );
            message.success({
                content: props.enabled ? 'Activated' : 'Deactivated',
                key,
                duration: 2,
            });
            setIsLoadingOne({
                id: props.id,
                enabled: false,
            });
        } catch (e) {
            setIsLoadingOne({
                id: props.id,
                enabled: false,
            });
            message.error({ content: 'Error!', key, duration: 2 });
        }
    };
    // ./UPDATE_ONE

    // DELETE
    const handleDelete = async (legalId: React.Key) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.delete(`/api/legals/${legalId}`);
            if (data.success) {
                message.success({ content: 'Legal page deleted', key, duration: 2 });
                dispatch(LegalPage.remove(legalId));
            }
        } catch (e) {
            message.error({ content: 'Error!', key, duration: 2 });
        }
    };

    const showModalDelete = (legalId: React.Key) => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: 'Once deleted, you will not be able to restore Legal',
            icon: <Icon.ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(legalId);
            },
        });
    };
    // ./DELETE

    const columns: ColumnsType<ColumnsDataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: filterName,
            filterSearch: true,
            ellipsis: true,
            onFilter: (value: string | any, legals: any) => legals.key.startsWith(value),
        },
        {
            title: 'Language',
            dataIndex: 'language',
            width: '10%',
            filters: filterLanguage,
            filterSearch: true,
            onFilter: (value: string | any, legals: any) =>
                legals.language.props.children[1].startsWith(value),
        },
        {
            title: 'Offer',
            dataIndex: 'offer',
            ellipsis: true,
            filters: filterOffer,
            filterSearch: true,
            onFilter: (value: string | any, legals: any) => legals.offer.key.startsWith(value),
        },
        {
            title: 'Website',
            dataIndex: 'website',
            filters: filterWebsite,
            filterSearch: true,
            ellipsis: true,
            onFilter: (value: string | any, legals: any) => legals.website.startsWith(value),
        },
        {
            title: 'Offer owner',
            dataIndex: 'offerOwner',
            filters: filterOfferOwner,
            filterSearch: true,
            ellipsis: true,
            onFilter: (value: string | any, legals: any) =>
                legals.offerOwner.props.children.startsWith(value),
        },
        {
            title: 'Status',
            dataIndex: 'enabled',
            width: '8%',
            filters: [
                {
                    text: (
                        <>
                            <Icon.CheckOutlined style={{ color: '#66d986' }} /> Active
                        </>
                    ),
                    value: 'Active',
                },
                {
                    text: (
                        <>
                            <Icon.CloseOutlined style={{ color: '#f25b5b' }} /> Deactive
                        </>
                    ),
                    value: 'Deactive',
                },
            ],
            onFilter: (value: string | any, website: any) =>
                website.enabled.props.children.startsWith(value),
        },
        {
            title: 'Action',
            key: 'action',
            width: '12%',
            className: 'offer__action',
            render: (_, legal: any) => {
                return (
                    <Space size="small">
                        <Switch
                            size="small"
                            checkedChildren={<Icon.CheckOutlined />}
                            unCheckedChildren={<Icon.CloseOutlined />}
                            defaultChecked={
                                legal.enabled.props.children === 'Active' ? true : false
                            }
                            loading={legal.key === isLoadingOne.id && isLoadingOne.enabled}
                            onChange={(checked) =>
                                fetchUpdateOne({ id: legal.key, enabled: checked })
                            }
                        />
                        <Button
                            type="text"
                            icon={<Icon.EditOutlined />}
                            onClick={() => navigate(`/legals/edit/${legal.key}`)}
                        />
                        <Button
                            type="text"
                            icon={<Icon.DeleteOutlined />}
                            onClick={() => showModalDelete(legal.key)}
                        />
                    </Space>
                );
            },
        },
    ];

    return (
        <Layout className="content-layout">
            <div className="content-header">
                <span>Legals</span>
                <Button
                    type="primary"
                    onClick={() => navigate('/legals/create')}
                    icon={<Icon.PlusOutlined />}>
                    Create
                </Button>
            </div>
            <Content className="site-layout-background main_content offer__content">
                <EmptyCustome>
                    <Table
                        rowSelection={groupUpdate}
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
