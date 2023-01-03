import { FC, useState } from 'react';
import { Col, Form, Input, message, Modal, Row, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../../axios';
import { useAppDispatch } from '../../../store/hooks/useRedux';
import * as Template from '../../../store/templates/templates.slice';

import { IFields } from '../../../types/index';
import { FirstUppercase } from '../../../utils/helpers/uppercase';

const key = 'update';

interface IProps {
    field: IFields;
    sectionId: string;
    templateId: string;
    url: string;
}

interface IValue {
    name: string;
    description: string;
    fullname: string;
    avatar_url: string;
    comment: string;
}

export const FieldCommentUpdate: FC<IProps> = ({ field, templateId, sectionId, url }) => {
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const handleUpdateField = async (value: IValue) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch(url, {
                templateId,
                sectionId,
                fieldId: field._id,
                information: {
                    field_type: 'Comment',
                    field_name: value.name,
                    field_description: value.description,
                },
                content: {
                    fullname: value.fullname,
                    avatar_url: value.avatar_url,
                    comment: value.comment,
                },
            });

            dispatch(
                Template.fieldUpdate({
                    templateId: templateId,
                    sectionId: sectionId,
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
                title="Edit Comment"
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
                    <hr style={{ border: '1px solid #303030' }} />

                    <div style={{ marginBottom: 5 }}>Content</div>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item name="fullname" initialValue={field.content.fullname}>
                                <Input placeholder="Full Name" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="avatar_url" initialValue={field.content.avatar_url}>
                                <Input placeholder="Avatar" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="comment" initialValue={field.content.comment}>
                                <TextArea showCount style={{ height: 100 }} placeholder="Comment" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
