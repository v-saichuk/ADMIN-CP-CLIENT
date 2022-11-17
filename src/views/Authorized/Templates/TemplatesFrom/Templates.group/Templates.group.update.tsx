import { useState } from 'react';
import axios from '../../../../../axios';
import { useAppDispatch } from '../../../../../store/hooks/useRedux';
import { message, Modal } from 'antd';
import * as Template from '../../../../../store/templates/templates.slice';

import type { TableRowSelection } from 'antd/es/table/interface';
import * as Icon from '@ant-design/icons';

interface DataType {
    key: React.Key;
    name: string;
    language: React.ReactNode;
    template_pack: string;
    description: string;
    screenshot: string;
}
interface IGroupUpdateProps {
    action: string;
    templateId: React.Key[];
}

const error = (mes: string) => {
    message.error(mes);
};

const key = 'updatable';

export const TemplatesGroupUpdate = () => {
    const dispatch = useAppDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const selectedQuantity = !!selectedRowKeys.length && selectedRowKeys.length;

    const groupUpdate = async (props: IGroupUpdateProps) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/templates/group/update', props);
            console.log('data', data);
            if (data.success) {
                switch (props.action) {
                    case 'Duplicate':
                        // TODO: Не оновлюеця стор, не додается нова дубльвана сторінка
                        // dispatch(Legals.duplicateGroup(props.legalsId));
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
            message.error({ content: `Error! => ${e}`, key, duration: 2 });
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
                              templateId: selectedRowKeys,
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
                              templateId: selectedRowKeys,
                          })
                        : error('Failed to delete. No items selected');
                },
            },
        ],
    };

    return rowSelection;
};
