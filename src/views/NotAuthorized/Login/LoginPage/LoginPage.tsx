import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { IconLogin } from '../../../../assets/images/svg/svg';
import { Logo } from '../../../../components/Logo/Logo';
import { useAppDispatch } from '../../../../store/hooks/useRedux';
import { handlerAuth } from '../../../../store/authentication/authentication.slice';

import { LockOutlined, UserOutlined } from '@ant-design/icons';

// STYLE
import './LoginPage.scss';

export const LoginPage: FC = () => {
    const dispatch = useAppDispatch();
    const [isLoad, setLoad] = useState(false);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            dispatch(handlerAuth(true));
        }, 1000);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <section>
            <Logo boxClass={['logo__auth']} />
            <div className="auth">
                <div className="auth__wrapper">
                    <div className="auth__logo">
                        <IconLogin />
                    </div>
                    <div className="auth__form">
                        <h2 className="auth__title">Login</h2>
                        <Form
                            name="basic"
                            wrapperCol={{ span: 24 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            size="middle"
                            autoComplete="off">
                            <Form.Item
                                className="auth__form-item"
                                name="username"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid E-mail' },
                                ]}>
                                <Input prefix={<UserOutlined />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                className="auth__form-item"
                                name="password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                ]}>
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                            </Form.Item>
                            <Row justify="space-between">
                                <Col>
                                    <Form.Item name="remember" valuePropName="checked">
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item>
                                        <Link to="/reset-password">Forgot your password?</Link>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item className="auth__button">
                                <Button
                                    loading={isLoad}
                                    type="primary"
                                    htmlType="submit"
                                    size="middle"
                                    style={{ width: '100%' }}>
                                    Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};
