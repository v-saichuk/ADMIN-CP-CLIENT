import { FC, useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks/useRedux';
import { Button, Col, Form, Input, message, Row } from 'antd';
import axios from '../../../../../axios';
import * as Icon from '@ant-design/icons';

interface IValue {
    new_password: string;
    confirm_new_password: string;
}

export const ChangePasswordForm: FC = () => {
    const MyProfile = useAppSelector((state) => state.auth.data);

    const [isLoading, setLoading] = useState(false);

    const fetchUserUpdate = async (values: IValue) => {
        setLoading(true);
        try {
            const { data } = await axios.patch(`/api/user/${MyProfile?._id}`, {
                password: values.new_password,
                social: {},
            });
            message.success(data.message);
            setLoading(false);
            return data;
        } catch (e) {
            message.error('An error occurred while saving data');
            setLoading(false);
            return;
        }
    };

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={fetchUserUpdate}
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
                                    prefix={<Icon.UnlockOutlined />}
                                    iconRender={(visible) =>
                                        visible ? (
                                            <Icon.EyeTwoTone />
                                        ) : (
                                            <Icon.EyeInvisibleOutlined />
                                        )
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="confirm_new_password"
                                dependencies={['new_password']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your confirm new password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('new_password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    'The two passwords that you entered do not match!',
                                                ),
                                            );
                                        },
                                    }),
                                ]}>
                                <Input.Password
                                    placeholder="Confirm new password"
                                    prefix={<Icon.UnlockOutlined />}
                                    allowClear
                                    iconRender={(visible) =>
                                        visible ? (
                                            <Icon.EyeTwoTone />
                                        ) : (
                                            <Icon.EyeInvisibleOutlined />
                                        )
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24}>
                    <Button
                        htmlType="submit"
                        loading={isLoading}
                        type="primary"
                        icon={<Icon.SaveOutlined />}>
                        Save Change
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
