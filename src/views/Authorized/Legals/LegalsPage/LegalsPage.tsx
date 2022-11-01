import { FC } from 'react';
import { Table, Layout, Space, Button } from 'antd';
import { useAppSelector } from '../../../../store/hooks/useRedux';
import { Content } from 'antd/lib/layout/layout';
// import { OffersCreate } from '../OffersFrom/Offers.create/OffersCreate';
// import { OffersDelete } from '../OffersFrom/Offers.delete/OffersDelete';
// import { OffersEdit } from '../OffersFrom/Offers.edit/OffersEdit';

import { IOfferOwner } from '../../../../types';
import type { ColumnsType } from 'antd/es/table';

// STYLE
import './LegalsPage.scss';
import { PlusOutlined } from '@ant-design/icons';

interface DataType {
    key: React.Key;
    name: string;
    offerOwner: IOfferOwner;
    logo: string;
}

export const LegalsPage: FC = () => {
    const { offers } = useAppSelector((state) => state.offers);

    const offerOwnerFilter = useAppSelector((state) => state.offerOwner.offerOwner).map((el) => ({
        text: el.name,
        value: el._id,
    }));

    const offerFilter = offers.map((offer) => ({
        text: offer.name,
        value: offer._id,
    }));

    const OffersData = offers.map((offer) => ({
        key: offer._id,
        ...offer,
        owner: (
            <span
                className="offer__offer-owner"
                style={{
                    backgroundColor: offer.offerOwner.color,
                }}>
                {offer.offerOwner.name}
            </span>
        ),
    }));

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: offerFilter,
            filterSearch: true,
            onFilter: (value: string | any, offer: any) => offer.key.startsWith(value),
            // width: '20%',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            filters: offerFilter,
            filterSearch: true,
            onFilter: (value: string | any, offer: any) => offer.key.startsWith(value),
            // width: '20%',
        },
        {
            title: 'Offer',
            dataIndex: 'offer',
            filters: offerFilter,
            filterSearch: true,
            onFilter: (value: string | any, offer: any) => offer.key.startsWith(value),
            // width: '20%',
        },
        {
            title: 'Websites',
            dataIndex: 'websites',
            filters: offerFilter,
            filterSearch: true,
            onFilter: (value: string | any, offer: any) => offer.key.startsWith(value),
            // width: '20%',
        },
        {
            title: 'Offer owner',
            dataIndex: 'owner',
            // width: '20%',
            filters: offerOwnerFilter,
            filterSearch: true,
            onFilter: (value: string | any, owner) => owner.offerOwner._id.startsWith(value),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            filters: offerFilter,
            filterSearch: true,
            onFilter: (value: string | any, offer: any) => offer.key.startsWith(value),
            // width: '20%',
        },
        {
            title: 'Action',
            key: 'action',
            width: '40%',
            className: 'offer__action',

            render: (_, offer) => (
                <Space size="small">
                    edit, delete, active
                    {/* <OffersEdit offerId={offer.key} />
                    <OffersDelete offerId={offer.key} /> */}
                </Space>
            ),
        },
    ];

    return (
        <Layout className="offer__layout">
            <div className="offer__header">
                <span>Legals</span>
                <Button type="primary" icon={<PlusOutlined />}>
                    Create
                </Button>
            </div>
            <Content className="site-layout-background main_content offer__content">
                <Table
                    columns={columns}
                    dataSource={OffersData}
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
