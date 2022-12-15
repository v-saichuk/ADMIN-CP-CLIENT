import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useAppDispatch } from '../../../../../../store/hooks/useRedux';
import * as Template from '../../../../../../store/templates/templates.slice';
import axios from '../../../../../../axios';

import { PlusOutlined } from '@ant-design/icons';

interface ICreatedSectionProps {
    title: string;
}

const key = 'updatable';

export const SectionCreate: FC = () => {
    const { id: TEMPLATE_PAGE_ID } = useParams();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const handleCreateSection = async (props: ICreatedSectionProps) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.post('/api/template/section/action', {
                templateId: TEMPLATE_PAGE_ID,
                ...props,
                fields: [],
            });

            if (data.success) {
                setIsLoadingForm(false);
                dispatch(
                    Template.sectionCreate({
                        templateId: TEMPLATE_PAGE_ID,
                        sections: data.sections,
                    }),
                );
                setIsModal(false);
                form.resetFields();
                message.success({ content: 'Section created!', key, duration: 2 });
                return;
            } else {
                setIsLoadingForm(false);
                message.error({ content: 'Error!', key, duration: 2 });
            }
        } catch (e) {
            setIsLoadingForm(false);
            message.error({ content: 'Error!', key, duration: 2 });
        } finally {
            setIsLoadingForm(false);
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setIsModal(true)} icon={<PlusOutlined />}>
                Add Section
            </Button>

            <Modal
                okText="Save"
                title="New Section"
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={() => setIsModal(false)}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleCreateSection}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
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
                </Form>
            </Modal>
        </>
    );
};
