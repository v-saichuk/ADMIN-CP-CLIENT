import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import ImgCrop from 'antd-img-crop';
import { Breadcrumb, Button, Col, Form, Input, Layout, message, Row, Select, Upload } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { createUser } from '../../../../../store/users/users.slice';
import axios from '../../../../../axios';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import * as Icon from '@ant-design/icons';
import './UserCreate.scss';

export const UserCreate: FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const { Option } = Select;
    const { roles } = useAppSelector((state) => state.usersRole);
    const [selectRole, setSelectRole] = useState('');
    const [isLoading, setLoading] = useState(false);

    const fetchCreateUser = async (values: any) => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/user', {
                avatar: 'http://avatar.com.ua/ter332/sad.png',
                firstName: values.firstname,
                lastName: values.lastname,
                email: values.email,
                roleId: selectRole,
                social: {
                    facebook: values.facebook,
                    twitter: values.twitter,
                    telegram: values.telegram,
                    linkedin: values.linkedin,
                },
                password: values.password,
            });
            dispatch(createUser(data));
            setLoading(false);
            navigation('/users');
            message.success('User successfully created!');
            return data;
        } catch (e: any) {
            console.log('ERROR CREATE USER =>', e);
            message.error(e.response.data.message);
            setLoading(false);
            return;
        }
    };

    // AVATAR
    const [fileList, setFileList] = useState<UploadFile[]>([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);

    const onChangeAvatar: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    // ./AVATAR

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                    <Button
                        icon={<Icon.LeftOutlined />}
                        type={'primary'}
                        style={{ marginRight: 10 }}
                        onClick={() => navigation('/users')}
                    />
                    New User
                </Breadcrumb.Item>
            </Breadcrumb>
            <Content className="site-layout-background user_page__content user_page__main">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={fetchCreateUser}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 24]}>
                        <Col className="gutter-row" span={24}>
                            <Row gutter={[16, 24]}>
                                <Col className="gutter-row">
                                    <ImgCrop rotate modalTitle="Edit Avatar" modalOk="Save">
                                        <Upload
                                            accept="jpeg jpg png"
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChangeAvatar}
                                            onPreview={onPreview}>
                                            {fileList.length < 1 && '+ Upload'}
                                        </Upload>
                                    </ImgCrop>
                                </Col>
                                <Col>Allowed JPG or PNG. Max size of 800kB</Col>
                            </Row>
                        </Col>
                        <Col className="gutter-row" span={24}>
                            <div style={{ marginBottom: 10 }}>Personal information</div>
                            <Row gutter={[16, 16]}>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="firstname"
                                        hasFeedback
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please input your First Name!',
                                            },
                                            {
                                                type: 'string',
                                                pattern: /^[^\s][a-zA-Zа-яА-Я\s]*$/,
                                                message: 'Invalid First Name',
                                            },
                                            {
                                                type: 'string',
                                                min: 2,
                                                message: 'Minimum length 2 characters',
                                            },
                                        ]}>
                                        <Input placeholder="First Name" allowClear />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="lastname"
                                        hasFeedback
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please input your Last Name!',
                                            },
                                            {
                                                type: 'string',
                                                pattern: /^[^\s][a-zA-Zа-яА-Я\s]*$/,
                                                message: 'Invalid Last Name',
                                            },
                                            {
                                                type: 'string',
                                                min: 2,
                                                message: 'Minimum length 2 characters',
                                            },
                                        ]}>
                                        <Input placeholder="Last Name" allowClear />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="email"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your E-Mail!',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Please enter a valid E-mail',
                                            },
                                        ]}>
                                        <Input placeholder="E-Mail" allowClear />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="role"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Role!',
                                            },
                                        ]}>
                                        <Select
                                            style={{ width: '100%' }}
                                            showSearch
                                            placeholder="Select a role"
                                            optionFilterProp="children"
                                            onChange={(value) => setSelectRole(value)}
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            {roles.map((role) => (
                                                <Option key={role._id} value={role._id}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}>
                                                        <span
                                                            className="search_dot"
                                                            style={{
                                                                backgroundColor: role.color,
                                                            }}></span>
                                                        {role.title}
                                                    </div>
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div style={{ marginBottom: 10, marginTop: 20 }}>
                                Password information
                            </div>
                            <Row gutter={[16, 16]}>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your new password!',
                                            },
                                            {
                                                type: 'string',
                                                min: 5,
                                                message: 'Password must be at least 5 characters',
                                            },
                                        ]}>
                                        <Input.Password
                                            placeholder="Password"
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
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="confirm_password"
                                        dependencies={['password']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your confirm new password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (
                                                        !value ||
                                                        getFieldValue('password') === value
                                                    ) {
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
                                            placeholder="Confirm password"
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
                            <div style={{ marginBottom: 10, marginTop: 20 }}>
                                Social information
                            </div>
                            <Row gutter={[16, 16]}>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item name="twitter" hasFeedback>
                                        <Input
                                            addonBefore="https://"
                                            placeholder="Twitter"
                                            addonAfter={<Icon.TwitterOutlined />}
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item name="facebook" hasFeedback>
                                        <Input
                                            addonBefore="https://"
                                            placeholder="Facebook"
                                            addonAfter={<Icon.FacebookOutlined />}
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item name="telegram" hasFeedback>
                                        <Input
                                            addonBefore="https://"
                                            placeholder="Telegram"
                                            addonAfter={<Icon.SendOutlined />}
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item name="linkedin" hasFeedback>
                                        <Input
                                            addonBefore="https://"
                                            placeholder="Linkedin"
                                            addonAfter={<Icon.LinkedinOutlined />}
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="gutter-row" span={24} md={{ span: 12 }}>
                            <Button
                                htmlType="submit"
                                icon={<Icon.SafetyOutlined />}
                                loading={isLoading}
                                type="primary">
                                Create user
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Content>
        </Layout>
    );
};
