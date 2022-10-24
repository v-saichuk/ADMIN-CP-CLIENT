import { FC, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Radio, Row } from 'antd';
import { useAppDispatch } from '../../../../../store/hooks/useRedux';
import axios from '../../../../../axios';

import { PlusOutlined } from '@ant-design/icons';
import './OfferOwnerCreate.scss';
import * as offerOwner from '../../../../../store/offerOwner/offerOwner.slice';

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

export const OfferOwnerCreate: FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const handleCreateOfferOwner = async (props: any) => {
        setIsLoadingForm(true);
        try {
            const { data } = await axios.post('/api/offer-owner', {
                name: props.name,
                color: props.color,
            });
            if (data.success) {
                setIsLoadingForm(false);
                dispatch(offerOwner.create(data.offerOwner));
                setIsModal(false);
                form.resetFields();
                message.success(data.message);
                return;
            } else {
                setIsLoadingForm(false);
                message.error(data.message);
                console.log('Error', data);
            }
        } catch (e: any) {
            setIsLoadingForm(false);
            console.log('Error e =>', e);
            message.error(e.response.data[0].msg);
        } finally {
            setIsLoadingForm(false);
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setIsModal(true)} icon={<PlusOutlined />}>
                Create
            </Button>

            <Modal
                okText="Save"
                title="New Offer Owner"
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={() => setIsModal(false)}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleCreateOfferOwner}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: 'Please input name!' },
                                    { min: 3, message: 'Minimum length 3 characters' },
                                    {
                                        type: 'string',
                                        message: 'Offer Owner name cannot be a number',
                                    },
                                ]}>
                                <Input placeholder="Name" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
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
                                                className="offer_owner__color"
                                                style={{
                                                    backgroundColor: el.color,
                                                }}></Radio.Button>
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
