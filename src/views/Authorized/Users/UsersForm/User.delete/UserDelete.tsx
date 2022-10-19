import { FC } from 'react';
import confirm from 'antd/lib/modal/confirm';
import axios from '../../../../../axios';
import { deleteUser } from '../../../../../store/users/users.slice';
import { useAppDispatch } from '../../../../../store/hooks/useRedux';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Button } from 'antd';

interface IProps {
    userId: string;
}

const ADMINISTRATOR = '633401c1df1dec1b16e37a0c';

export const UserDelete: FC<IProps> = ({ userId }) => {
    const dispatch = useAppDispatch();

    const fetchUserDelete = async () => {
        if (ADMINISTRATOR === userId) {
            message.error('This user is not allowed to be deleted!');
            return null;
        }
        try {
            const { data } = await axios.delete(`/api/user/${userId}`);
            if (data.success) {
                dispatch(deleteUser(userId));
                message.success('Success!');
            }
            return;
        } catch (e: any) {
            return message.error(e.response.data.message);
        }
    };

    const showConfirm = () => {
        confirm({
            title: 'Do you really want to user delete?',
            content: 'Once deleted, you can no longer restore it.',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                fetchUserDelete();
            },
        });
    };

    return (
        <Button onClick={showConfirm}>
            <DeleteOutlined key="delete" />
        </Button>
    );
};
