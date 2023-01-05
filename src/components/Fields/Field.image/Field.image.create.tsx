import { FC, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../../axios';
import { useAppDispatch } from '../../../store/hooks/useRedux';
import * as Template from '../../../store/templates/templates.slice';
import { IFieldCreateProps } from '../../../types/index';

import * as SVG from '../../../assets/images/svg/svg';
import { ArrowLeftOutlined } from '@ant-design/icons';

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

export const FieldImageCreate: FC<IFieldCreateProps> = ({
    templateId,
    sectionId,
    url,
    handleModal,
}) => {
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const handleCreateFields = async (value: IValue) => {
        setIsLoadingForm(true);
        console.log('value=>', value);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.post(url, {
                templateId,
                sectionId,
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

            const section = data.sections.find((section: any) => section._id === sectionId);

            dispatch(
                Template.fieldCreate({
                    templateId: templateId,
                    sectionId: sectionId,
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
                    <SVG.IconImage x={40} y={40} />
                    <span className="fields-create__title">IMAGE</span>
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
                        <span style={{ marginLeft: 10 }}>Image</span>
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

                    <div style={{ marginBottom: 5 }}>Content</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item name="title">
                                <Input placeholder="Title (alt)" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="link">
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
                            <Form.Item name="small">
                                <Input
                                    addonBefore="https://"
                                    placeholder="SRC (small)"
                                    size="middle"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="medium">
                                <Input
                                    addonBefore="https://"
                                    placeholder="SRC (medium)"
                                    size="middle"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="large">
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
