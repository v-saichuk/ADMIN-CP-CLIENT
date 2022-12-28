import { FC, useState } from 'react';
import { Col, Form, Input, message, Modal, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../../axios';
import * as Template from '../../../store/templates/templates.slice';

import * as SVG from '../../../assets/images/svg/svg';
import { IFieldCreateProps } from '../../../types/index';
import { useAppDispatch } from '../../../store/hooks/useRedux';

interface IValue {
    name: string;
    description: string;
    number: string;
}

const key = 'update';

export const FieldNumber: FC<IFieldCreateProps> = ({ templateId, sectionId, url }) => {
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const handleCreateFields = async (value: IValue) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.post(url, {
                templateId,
                sectionId,
                information: {
                    field_type: 'Number',
                    field_name: value.name,
                    field_description: value.description,
                },
                content: {
                    number: value.number,
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
            message.success({ content: 'Updated!', key, duration: 2 });
        } catch (e) {
            setIsLoadingForm(false);
            message.error({ content: 'Error!', key, duration: 2 });
        } finally {
            setIsLoadingForm(false);
        }
    };

    const onCancel = () => {
        form.resetFields();
        setIsModal(false);
    };

    return (
        <>
            <div className="field-create" onClick={() => setIsModal(true)}>
                <div className="field-create__content">
                    <SVG.IconNumber x={40} y={40} />
                    <span className="fields-create__title">NUMBER</span>
                </div>
            </div>

            <Modal
                okText="Save"
                title="Number"
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
                    <hr style={{ border: '1px solid #303030' }} />

                    <div style={{ marginBottom: 5 }}>Content</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="number"
                                rules={[{ required: true, message: 'Please input number!' }]}>
                                <Input type="number" placeholder="Number" size="middle" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
