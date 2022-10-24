import { FC, useState } from 'react';
import axios from '../../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import { Button, Col, Form, Input, message, Modal, Row, Select, Upload } from 'antd';
import * as Offer from '../../../../../store/offers/offers.slice';

import type { UploadProps } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

export const OffersCreate: FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const owner = useAppSelector((state) => state.offerOwner);

    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const handleCreateOfferOwner = async (props: any) => {
        setIsLoadingForm(true);
        try {
            const { data } = await axios.post('/api/offers', {
                name: props.name,
                logo: props.logo,
                offerOwner: props.offerOwner,
            });
            if (data.success) {
                setIsLoadingForm(false);
                dispatch(Offer.create(data.offer));
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

    const props: UploadProps = {
        action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        previewFile(file) {
            console.log('Your upload file:', file);
            // Your process logic. Here we just mock to the same file
            return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
                method: 'POST',
                body: file,
            })
                .then((res) => res.json())
                .then(({ thumbnail }) => thumbnail);
        },
    };

    return (
        <>
            <Button type="primary" onClick={() => setIsModal(true)} icon={<PlusOutlined />}>
                Create
            </Button>

            <Modal
                okText="Save"
                title="New Offer"
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
                            <Form.Item name="logo" initialValue={'No-logo'}>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>Upload logo</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: 'Please input name!' },
                                    { min: 3, message: 'Minimum length 3 characters' },
                                    { type: 'string', message: 'Offer name cannot be a number' },
                                ]}>
                                <Input placeholder="Name" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="offerOwner"
                                rules={[
                                    { required: true, message: 'Please select offer owner!' },
                                    { min: 3, message: 'Minimum length 3 characters' },
                                ]}>
                                <Select
                                    showSearch
                                    placeholder="Select Offer Owner"
                                    optionFilterProp="children"
                                    loading={owner.isLoading}
                                    disabled={owner.isLoading}>
                                    {owner.offerOwner.map((el) => (
                                        <Select.Option value={el._id}>{el.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
