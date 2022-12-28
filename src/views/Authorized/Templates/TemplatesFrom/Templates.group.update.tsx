import { useState } from 'react';
import axios from '../../../../axios';
import { useAppDispatch } from '../../../../store/hooks/useRedux';
import { message, Modal } from 'antd';
import * as Template from '../../../../store/templates/templates.slice';

import type { TableRowSelection } from 'antd/es/table/interface';
import * as Icon from '@ant-design/icons';
import { ITemplatesPage } from '../../../../types';

interface IGroupUpdateProps {
    action: string;
    templateId: React.Key[];
}

const errorMessage = (msg: string) => message.error(msg);

const key = 'updatable';

export const TemplatesGroupUpdate = () => {
    const dispatch = useAppDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const selectedQuantity = !!selectedRowKeys.length && selectedRowKeys.length;

    const groupUpdate = async (props: IGroupUpdateProps) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/templates/group/update', props);

            if (data.success) {
                switch (props.action) {
                    case 'Duplicate':
                        // TODO: Не оновлюеця стор, не додается нова дубльвана сторінка
                        dispatch(Template.duplicateGroup(data.templates));
                        break;
                    case 'Delete':
                        dispatch(Template.removeGroup(props.templateId));
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

    const rowSelection: TableRowSelection<ITemplatesPage> = {
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
                              templateId: selectedRowKeys,
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
                              templateId: selectedRowKeys,
                          })
                        : errorMessage('Failed to delete. No items selected');
                },
            },
        ],
    };

    return rowSelection;
};
