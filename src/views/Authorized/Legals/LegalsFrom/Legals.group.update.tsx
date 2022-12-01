import axios from '../../../../axios';

import type { TableRowSelection } from 'antd/es/table/interface';
import { useState } from 'react';
import { message, Modal } from 'antd';
import * as Icon from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../store/hooks/useRedux';
import * as Legals from '../../../../store/legals/legalas.slice';

interface DataType {
    key: React.Key;
    name: React.ReactNode;
    language: React.ReactNode;
    offer: React.ReactNode;
    website: React.ReactNode;
    offerOwner: React.ReactNode;
    enabled: React.ReactNode;
}

interface IGroupUpdateProps {
    action: string;
    legalsId: React.Key[];
}

const error = (mes: string) => {
    message.error(mes);
};

const key = 'updatable';

export const LegalsGroupUpdate = () => {
    const dispatch = useAppDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const selectedQuantity = !!selectedRowKeys.length && selectedRowKeys.length;

    const groupUpdate = async (props: IGroupUpdateProps) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/legals/group/update', props);
            // console.log('Legal fedback', data);

            switch (props.action) {
                case 'Duplicate':
                    dispatch(Legals.duplicateGroup(data.data));
                    message.success({
                        content: `Duplicate ${props.legalsId.length} elements!`,
                        key,
                        duration: 2,
                    });

                    break;
                case 'Delete':
                    dispatch(Legals.removeGroup(props.legalsId));
                    message.success({
                        content: `Delete ${props.legalsId.length} elements!`,
                        key,
                        duration: 2,
                    });
                    break;

                default:
                    break;
            }
        } catch (e) {
            message.error({ content: 'Error!', key, duration: 2 });
        }
    };

    const showStatusConfirm = (props: IGroupUpdateProps) => {
        Modal.confirm({
            title: 'Are you sure you want to duplicate the selected items?',
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
                key: 'duplicate',
                text: (
                    <>
                        <Icon.CopyOutlined style={{ marginRight: 5, color: '#F59337' }} />
                        Duplicate {selectedQuantity}
                    </>
                ),
                onSelect: () => {
                    selectedRowKeys.length
                        ? showStatusConfirm({
                              action: 'Duplicate',
                              legalsId: selectedRowKeys,
                          })
                        : error('Failed to duplicate. No items selected');
                },
            },
            {
                key: 'delete',
                text: (
                    <>
                        <Icon.DeleteOutlined style={{ marginRight: 5, color: '#fa541c' }} />
                        Delete {selectedQuantity}
                    </>
                ),
                onSelect: () => {
                    selectedRowKeys.length
                        ? showDeleteConfirm({
                              action: 'Delete',
                              legalsId: selectedRowKeys,
                          })
                        : error('Failed to delete. No items selected');
                },
            },
        ],
    };

    return rowSelection;
};
