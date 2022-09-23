import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd';
import { IconLogin } from '../../../../assets/images/svg/svg';
import { Logo } from '../../../../components/Logo/Logo';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { fetchAuth } from '../../../../store/auth/auth.slice';

import { LockOutlined, UserOutlined } from '@ant-design/icons';

// STYLE
import './LoginPage.scss';

export const LoginPage: FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const onFinishSuccess = async (values: any) => {
        // console.log('Login =>>:', values);
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
            message.error('Невдалось авторизуватися');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }

        console.log('data =>>', data);
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
                            onFinish={onFinishSuccess}
                            onFinishFailed={onFinishFailed}
                            size="middle"
                            autoComplete="off">
                            <Form.Item
                                className="auth__form-item"
                                name="email"
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
                                    loading={isLoading}
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
