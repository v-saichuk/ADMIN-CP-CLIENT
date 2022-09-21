import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { FC, useState } from 'react';

export const ChangePasswordForm: FC = () => {
    const [isLoad, setLoad] = useState(false);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            console.log('Відправлено', values);
        }, 1000);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="middle"
            autoComplete="off">
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={24}>
                    <Row gutter={[16, 24]}>
                        <Col>Change Password</Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24}>
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" span={24}>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                ]}>
                                <Input.Password
                                    placeholder="Enter password"
                                    allowClear
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="new_password"
                                rules={[
                                    { required: true, message: 'Please input your new password!' },
                                    {
                                        type: 'string',
                                        min: 5,
                                        message: 'Password must be at least 5 characters',
                                    },
                                ]}>
                                <Input.Password
                                    placeholder="Enter new password"
                                    allowClear
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="confirm_new_password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your confirm new password!',
                                    },
                                ]}>
                                <Input.Password
                                    placeholder="Confirm new password"
                                    allowClear
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24}>
                    <Button htmlType="submit" loading={isLoad} type="primary">
                        Save Change
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
