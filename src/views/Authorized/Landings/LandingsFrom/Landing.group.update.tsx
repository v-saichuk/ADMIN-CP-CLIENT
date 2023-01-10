import { useState } from 'react';
import axios from '../../../../axios';
import { useAppDispatch } from '../../../../store/hooks/useRedux';
import { message, Modal } from 'antd';
import * as Landing from '../../../../store/landings/landings.slice';

import type { TableRowSelection } from 'antd/es/table/interface';
import * as Icon from '@ant-design/icons';
import { ILandingsPage } from '../../../../types';

interface IGroupUpdateProps {
    action: string;
    landingId: React.Key[];
}

const errorMessage = (msg: string) => message.error(msg);

const key = 'updatable';

export const LandingGroupUpdate = () => {
    const dispatch = useAppDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const selectedQuantity = !!selectedRowKeys.length && selectedRowKeys.length;

    const groupUpdate = async (props: IGroupUpdateProps) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/Landing/group/update', props);

            if (data.success) {
                switch (props.action) {
                    case 'Duplicate':
                        // TODO: Не оновлюється стор, не додается нова дубльвана сторінка
                        dispatch(Landing.duplicateGroup(data.data));
                        break;
                    case 'Delete':
                        dispatch(Landing.removeGroup(props.landingId));
                        break;

                    default:
                        break;
                }
                message.success({ content: 'Loaded!', key, duration: 2 });
            }
        } catch (e) {
            message.error({ content: 'Error!', key, duration: 2 });
        }
    };

    const showStatusConfirm = (props: IGroupUpdateProps) => {
        Modal.confirm({
            title: `Are you sure you want to duplicate the selected items?`,
            icon: <Icon.ExclamationCircleOutlined />,
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
            content: 'Once deleted, you will not be able to restore templates',
            icon: <Icon.ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'No',
            okType: 'danger',
            onOk() {
                groupUpdate(props);
            },
        });
    };

    const rowSelection: TableRowSelection<ILandingsPage> = {
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
                              landingId: selectedRowKeys,
                          })
                        : errorMessage('Failed to duplicate. No items selected');
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
                              landingId: selectedRowKeys,
                          })
                        : errorMessage('Failed to delete. No items selected');
                },
            },
        ],
    };

    return rowSelection;
};
