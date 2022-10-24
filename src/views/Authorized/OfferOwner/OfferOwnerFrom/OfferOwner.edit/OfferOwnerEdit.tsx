import { FC, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Radio, Row } from 'antd';
import axios from '../../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import * as offerOwner from '../../../../../store/offerOwner/offerOwner.slice';

interface IOfferOwnerId {
    offerOwnerId: string;
}

const COLOR_BUTTON = [
    {
        id: '1',
        color: '#66D986',
    },
    {
        id: '2',
        color: '#FADB14',
    },
    {
        id: '3',
        color: '#14A7FA',
    },
    {
        id: '4',
        color: '#F59337',
    },
    {
        id: '5',
        color: '#F25B5B',
    },
    {
        id: '6',
        color: '#E637F5',
    },
    {
        id: '7',
        color: '#37DEF5',
    },
    {
        id: '8',
        color: '#3BF537',
    },
    {
        id: '9',
        color: '#979797',
    },
    {
        id: '10',
        color: '#56565F',
    },
    {
        id: '11',
        color: '#fff',
    },
];

export const OfferOwnerEdit: FC<IOfferOwnerId> = ({ offerOwnerId }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const stateData = useAppSelector((state) => state.offerOwner);
    const offer = stateData.offerOwner.find((el) => el._id === offerOwnerId);

    const handlePatchRole = async (props: any) => {
        setIsLoadingForm(true);
        try {
            const updatedOfferOwner = {
                _id: offerOwnerId,
                name: props.name,
                color: props.color,
            };
            const { data } = await axios.patch(
                `/api/offer-owner/${offerOwnerId}`,
                updatedOfferOwner,
            );
            if (data.success) {
                setIsLoadingForm(false);
                dispatch(offerOwner.update(updatedOfferOwner));
                message.success(data.message);
                setIsModal(false);
                return;
            } else {
                setIsLoadingForm(false);
                message.error(data.message);
            }
        } catch (e) {
            setIsLoadingForm(false);
            message.error('Виникла помилка в оновлені Offer Owner');
            console.log('Error =>', e);
        } finally {
            setIsLoadingForm(false);
        }
    };

    const onCancel = () => {
        Modal.confirm({
            title: 'Do you really want to close?',
            content: `All your changes will not be saved`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setIsModal(false);
                form.resetFields();
            },
        });
    };

    return (
        <>
            <Button loading={isLoadingForm} onClick={() => setIsModal(!isModal)}>
                <EditOutlined />
            </Button>
            <Modal
                okText="Save"
                title={`Edit Role "${offer?.name}"`}
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={onCancel}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handlePatchRole}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                initialValue={offer?.name}
                                rules={[
                                    { required: true, message: 'Please input name!' },
                                    { min: 3, message: 'Minimum length 3 characters' },
                                    {
                                        type: 'string',
                                        message: 'Offer owner name cannot be a number',
                                    },
                                ]}>
                                <Input placeholder="Name" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                initialValue={offer?.color}
                                name="color"
                                rules={[{ required: true, message: 'Please select a color!' }]}>
                                <Row justify="space-between">
                                    <Radio.Group
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>
                                        {COLOR_BUTTON.map((el) => (
                                            <Radio.Button
                                                key={el.id}
                                                value={el.color}
                                                autoFocus={el.color === offer?.color}
                                                style={{ backgroundColor: el.color }}
                                                className="settings_users_role_create_modal__button"
                                            />
                                        ))}
                                    </Radio.Group>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
