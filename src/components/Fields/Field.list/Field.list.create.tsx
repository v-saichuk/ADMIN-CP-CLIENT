import { FC, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import axios from '../../../axios';
import TextArea from 'antd/lib/input/TextArea';

import { ArrowLeftOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';

import * as SVG from '../../../assets/images/svg/svg';
import { IFieldCreateProps } from '../../../types/index';
import { useAppDispatch } from '../../../store/hooks/useRedux';

interface IValue {
    name: string;
    description: string;
    list: string[];
}

const key = 'update';

export const FieldListCreate: FC<IFieldCreateProps> = ({
    main_id,
    section_id,
    request_url,
    fieldCreate,
    handleModal,
}) => {
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const handleCreateFields = async (value: IValue) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.post(request_url, {
                main_id,
                section_id,
                information: {
                    field_type: 'List',
                    field_name: value.name,
                    field_description: value.description,
                },
                content: {
                    list: !!value.list ? value.list : '',
                },
            });

            const section = data.sections.find((section: any) => section._id === section_id);

            dispatch(
                fieldCreate({
                    main_id,
                    section_id,
                    fields: section?.fields,
                }),
            );

            form.resetFields();
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
        handleModal(false);
    };

    const onCancel = () => {
        form.resetFields();
        setIsModal(false);
    };

    const onBack = () => {
        setIsModal(false);
        handleModal(true);
    };

    return (
        <>
            <div className="field-create" onClick={onOpen}>
                <div className="field-create__content">
                    <SVG.IconList x={40} y={40} />
                    <span className="fields-create__title">LIST</span>
                </div>
            </div>

            <Modal
                okText="Save"
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            type="primary"
                            size="small"
                            icon={<ArrowLeftOutlined />}
                            onClick={onBack}
                        />
                        <span style={{ marginLeft: 10 }}>List</span>
                    </div>
                }
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={onCancel}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleCreateFields}
                    size="middle"
                    autoComplete="off">
                    <div style={{ marginBottom: 5 }}>Information</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input name!' }]}>
                                <Input placeholder="Name field" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="description">
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

                    <div>Content</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.List name="list">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Row
                                                key={key}
                                                align="middle"
                                                justify="center"
                                                style={{ marginTop: 5 }}>
                                                <Col span={1}>????</Col>
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
