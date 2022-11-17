import { FC, useState } from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import { editUser } from '../../../../../store/users/users.slice';
import axios from '../../../../../axios';
import { SaveOutlined } from '@ant-design/icons';

interface IValue {
    facebook: string;
    twitter: string;
    telegram: string;
    linkedin: string;
}

export const SocialForm: FC = () => {
    const dispatch = useAppDispatch();
    const MyProfile = useAppSelector((state) => state.auth.data);
    const [isLoading, setLoading] = useState(false);

    const fetchUserUpdate = async (values: IValue) => {
        setLoading(true);
        try {
            const { data } = await axios.patch(`/api/user/${MyProfile?._id}`, {
                social: {
                    facebook: values.facebook,
                    twitter: values.twitter,
                    telegram: values.telegram,
                    linkedin: values.linkedin,
                },
            });
            message.success(data.message);
            setLoading(false);
            dispatch(
                editUser({
                    _id: MyProfile?._id,
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
                        <Col>Social link</Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24}>
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="twitter" initialValue={MyProfile?.social.twitter}>
                                <Input addonBefore="https://" placeholder="Twitter" allowClear />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="facebook" initialValue={MyProfile?.social.facebook}>
                                <Input addonBefore="https://" placeholder="Facebook" allowClear />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="telegram" initialValue={MyProfile?.social.telegram}>
                                <Input addonBefore="https://" placeholder="Telegram" allowClear />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item name="linkedin" initialValue={MyProfile?.social.linkedin}>
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
                            icon={<SaveOutlined />}
                            type="primary">
                            Save Change
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
