import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useAppDispatch } from '../../../../../../store/hooks/useRedux';
import { editUser } from '../../../../../../store/users/users.slice';

export const UsersChangePassword: FC = () => {
    const dispatch = useAppDispatch();
    const { userId } = useParams();
    const [isLoad, setLoad] = useState(false);

    const onFinish = (values: any) => {
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            dispatch(
                editUser({
                    id: userId,
                    password: values.new_password,
                }),
            );
        }, 1000);
    };

    const onFinishFailed = () => {
        message.error('Failed to save. Please check that the fields are filled in correctly.');
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
