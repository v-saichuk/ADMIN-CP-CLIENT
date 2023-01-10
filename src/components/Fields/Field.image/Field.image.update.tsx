import { FC, useState } from 'react';
import { Col, Form, Input, message, Modal, Row, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../../axios';
import { useAppDispatch } from '../../../store/hooks/useRedux';

import { IFields } from '../../../types';
import { FirstUppercase } from '../../../utils/helpers/uppercase';

interface IProps {
    field: IFields;
    main_id: string;
    section_id: string;
    request_url: string;
    fieldUpdate: any;
}

interface IValue {
    name: string;
    description: string;
    title: string;
    link: string;
    small: string;
    medium: string;
    large: string;
}

const key = 'update';

export const FieldImageUpdate: FC<IProps> = ({
    field,
    main_id,
    section_id,
    request_url,
    fieldUpdate,
}) => {
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const handleUpdateField = async (value: IValue) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch(request_url, {
                main_id,
                section_id,
                fieldId: field._id,
                information: {
                    field_type: 'Image',
                    field_name: value.name,
                    field_description: value.description,
                },
                content: {
                    title: !!value.title ? value.title : '',
                    link: !!value.link ? `https://${value.link}` : '',
                    sizes: {
                        small: !!value.small ? `https://${value.small}` : '',
                        medium: !!value.medium ? `https://${value.medium}` : '',
                        large: !!value.large ? `https://${value.large}` : '',
                    },
                },
            });

            dispatch(
                fieldUpdate({
                    main_id,
                    section_id,
                    fields: data.fields,
                }),
            );

            setIsModal(false);
            message.success({ content: 'Updated!', key, duration: 2 });
        } catch (e) {
            setIsLoadingForm(false);
            message.error({ content: 'Error!', key, duration: 2 });
        } finally {
            setIsLoadingForm(false);
        }
    };

    const onOpen = () => {
        setIsModal(true);
    };

    const onCancel = () => {
        form.resetFields();
        setIsModal(false);
    };

    return (
        <>
            <Typography.Link onClick={onOpen}>{FirstUppercase(field.field_name)}</Typography.Link>

            <Modal
                okText="Save"
                title="Edit Image"
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={onCancel}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleUpdateField}
                    size="middle"
                    autoComplete="off">
                    <div style={{ marginBottom: 5 }}>Information</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                initialValue={field.field_name}
                                rules={[{ required: true, message: 'Please input name!' }]}>
                                <Input placeholder="Name field" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="description" initialValue={field.field_description}>
                                <TextArea
                                    showCount
                                    maxLength={100}
                                    style={{ height: 50 }}
                                    placeholder="Description"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr style={{ border: '0.1px solid #303030' }} />

                    <div style={{ marginBottom: 5 }}>Content</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item name="title" initialValue={field.content.title}>
                                <Input placeholder="Title" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="link" initialValue={field.content.link?.slice(8)}>
                                <Input
                                    addonBefore="https://"
                                    placeholder="Link URL"
                                    size="middle"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ marginBottom: 5, marginTop: 10 }}>Image sizes</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="small"
                                initialValue={field.content.sizes.small?.slice(8)}>
                                <Input
                                    addonBefore="https://"
                                    placeholder="SRC (small)"
                                    size="middle"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="medium"
                                initialValue={field.content.sizes.medium?.slice(8)}>
                                <Input
                                    addonBefore="https://"
                                    placeholder="SRC (medium)"
                                    size="middle"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="large"
                                initialValue={field.content.sizes.large?.slice(8)}>
                                <Input
                                    addonBefore="https://"
                                    placeholder="SRC (large)"
                                    size="middle"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
