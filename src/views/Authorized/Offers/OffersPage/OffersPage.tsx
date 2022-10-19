import { Breadcrumb, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { FC } from 'react';

import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React from 'react';

// STYLE
import './OffersPage.scss';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

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
        width: '30%',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        // @ts-ignore
        onFilter: (value: string, record) => record.address.startsWith(value),
        filterSearch: true,
        width: '40%',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

export const OffersPage: FC = () => {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    // padding: 24,
                    margin: 0,
                    minHeight: 280,
                    color: 'green',
                }}>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </Content>
        </Layout>
    );
};
