import { FC, useState } from 'react';
import axios from '../../../../../axios';
import { Button, message, Modal } from 'antd';
import { useAppDispatch } from '../../../../../store/hooks/useRedux';
import { remove } from '../../../../../store/offers/offers.slice';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

interface IProps {
    offerId: React.Key;
}

const key = 'Deleted';

export const OffersDelete: FC<IProps> = ({ offerId }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        message.loading({ content: 'Loading...', key });
        setIsLoading(true);
        try {
            const { data } = await axios.delete(`/api/offers/${offerId}`);
            if (data.success) {
                dispatch(remove(offerId));
                setIsLoading(false);
                message.success({ content: 'Offer deleted!', key, duration: 2 });
            }
        } catch (error) {
            setIsLoading(false);
            message.error({ content: 'Error!', key, duration: 2 });
        }
    };

    const showModalDelete = () => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: 'Once deleted, you will not be able to restore offer',
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
        <Button loading={isLoading} onClick={showModalDelete}>
            <DeleteOutlined />
        </Button>
    );
};
