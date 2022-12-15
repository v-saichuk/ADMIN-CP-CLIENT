import { FC } from 'react';
import { Table, Layout, Space, Tag } from 'antd';
import { useAppSelector } from '../../../../store/hooks/useRedux';
import { Content } from 'antd/lib/layout/layout';
import { OffersCreate } from '../OffersFrom/Offers.create/OffersCreate';
import { OffersDelete } from '../OffersFrom/Offers.delete/OffersDelete';
import { OffersEdit } from '../OffersFrom/Offers.edit/OffersEdit';

import { IOfferOwner } from '../../../../types';
import type { ColumnsType } from 'antd/es/table';
import { StarOutlined } from '@ant-design/icons';
import { IconNoImage } from '../../../../assets/images/svg/svg';

// STYLE
import './OffersPage.scss';

interface DataType {
    key: React.Key;
    name: React.ReactNode;
    offerOwner: IOfferOwner;
    logo: React.ReactNode;
}

export const OffersPage: FC = () => {
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
        logo: <IconNoImage x={250} y={50} />,
        name: (
            <>
                <StarOutlined className="offer__star-icon" /> {offer.name}
            </>
        ),
        owner: <Tag color={offer.offerOwner.color}>{offer.offerOwner.name}</Tag>,
    }));

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: offerFilter,
            filterSearch: true,
            onFilter: (value: string | any, offer: any) => offer.key.startsWith(value),
            width: '20%',
        },
        {
            title: 'Offer owner',
            dataIndex: 'owner',
            width: '20%',
            filters: offerOwnerFilter,
            filterSearch: true,
            onFilter: (value: string | any, owner) => owner.offerOwner._id.startsWith(value),
        },
        {
            title: 'Logo',
            dataIndex: 'logo',
            className: 'offer__image',
            width: '20%',
        },
        {
            title: 'Action',
            key: 'action',
            width: '40%',
            className: 'offer__action',

            render: (_, offer) => (
                <Space size="small">
                    <OffersEdit offerId={offer.key} />
                    <OffersDelete offerId={offer.key} />
                </Space>
            ),
        },
    ];

    return (
        <Layout className="content-layout">
            <div className="content-header">
                <span>Offers</span>
                <OffersCreate />
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
