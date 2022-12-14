import axios from '../../../../../../axios';
import { Button, message, Modal } from 'antd';

import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../../../store/hooks/useRedux';
import * as TemplateField from '../../../../../../store/templates/templates.slice';
import { FC } from 'react';

const key = 'delete';

interface IProps {
    templateId: string;
    sectionId: string;
    fieldId: string;
}

export const FieldDelete: FC<IProps> = (props) => {
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/template/field/delete/', { ...props });

            if (data.success) {
                dispatch(TemplateField.fieldDelete({ ...props }));
                message.success({
                    content: 'Field deleted!',
                    key,
                    duration: 2,
                });
            }
        } catch (e) {
            message.error({ content: 'Error!', key, duration: 2 });
        }
    };

    const DeleteConfirm = () => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: "Once deleted, you can't restore",
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                handleDelete();
            },
        });
    };

    return (
        <Button size="small" onClick={() => DeleteConfirm()}>
            <CloseOutlined />
        </Button>
    );
};
