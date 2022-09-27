import { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import ImgCrop from 'antd-img-crop';
import { Breadcrumb, Button, Col, Form, Input, Layout, message, Row, Select, Upload } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    FacebookOutlined,
    LeftOutlined,
    LinkedinOutlined,
    SendOutlined,
    TwitterOutlined,
} from '@ant-design/icons';
import './UsersCreate.scss';
import { createUser } from '../../../../../store/users/users.slice';

export const UsersCreate: FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const { Option } = Select;
    const { roles } = useAppSelector((state) => state.usersRole);
    const [selectRole, setSelectRole] = useState('');
    const [isLoad, setLoad] = useState(false);

    // SELECT ROLE
    const onChange = (value: string) => {
        setSelectRole(value);
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

    const onFinish = (values: any) => {
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            dispatch(
                createUser({
                    id: uuid(),
                    avatar: 'avatar_url',
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    roleId: selectRole,
                    social: {
                        facebook: values.facebook,
                        twitter: values.twitter,
                        telegram: values.telegram,
                        linkedin: values.linkedin,
                    },
                    password: values.password,
                }),
            );

            navigation('/users');
        }, 1000);
    };

    const onFinishFailed = () => {
        message.error('Failed to save. Please check that the fields are filled in correctly.');
    };

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                    <Button
                        icon={<LeftOutlined />}
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                                                required: true,
                                                message: 'Please input your First Name!',
                                            },
                                            {
                                                type: 'string',
                                                pattern: /^[^\s][a-zA-Zа-яА-Я\s]*$/,
                                                warningOnly: true,
                                                message: 'Invalid First Name',
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
                                                required: true,
                                                message: 'Please input your Last Name!',
                                            },
                                            {
                                                type: 'string',
                                                pattern: /^[^\s][a-zA-Zа-яА-Я\s]*$/,
                                                warningOnly: true,
                                                message: 'Invalid Last Name',
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
                                                warningOnly: true,
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
                                            onChange={onChange}
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            {roles.map((el) => (
                                                <Option key={el._id} value={el._id}>
                                                    {el.title}
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
                                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
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
                                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
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
                                            placeholder="twitter"
                                            addonAfter={<TwitterOutlined />}
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item name="facebook" hasFeedback>
                                        <Input
                                            addonBefore="https://"
                                            placeholder="facebook"
                                            addonAfter={<FacebookOutlined />}
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item name="telegram" hasFeedback>
                                        <Input
                                            addonBefore="https://"
                                            placeholder="telegram"
                                            addonAfter={<SendOutlined />}
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item name="linkedin" hasFeedback>
                                        <Input
                                            addonBefore="https://"
                                            placeholder="linkedin"
                                            addonAfter={<LinkedinOutlined />}
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="gutter-row" span={24} md={{ span: 12 }}>
                            <Button htmlType="submit" loading={isLoad} type="primary">
                                Save Change
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Content>
        </Layout>
    );
};
