import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Input, message, Modal, Row, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/useRedux';
import * as Template from '../../../../../../store/templates/templates.slice';
import axios from '../../../../../../axios';
import { EditOutlined } from '@ant-design/icons';

interface ISectionId {
    field_name: string;
}

interface IUpdatedSectionProps {
    title: string;
}

const key = 'updatable';

export const FieldUpdate: FC<ISectionId> = ({ field_name }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const FULL_NAME = field_name.slice(0, 1).toUpperCase() + field_name.slice(1);

    // const { TemplatesData } = useAppSelector((state) => state.templates);
    // const template = TemplatesData.find((template) => template._id === TEMPLATE_PAGE_ID);
    // const section = template?.sections.find((section) => section._id === sectionId);

    const handleUpdateSection = async (props: IUpdatedSectionProps) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            // const { data } = await axios.patch('/api/template/section/action', {
            //     templateId: TEMPLATE_PAGE_ID,
            //     sectionId,
            //     ...props,
            // });
            // if (data.success) {
            //     setIsLoadingForm(false);
            //     dispatch(
            //         Template.sectionsUpdate({
            //             templateId: TEMPLATE_PAGE_ID,
            //             sectionId: data.section.id,
            //             title: data.section.title,
            //         }),
            //     );
            //     setIsModal(false);
            //     form.resetFields();
            //     message.success({ content: 'Section updated!', key, duration: 2 });
            //     return;
            // } else {
            //     setIsLoadingForm(false);
            //     message.error({ content: 'Error!', key, duration: 2 });
            // }
        } catch (e) {
            setIsLoadingForm(false);
            message.error({ content: 'Error!', key, duration: 2 });
        } finally {
            setIsLoadingForm(false);
        }
    };

    return (
        <>
            <Typography.Link onClick={() => setIsModal(true)}>{FULL_NAME}</Typography.Link>

            <Modal
                okText="Save"
                title="New Section"
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={() => setIsModal(false)}>
                {field_name}
                {/* <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleUpdateSection}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                initialValue={section?.title}
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
                </Form> */}
            </Modal>
        </>
    );
};
