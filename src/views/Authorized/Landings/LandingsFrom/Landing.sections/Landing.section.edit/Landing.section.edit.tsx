import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/useRedux';
import * as Template from '../../../../../../store/templates/templates.slice';
import axios from '../../../../../../axios';
import { EditOutlined } from '@ant-design/icons';

interface ISectionId {
    sectionId?: string;
}

interface IUpdatedSectionProps {
    title: string;
}

const key = 'updatable';

export const LandingSectionEdit: FC<ISectionId> = ({ sectionId }) => {
    const { id: LANDING_PAGE_ID } = useParams();
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const { landingsData } = useAppSelector((state) => state.landings);
    const landing = landingsData.find((landing) => landing._id === LANDING_PAGE_ID);
    const section = landing?.sections.find((section) => section._id === sectionId);
    const [form] = Form.useForm();

    const handleUpdateSection = async (props: IUpdatedSectionProps) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch('/api/landing/section/action', {
                landingId: LANDING_PAGE_ID,
                sectionId,
                ...props,
            });

            if (data.success) {
                setIsLoadingForm(false);
                dispatch(
                    Template.sectionsUpdate({
                        landingId: LANDING_PAGE_ID,
                        sectionId: data.section.id,
                        title: data.section.title,
                    }),
                );
                setIsModal(false);
                message.success({ content: 'Section updated!', key, duration: 2 });
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
            <Button size="small" onClick={() => setIsModal(true)}>
                <EditOutlined />
            </Button>

            <Modal
                okText="Save"
                title={`Edit Section "${section?.title}"`}
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={() => setIsModal(false)}>
                <Form
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
                                rules={[{ required: true, message: 'Please input name section!' }]}>
                                <Input placeholder="Name section" size="middle" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
