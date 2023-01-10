import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../../axios';
import { Table, Layout, Space, Button, message, Modal, Tag, Tooltip, Switch } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { Content } from 'antd/lib/layout/layout';
import * as Landing from '../../../../store/landings/landings.slice';
import * as Templates from '../../../../store/templates/templates.slice';
import { LandingGroupUpdate } from '../LandingsFrom/Landing.group.update';
import { EmptyCustome } from '../../../../components/EmptyCustome/EmptyCustome';
import { Countrys } from '../../../../components/Countrys/Countrys';

import { ILandingsPage } from '../../../../types';
import type { ColumnsType } from 'antd/es/table';

import * as Icon from '@ant-design/icons';

// STYLE
import './LandingsPage.scss';

const key = 'updated';

export const LandingsPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { landingsData } = useAppSelector((state) => state.landings);
    const { websites } = useAppSelector((state) => state.websites);
    const { lang } = useAppSelector((state) => state.language);
    const { offers } = useAppSelector((state) => state.offers);
    const { TemplatesData } = useAppSelector((state) => state.templates);
    const COUNTRYS = Countrys();

    const filterName = landingsData.map((el) => ({
        text: el.name,
        value: el._id,
    }));

    const filterLanguage = lang
        .filter((el) => el.enabled)
        .map((el) => ({
            text: el.icon + ' ' + el.title,
            value: el.title,
        }));

    const filterCountry = COUNTRYS.map((el) => ({
        text: el.flag + ' ' + el.title,
        value: el.flag,
    }));

    const filterWebsite = websites.map((el) => ({
        text: el.url,
        value: el.url,
    }));

    const filterOffer = offers.map((el) => ({
        text: el.name,
        value: el._id,
    }));

    const filterTempatePack = TemplatesData.map((el) => ({
        text: el.template_pack,
        value: el.template_pack,
    }));

    const Data = landingsData.map((landing) => ({
        key: landing._id,
        name: <Link to={`/landing/${landing._id}`}>{landing.name}</Link>,
        country: landing.country.map((el, ind) => (
            <Tooltip key={ind} placement="top" title={el}>
                <Tag className="flag_tag">{el.split(' ')[0]}</Tag>
            </Tooltip>
        )),
        language: (
            <div className="lang-table">
                <span>{landing.language.icon}</span>
                {landing.language.title}
            </div>
        ),
        website: landing.website.url,
        offer: (
            <Tag key={landing.offer._id}>
                <Icon.StarOutlined /> {landing.offer.name}
            </Tag>
        ),
        template_pack: landing.template_pack,
        status: landing.status ? (
            <Tag color="#87d068">Active</Tag>
        ) : (
            <Tag color="#f50">Deactive</Tag>
        ),
        notes: landing.note,
    }));

    // DELETE
    const handleDelete = async (landingId: React.Key) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.delete(`/api/landing/${landingId}`);
            if (data.success) {
                dispatch(Templates.remove(landingId));
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

    const showModalDelete = (landingId: React.Key) => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: 'Once deleted, you will not be able to restore landing page',
            icon: <Icon.ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(landingId);
            },
        });
    };
    // ./DELETE

    // UPDATE_ONE
    const fetchUpdateOne = async (landing: any) => {
        try {
            await axios.patch(`/api/landing/status/${landing.id}`, {
                status: landing.status,
            });

            dispatch(
                Landing.updateOne({
                    id: landing.id,
                    status: landing.status,
                }),
            );
        } catch (error) {
            console.log('ERROR SWITCH LANDING =>', error);
        }
    };
    // ./UPDATE_ONE

    const columns: ColumnsType<ILandingsPage> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: filterName,
            filterSearch: true,
            ellipsis: true,
            onFilter: (value: string | any, template: any) => template.key.startsWith(value),
        },

        {
            title: 'Country',
            dataIndex: 'country',
            filters: filterCountry,
            filterSearch: true,
            onFilter: (value: string | any, landing: any) =>
                landing.country
                    .map((el: any) => el.props.title.split(' ')[0] === value)
                    .includes(true),
        },
        {
            title: 'Language',
            dataIndex: 'language',
            filters: filterLanguage,
            filterSearch: true,
            onFilter: (value: string | any, template: any) =>
                template.language.props.children[1].startsWith(value),
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
            title: 'Offer',
            dataIndex: 'offer',
            ellipsis: true,
            filters: filterOffer,
            filterSearch: true,
            onFilter: (value: string | any, legals: any) => legals.offer.key.startsWith(value),
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
            title: 'Status',
            dataIndex: 'status',
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
            onFilter: (value: string | any, landing: any) =>
                landing.status.props.children.startsWith(value),
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            className: 'offer__action',
            render: (_, template) => {
                return (
                    <Space size="small">
                        <Switch
                            size="small"
                            checkedChildren={<Icon.CheckOutlined />}
                            unCheckedChildren={<Icon.CloseOutlined />}
                            defaultChecked={
                                template.status.props.children === 'Active' ? true : false
                            }
                            onChange={(checked) =>
                                fetchUpdateOne({ id: template.key, status: checked })
                            }
                        />
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
                <span>Landings</span>
                <Button
                    type="primary"
                    onClick={() => navigate('/landing/create')}
                    icon={<Icon.PlusOutlined />}>
                    Create
                </Button>
            </div>
            <Content className="site-layout-background main_content offer__content">
                <EmptyCustome>
                    <Table
                        rowSelection={LandingGroupUpdate()}
                        columns={columns}
                        dataSource={Data}
                        expandable={{
                            expandedRowRender: (record) => (
                                <p style={{ margin: 0 }}>{record.notes}</p>
                            ),
                        }}
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
