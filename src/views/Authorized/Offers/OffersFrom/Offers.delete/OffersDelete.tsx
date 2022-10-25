import { FC, useState } from 'react';
import axios from '../../../../../axios';
import { Button, message, Modal } from 'antd';
import { useAppDispatch } from '../../../../../store/hooks/useRedux';
import { remove } from '../../../../../store/offers/offers.slice';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

interface IProps {
    offerId: React.Key;
}

export const OffersDelete: FC<IProps> = ({ offerId }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.delete(`/api/offers/${offerId}`);
            if (data.success) {
                message.success(data.message);
                dispatch(remove(offerId));
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

    const showModalDelete = () => {
        Modal.confirm({
            title: 'Do you really want to delete?',
            content: `Once deleted, you will not be able to restore offer`,
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
