import axios from '../../../../../../axios';
import { message, Modal } from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../../../store/hooks/useRedux';
import * as TemplateField from '../../../../../../store/templates/templates.slice';

const key = 'delete';

interface IProps {
    templateId: string;
    sectionId: string;
    fieldId: string;
}

export const FieldDelete = () => {
    const dispatch = useAppDispatch();

    const handleDelete = async ({ templateId, sectionId, fieldId }: IProps) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/template/field/delete/', {
                templateId,
                sectionId,
                fieldId,
            });

            if (data.success) {
                dispatch(TemplateField.fieldDelete({ templateId, sectionId, fieldId }));
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

    const DeleteConfirm = ({ templateId, sectionId, fieldId }: IProps) => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: "Once deleted, you can't restore",
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                handleDelete({ templateId, sectionId, fieldId });
            },
        });
    };

    return { DeleteConfirm };
};
