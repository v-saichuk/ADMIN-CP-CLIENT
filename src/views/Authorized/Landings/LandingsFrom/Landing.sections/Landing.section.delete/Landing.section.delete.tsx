import { FC } from 'react';
import axios from '../../../../../../axios';
import { Button, message, Modal } from 'antd';
import { useAppDispatch } from '../../../../../../store/hooks/useRedux';
import { sectionsDelete } from '../../../../../../store/templates/templates.slice';

import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

interface IProps {
    landing_id: string | undefined;
    section_id: string;
}

const key = 'delete';

export const LandingSectionDelete: FC<IProps> = ({ landing_id, section_id }) => {
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/landing/section/delete', {
                landingId: landing_id,
                sectionId: section_id,
            });
            if (data.success) {
                dispatch(
                    sectionsDelete({
                        landingId: landing_id,
                        sectionId: section_id,
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

    const DeleteConfirm = () => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: 'Deleting a section will also delete all of its contents.',
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
            <DeleteOutlined />
        </Button>
    );
};
