import { FC } from 'react';
import { Table } from 'antd';
import { Button, Layout, Space } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import type { ColumnsType, TableProps } from 'antd/es/table';
import { EditOutlined } from '@ant-design/icons';

// STYLE
import './OffersPage.scss';
import { useAppSelector } from '../../../../store/hooks/useRedux';
import { OffersCreate } from '../OffersFrom/Offers.create/OffersCreate';
import { IOfferOwner } from '../../../../types';
import { OffersDelete } from '../OffersFrom/Offers.delete/OffersDelete';
import { OffersEdit } from '../OffersFrom/Offers.edit/OffersEdit';

interface DataType {
    key: React.Key;
    name: string;
    offerOwner: IOfferOwner;
    logo: string;
}

// const data: DataType[] = [
//     {
//         key: '1',
//         name: 'John Brown',
//         offerowner: 'ProjectMVMW',
//         logo: 'Logo 1',
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         offerowner: 'ProjectMVMT',
//         logo: 'Logo 2',
//     },
//     {
//         key: '3',
//         name: 'Jim Green',
//         offerowner: 'ProjectMVMT',
//         logo: 'Logo 3',
//     },
//     {
//         key: '4',
//         name: 'Jim Green',
//         offerowner: 'ProjectMVMT',
//         logo: 'Logo 4',
//     },
//     {
//         key: '5',
//         name: 'Jim Green',
//         offerowner: 'DigitalMVMT',
//         logo: 'Logo 5',
//     },
//     {
//         key: '6',
//         name: 'Jim Green',
//         offerowner: 'ProjectMVMT',
//         logo: 'Logo 6',
//     },
//     {
//         key: '7',
//         name: 'Jim Green',
//         offerowner: 'ProjectMVMT',
//         logo: 'Logo 7',
//     },
//     {
//         key: '8',
//         name: 'Jim Green',
//         offerowner: 'ProjectMVMT',
//         logo: 'Logo 8',
//     },
//     {
//         key: '9',
//         name: 'Jim Green',
//         offerowner: 'ProjectMVMT',
//         logo: 'Logo 9',
//     },
//     {
//         key: '10',
//         name: 'Jim Green',
//         offerowner: 'ProjectMVMT',
//         logo: 'Logo 10',
//     },
// ];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

export const OffersPage: FC = () => {
    const { offers } = useAppSelector((state) => state.offers);

    const offerOwnerData = useAppSelector((state) => state.offerOwner.offerOwner).map((el) => ({
        text: el.name,
        value: el._id,
    }));

    console.log('offerOwnerData=>>>', offerOwnerData);

    const OffersData = offers.map((offer) => ({
        key: offer._id,
        ...offer,
        owner: (
            <span
                style={{
                    backgroundColor: offer.offerOwner.color,
                    marginRight: 20,
                    padding: '5px 15px',
                }}>
                {offer.offerOwner.name}
            </span>
        ),
    }));

    console.log('OffersData =>', OffersData);
    // const datas = offerOwnerData.map((el) => ({ text: el.name, value: el.name }));

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'John',
                    value: 'John',
                },
                {
                    text: 'Category 1',
                    value: 'Category 1',
                },
                {
                    text: 'Category 2',
                    value: 'Category 2',
                },
            ],
            // filterMode: 'tree',
            filterSearch: true,
            // @ts-ignore
            onFilter: (value: string, record) => record.name.startsWith(value),
            width: '20%',
        },
        {
            title: 'Offer owner',
            dataIndex: 'owner',
            width: '20%',
            filters: offerOwnerData,
            filterSearch: true,
            // @ts-ignore
            onFilter: (value: string, record: DataType) => record.offerOwner._id.startsWith(value),
        },
        {
            title: 'Logo',
            dataIndex: 'logo',
            width: '20%',
        },
        {
            className: 'testing',
            title: 'Action',
            key: 'action',
            width: '40%',

            render: (_, record) => (
                <Space size="small">
                    <OffersEdit offerId={record.key} />
                    <OffersDelete offerId={record.key} />
                </Space>
            ),
        },
    ];

    return (
        <Layout style={{ padding: '0 24px 24px', marginTop: 20 }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Offers</Breadcrumb.Item>
            </Breadcrumb> */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}>
                <span>Offers</span>
                <OffersCreate />
            </div>
            <Content
                className="site-layout-background main_content"
                style={{
                    margin: 0,
                    padding: 15,
                    border: 'none',
                }}>
                <Table
                    columns={columns}
                    dataSource={OffersData}
                    onChange={onChange}
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
