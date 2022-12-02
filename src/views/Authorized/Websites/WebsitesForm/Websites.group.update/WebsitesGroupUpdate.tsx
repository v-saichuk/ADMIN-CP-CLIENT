import axios from '../../../../../axios';

import type { TableRowSelection } from 'antd/es/table/interface';
import { useState } from 'react';
import { message, Modal } from 'antd';
import * as Icon from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../../store/hooks/useRedux';
import * as Websites from '../../../../../store/websites/websites.slice';

interface DataType {
    key: React.Key;
    url: string;
    landing: string;
    offers: any;
    enabled: React.ReactNode;
    notes: string;
}

interface IGroupUpdateProps {
    action: string;
    websites: React.Key[];
}

const key = 'updatable';

const error = (mes: string) => {
    message.error(mes);
};

export const WebsitesGroupUpdate = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const dispatch = useAppDispatch();

    const groupUpdate = async (props: IGroupUpdateProps) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/websites/group/update', props);
            if (data.success) {
                switch (props.action) {
                    case 'Activate':
                        dispatch(Websites.activateGroup(props.websites));
                        message.success({
                            content: `Activate ${props.websites.length} elements!`,
                            key,
                            duration: 2,
                        });
                        break;
                    case 'Deactivate':
                        dispatch(Websites.deactivateGroup(props.websites));
                        message.success({
                            content: `Deactivate ${props.websites.length} elements!`,
                            key,
                            duration: 2,
                        });
                        break;
                    case 'Delete':
                        dispatch(Websites.removeGroup(props.websites));
                        message.success({
                            content: `Delete ${props.websites.length} elements!`,
                            key,
                            duration: 2,
                        });
                        break;

                    default:
                        break;
                }

                message.success(data.message);
            }
        } catch (e) {
            message.error({ content: 'Error!', key, duration: 2 });
        }
    };

    const showStatusConfirm = (props: IGroupUpdateProps) => {
        Modal.confirm({
            title: `Are you sure you want to set the status to ${props.action} for all selected items?`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                groupUpdate(props);
            },
        });
    };

    const showDeleteConfirm = (props: IGroupUpdateProps) => {
        Modal.confirm({
            title: 'Are you sure you want to delete all selected items?',
            content: 'Once deleted, you will not be able to restore websites',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'No',
            okType: 'danger',
            onOk() {
                groupUpdate(props);
            },
        });
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: (selected) => setSelectedRowKeys(selected),
        selections: [
            {
                key: 'activate',
                text: (
                    <>
                        <Icon.CheckOutlined style={{ marginRight: 5, color: '#66d986' }} />
                        Activate
                    </>
                ),
                onSelect: () => {
                    selectedRowKeys.length
                        ? showStatusConfirm({
                              action: 'Activate',
                              websites: selectedRowKeys,
                          })
                        : error('Failed to activate. No items selected');
                },
            },
            {
                key: 'deactivate',
                text: (
                    <>
                        <Icon.CloseOutlined style={{ marginRight: 5, color: '#f25b5b' }} />
                        Deactivate
                    </>
                ),
                onSelect: () => {
                    selectedRowKeys.length
                        ? showStatusConfirm({
                              action: 'Deactivate',
                              websites: selectedRowKeys,
                          })
                        : error('Failed to deactivate. No items selected');
                },
            },
            {
                key: 'delete',
                text: (
                    <>
                        <Icon.DeleteOutlined style={{ marginRight: 5, color: '#f25b5b' }} />
                        Delete
                    </>
                ),
                onSelect: () => {
                    selectedRowKeys.length
                        ? showDeleteConfirm({
                              action: 'Delete',
                              websites: selectedRowKeys,
                          })
                        : error('Failed to delete. No items selected');
                },
            },
        ],
    };

    return rowSelection;
};
