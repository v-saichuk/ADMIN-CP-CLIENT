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

const error = (mes: string) => {
    message.error(mes);
};

export const WebsitesGroupUpdate = () => {
    // ALL
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const dispatch = useAppDispatch();

    const groupUpdate = async (props: IGroupUpdateProps) => {
        // setIsLoading(true);
        console.log('props', props);
        try {
            const { data } = await axios.patch('/api/websites/group/update', props);
            if (data.success) {
                switch (props.action) {
                    case 'Activate':
                        dispatch(Websites.activateGroup(props.websites));
                        break;
                    case 'Deactivate':
                        dispatch(Websites.deactivateGroup(props.websites));
                        break;
                    case 'Delete':
                        dispatch(Websites.removeGroup(props.websites));
                        break;

                    default:
                        break;
                }

                message.success(data.message);
                // setIsLoading(false);
            }
        } catch (error) {
            const {
                response: {
                    data: { message: msg },
                },
            }: any = error;
            // setIsLoading(false);
            message.error(msg);
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
                        <Icon.CheckOutlined style={{ marginRight: 5 }} />
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
                        <Icon.CloseOutlined style={{ marginRight: 5 }} />
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
                        <Icon.DeleteOutlined style={{ marginRight: 5 }} />
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
    // ./ALL

    return rowSelection;
};
