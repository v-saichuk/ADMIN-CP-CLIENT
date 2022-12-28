import { FC, useState } from 'react';
import { Col, Form, Input, message, Modal, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../../axios';
import { useAppDispatch } from '../../../store/hooks/useRedux';
import * as Template from '../../../store/templates/templates.slice';

import * as SVG from '../../../assets/images/svg/svg';

import { IFieldCreateProps } from '../../../types/index';

const key = 'update';

interface IValue {
    name: string;
    description: string;
    fullname: string;
    avatar_url: string;
    comment: string;
}

export const FieldComment: FC<IFieldCreateProps> = ({ templateId, sectionId, url }) => {
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
                    <SVG.IconComment x={40} y={40} />
                    <span className="fields-create__title">COMMENT</span>
                </div>
            </div>

            <Modal
                okText="Save"
                title="Comment"
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
                        <Col span={12}>
                            <Form.Item
                                name="fullname"
                                rules={[{ required: true, message: 'Please input Full Name!' }]}>
                                <Input placeholder="Full Name" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="avatar_url"
                                rules={[{ required: true, message: 'Please input Avatar url!' }]}>
                                <Input placeholder="Avatar" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="comment"
                                rules={[{ required: true, message: 'Please input Comment!' }]}>
                                <TextArea showCount style={{ height: 100 }} placeholder="Comment" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
