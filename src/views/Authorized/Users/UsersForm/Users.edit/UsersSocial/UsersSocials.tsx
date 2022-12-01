import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/useRedux';
import { editUser } from '../../../../../../store/users/users.slice';
import axios from '../../../../../../axios';
import { SaveOutlined } from '@ant-design/icons';

interface IValue {
    facebook: string;
    twitter: string;
    telegram: string;
    linkedin: string;
}

const key = 'updatable';

export const UsersSocial: FC = () => {
    const dispatch = useAppDispatch();
    const { userId } = useParams();
    const [isLoading, setLoading] = useState(false);
    const user = useAppSelector((state) =>
        state.users.users.find((el) => userId && el._id === userId),
    );

    const fetchUserUpdate = async (values: IValue) => {
        setLoading(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch(`/api/user/${userId}`, {
                social: {
                    facebook: values.facebook,
                    twitter: values.twitter,
                    telegram: values.telegram,
                    linkedin: values.linkedin,
                },
            });
            message.success({ content: 'User created successfully!', key, duration: 2 });
            setLoading(false);
            dispatch(
                editUser({
                    _id: userId,
                    social: {
                        facebook: values.facebook,
                        twitter: values.twitter,
                        telegram: values.telegram,
                        linkedin: values.linkedin,
                    },
                }),
            );
            return data;
        } catch (e) {
            message.error({ content: 'Error!', key, duration: 2 });
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
                        <Col>Social link</Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24}>
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="twitter" initialValue={user?.social.twitter}>
                                <Input addonBefore="https://" placeholder="Twitter" allowClear />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="facebook" initialValue={user?.social.facebook}>
                                <Input addonBefore="https://" placeholder="Facebook" allowClear />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="telegram" initialValue={user?.social.telegram}>
                                <Input addonBefore="https://" placeholder="Telegram" allowClear />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="linkedin" initialValue={user?.social.linkedin}>
                                <Input addonBefore="https://" placeholder="Linkedin" allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24}>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            loading={isLoading}
                            type="primary"
                            icon={<SaveOutlined />}>
                            Save Change
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
