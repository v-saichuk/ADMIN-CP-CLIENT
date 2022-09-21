import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { IconPwReset } from '../../../../assets/images/svg/svg';
import { Logo } from '../../../../components/Logo/Logo';

import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';

// STYLES
import './ResetPasswordPage.scss';

export const ResetPasswordPage: FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                        <IconPwReset />
                    </div>
                    <div className="auth__form">
                        <h2 className="auth__title">Forget Your Password?</h2>
                        <p className="auth__description">
                            Forget your password? No need to worry. Tell us your email and we will
                            send your password.
                        </p>
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
                                <Input prefix={<UserOutlined />} placeholder="Email Address" />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="middle"
                                    style={{ width: '100%' }}>
                                    Send password
                                </Button>
                            </Form.Item>
                            <Form.Item className="auth__button">
                                <Link to="/">
                                    <ArrowLeftOutlined /> Go back to sign in
                                </Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};
