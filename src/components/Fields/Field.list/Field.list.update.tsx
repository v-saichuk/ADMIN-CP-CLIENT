import { FC, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Typography } from 'antd';
import axios from '../../../axios';
import TextArea from 'antd/lib/input/TextArea';

import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

import * as Template from '../../../store/templates/templates.slice';

import { useAppDispatch } from '../../../store/hooks/useRedux';
import { IFields } from '../../../types';
import { FirstUppercase } from '../../../utils/helpers/uppercase';

interface IProps {
    field: IFields;
    sectionId: string;
    templateId: string;
    url: string;
}

interface IValue {
    name: string;
    description: string;
    list: string[];
}

const key = 'update';

export const FieldListUpdate: FC<IProps> = ({ field, templateId, sectionId, url }) => {
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
                    field_type: 'List',
                    field_name: value.name,
                    field_description: value.description,
                },
                content: {
                    list: value.list,
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
                title="Edit List"
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

                    <div>Content</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.List name="list" initialValue={field.content.list}>
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Row
                                                key={key}
                                                align="middle"
                                                justify="center"
                                                style={{ marginTop: 5 }}>
                                                <Col span={1}>🟢</Col>
                                                <Col span={22}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'item']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Missing text',
                                                            },
                                                        ]}>
                                                        <Input placeholder="Title" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={1}>
                                                    <CloseOutlined
                                                        onClick={() => remove(name)}
                                                        style={{ marginLeft: 5 }}
                                                    />
                                                </Col>
                                            </Row>
                                        ))}
                                        <Form.Item style={{ marginTop: 10 }}>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                icon={<PlusOutlined />}>
                                                Add field
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
