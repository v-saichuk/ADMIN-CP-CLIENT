import axios from '../../../../../../axios';
import { message, Modal } from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../../../../store/hooks/useRedux';
import { sectionsDelete } from '../../../../../../store/templates/templates.slice';
import { useParams } from 'react-router-dom';

const key = 'delete';

export const DeleteSection = () => {
    const { id: TEMPLATE_PAGE_ID } = useParams();
    const dispatch = useAppDispatch();

    const handleDelete = async (sectionId: string) => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/template/section/delete', {
                templateId: TEMPLATE_PAGE_ID,
                sectionId,
            });
            if (data.success) {
                dispatch(
                    sectionsDelete({
                        templateId: TEMPLATE_PAGE_ID,
                        sectionId,
                    }),
                );
                message.success({
                    content: 'Secition deleted!',
                    key,
                    duration: 2,
                });
            }
        } catch (e) {
            message.error({ content: 'Error!', key, duration: 2 });
        }
    };

    const DeleteConfirm = (sectionId: string) => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: 'Deleting a section will also delete all of its contents.',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                handleDelete(sectionId);
            },
        });
    };

    return { DeleteConfirm };
};
