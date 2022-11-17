import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useAppDispatch } from '../../../../../../store/hooks/useRedux';
import axios from '../../../../../../axios';

import { PlusOutlined } from '@ant-design/icons';

export const SectionCreate: FC = () => {
    const { id: TEMPLATE_PAGE_ID } = useParams();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const handleCreateOfferOwner = async (props: any) => {
        setIsLoadingForm(true);
        try {
            const { data } = await axios.post('/api/sections', {
                title: props.title,
                template: TEMPLATE_PAGE_ID,
            });

            console.log('data=>>>>', data);
            // if (data.success) {
            //     setIsLoadingForm(false);
            //     // dispatch(offerOwner.create(data.offerOwner));
            //     setIsModal(false);
            //     form.resetFields();
            //     message.success(data.message);
            //     return;
            // } else {
            //     setIsLoadingForm(false);
            //     message.error(data.message);
            // }
        } catch (e: any) {
            setIsLoadingForm(false);
            message.error(e.response.data[0].msg);
        } finally {
            setIsLoadingForm(false);
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setIsModal(true)} icon={<PlusOutlined />}>
                Add
            </Button>

            <Modal
                okText="Save"
                title="New Section"
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
                                name="title"
                                rules={[
                                    { required: true, message: 'Please input title!' },
                                    { min: 3, message: 'Minimum length 3 characters' },
                                    {
                                        type: 'string',
                                        message: 'Section title cannot be a number',
                                    },
                                ]}>
                                <Input placeholder="Title" size="middle" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
