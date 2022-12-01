import { FC, useState } from 'react';
import axios from '../../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import { Badge, Button, Col, Form, Input, message, Modal, Row, Select, Upload } from 'antd';
import * as Offer from '../../../../../store/offers/offers.slice';

import type { UploadProps } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

interface ICreateOfferProps {
    logo: string;
    name: string;
    offerOwner: string;
}

const key = 'updatable';

export const OffersCreate: FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const owner = useAppSelector((state) => state.offerOwner);

    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const handleCreateOffer = async (props: ICreateOfferProps) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.post('/api/offers', {
                name: props.name,
                logo: props.logo,
                offerOwner: props.offerOwner,
            });
            setIsLoadingForm(false);
            dispatch(Offer.create(data.offer));
            setIsModal(false);
            form.resetFields();
            message.success({ content: 'Offer created!', key, duration: 2 });
        } catch (e) {
            setIsLoadingForm(false);
            message.error({ content: 'Error!', key, duration: 2 });
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
                    onFinish={handleCreateOffer}
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
                                    disabled={owner.isLoading}
                                    filterOption={(input, option: any) =>
                                        option.children.props.text
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }>
                                    {owner.offerOwner.map((owner) => (
                                        <Select.Option
                                            key={owner._id}
                                            value={owner._id}
                                            label={<Badge color={owner.color} text={owner.name} />}>
                                            <Badge color={owner.color} text={owner.name} />
                                        </Select.Option>
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
