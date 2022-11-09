import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/useRedux';
import { Button, Col, Form, Input, message, Row } from 'antd';
import * as Legal from '../../../../../../store/legals/legalas.slice';
import TextArea from 'antd/lib/input/TextArea';
import { SafetyCertificateOutlined } from '@ant-design/icons';

export const LegalsContent: FC = () => {
    const dispatch = useAppDispatch();
    const { legalId: LEGAL_PAGE_ID } = useParams();
    const LEGAL_PAGE = useAppSelector((state) => state.legals.LegalsData).find(
        (legal) => legal._id === LEGAL_PAGE_ID,
    );
    const [isLoading, setLoading] = useState(false);

    const fetchUpdate = async (values: any) => {
        setLoading(true);
        try {
            const { data } = await axios.patch(`/api/legals/${LEGAL_PAGE_ID}`, values);
            dispatch(Legal.update(data.legal));
            message.success(data.message);
            setLoading(false);
            return;
        } catch (e: any) {
            setLoading(false);
            console.log('Error update legal page content =>', e);
            e.response.data.map((el: any) => message.error(el.msg));
            return;
        }
    };

    if (!LEGAL_PAGE) {
        return <h1>Error. NO LEGAL PAGE</h1>;
    }

    return (
        <Row gutter={[16, 24]}>
            <Col span={24} style={{ height: 'calc(100vh - 240px)', overflow: 'scroll' }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={fetchUpdate}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 24]}>
                        <Col className="gutter-row" span={24}>
                            <div style={{ marginBottom: 10 }}>Legal Content</div>
                            <Row gutter={[16, 16]}>
                                <Col className="gutter-row" span={24} md={{ span: 24 }}>
                                    <Form.Item
                                        name="title"
                                        initialValue={LEGAL_PAGE.content.title}
                                        hasFeedback
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please input title!',
                                            },
                                        ]}>
                                        <Input placeholder="Title" allowClear />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 24 }}>
                                    <Form.Item
                                        name="description"
                                        initialValue={LEGAL_PAGE.content.description}
                                        hasFeedback
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please input description!',
                                            },
                                        ]}>
                                        <TextArea
                                            rows={20}
                                            allowClear
                                            placeholder="Enter content..."
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="gutter-row" span={24} md={{ span: 12 }}>
                            <Button
                                htmlType="submit"
                                icon={<SafetyCertificateOutlined />}
                                loading={isLoading}
                                type="primary">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};
