import { FC, useState } from 'react';
import { Button, message, Modal } from 'antd';
import axios from '../../../../../axios';
import { useAppDispatch } from '../../../../../store/hooks/useRedux';
import * as offerOwner from '../../../../../store/offerOwner/offerOwner.slice';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

interface IProps {
    offerOwnerId: string;
}

export const OfferOwnerDelete: FC<IProps> = ({ offerOwnerId }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.delete(`/api/offer-owner/${offerOwnerId}`);
            if (data.success) {
                message.success('Successfully remotely');
                dispatch(offerOwner.remove(offerOwnerId));
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
            content: `Once deleted, you will not be able to restore offer owner`,
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
