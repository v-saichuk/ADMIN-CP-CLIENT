import { FC, useState } from 'react';
import axios from '../../../axios';
import { Col, Form, Input, message, Modal, Row, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useAppDispatch } from '../../../store/hooks/useRedux';

import * as Template from '../../../store/templates/templates.slice';

import { FirstUppercase } from '../../../utils/helpers/uppercase';

import { IFields } from '../../../types/index';
import { EditOutlined } from '@ant-design/icons';

interface IProps {
    field: IFields;
    sectionId: string;
    templateId: string;
    url: string;
}

interface IValue {
    name: string;
    description: string;
    text: string;
}

const key = 'update';

export const FieldTextUpdate: FC<IProps> = ({ field, templateId, sectionId, url }) => {
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
                    field_type: 'Text',
                    field_name: value.name,
                    field_description: value.description,
                },
                content: {
                    text: value.text,
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
                title="Edit Text"
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
                            <Form.Item name="text" initialValue={field.content.text}>
                                <Input placeholder="Text" size="middle" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
