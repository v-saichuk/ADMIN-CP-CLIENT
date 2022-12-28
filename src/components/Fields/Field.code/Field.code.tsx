import { FC, useState } from 'react';
import { Col, Form, Input, message, Modal, Row } from 'antd';
import { useAppDispatch } from '../../../store/hooks/useRedux';
import axios from '../../../axios';
import TextArea from 'antd/lib/input/TextArea';
import * as Template from '../../../store/templates/templates.slice';

import { IFieldCreateProps } from '../../../types/index';
import * as SVG from '../../../assets/images/svg/svg';

const key = 'update';

interface IValue {
    name: string;
    description: string;
    code: string;
}

export const FieldCode: FC<IFieldCreateProps> = ({ templateId, sectionId, url }) => {
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
                    field_type: 'Code',
                    field_name: value.name,
                    field_description: value.description,
                },
                content: {
                    code: value.code,
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
                    <SVG.IconCode x={40} y={40} />
                    <span className="fields-create__title">CODE</span>
                </div>
            </div>

            <Modal
                okText="Save"
                title="Code"
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
                                name="code"
                                rules={[{ required: true, message: 'Please input Code!' }]}>
                                <TextArea showCount style={{ height: 300 }} placeholder="Code" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
