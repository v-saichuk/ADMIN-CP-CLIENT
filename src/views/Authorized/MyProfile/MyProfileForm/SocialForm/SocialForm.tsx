import { FC, useState } from 'react';
import { Button, Col, Form, Input, Row, message } from 'antd';

export const SocialForm: FC = () => {
    const [isLoad, setLoad] = useState(false);

    const onFinish = (values: any) => {
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            console.log('Відправлено', values);
            message.success('Information saved');
        }, 1000);
    };

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="middle"
            autoComplete="off">
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={24}>
                    <Row gutter={[16, 24]}>
                        <Col>Social link</Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24}>
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="twitter">
                                <Input addonBefore="https://" placeholder="linkedin" allowClear />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="facebook">
                                <Input addonBefore="https://" placeholder="linkedin" allowClear />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="telegram">
                                <Input addonBefore="https://" placeholder="linkedin" allowClear />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="Linkedin">
                                <Input addonBefore="https://" placeholder="linkedin" allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24}>
                    <Form.Item>
                        <Button htmlType="submit" loading={isLoad} type="primary">
                            Save Change
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
