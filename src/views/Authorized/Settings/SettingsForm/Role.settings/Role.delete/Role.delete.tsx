import { FC, useState } from 'react';
import { Button, message, Modal, notification } from 'antd';
import axios from '../../../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/useRedux';
import { deleteRole } from '../../../../../../store/settings/usersRole.slice';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

interface IProps {
    roleId: string;
}

export const RoleDelete: FC<IProps> = ({ roleId }) => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const [isLoading, setIsLoading] = useState(false);
    const activeUserRole = users.filter((el) => el.roleId === roleId);

    const handleDeleteRole = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.delete(`/api/roles/${roleId}`);
            if (data.success) {
                message.success('Successfully remotely');
                dispatch(deleteRole(roleId));
                setIsLoading(false);
            }
        } catch (error) {
            const {
                response: {
                    data: { message: msg },
                },
            }: any = error;
            setIsLoading(false);
            message.error(msg);
        }
    };

    const showMessage = () => {
        notification.error({
            message: 'Deletion error',
            description: `You cannot delete a role because it contains users: (${activeUserRole
                .map((el) => el.firstName)
                .join(', ')})`,
        });
    };

    const showModalDelete = () => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: `Once deleted, you will not be able to restore role`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteRole();
            },
        });
    };

    return (
        <Button
            loading={isLoading}
            size="small"
            onClick={() => (activeUserRole.length ? showMessage() : showModalDelete())}>
            <DeleteOutlined />
        </Button>
    );
};
