import { FC, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Badge, Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../../store/hooks/useRedux';
import { editUser } from '../../../../../store/users/users.slice';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import axios from '../../../../../axios';
import { MailOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';

interface IValue {
    email: string;
    firstName: string;
    lastName: string;
    role: React.Key;
}

export const PersonalInfoForm: FC = () => {
    const dispatch = useAppDispatch();
    const { roles } = useAppSelector((state) => state.usersRole);
    const MyProfile = useAppSelector((state) => state.auth.data);
    const userRole = roles.find((el) => el._id === MyProfile?.roleId);
    const [isLoading, setLoading] = useState(false);

    const fetchUserUpdate = async (values: IValue) => {
        setLoading(true);
        try {
            const { data } = await axios.patch(`/api/user/${MyProfile?._id}`, {
                // avatarUrl: 'http://safdf.com/asdf/asdf',
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                roleId: values.role,
                social: {},
            });
            message.success(data.message);
            setLoading(false);
            dispatch(
                editUser({
                    _id: MyProfile?._id,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    roleId: values.role,
                    // avatar: user.avatar,
                }),
            );
            return data;
        } catch (e: any) {
            message.error('An error occurred while saving data');
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
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={fetchUserUpdate}
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
                    <Row gutter={[16, 16]}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="firstName"
                                hasFeedback
                                initialValue={MyProfile?.firstName}
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
                                <Input
                                    placeholder="First Name"
                                    prefix={<UserOutlined />}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="lastName"
                                hasFeedback
                                initialValue={MyProfile?.lastName}
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
                                <Input
                                    placeholder="Last Name"
                                    prefix={<UserOutlined />}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="email"
                                initialValue={MyProfile?.email}
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
                                <Input placeholder="E-Mail" prefix={<MailOutlined />} allowClear />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={24} md={{ span: 12 }}>
                            <Form.Item
                                name="role"
                                initialValue={userRole?._id}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select Role!',
                                    },
                                ]}>
                                <Select
                                    showSearch
                                    placeholder="Select role..."
                                    optionFilterProp="children"
                                    optionLabelProp="label"
                                    loading={!userRole}
                                    filterOption={(input, option: any) =>
                                        option.children.props.text
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }>
                                    {roles.map((role) => (
                                        <Select.Option
                                            key={role._id}
                                            value={role._id}
                                            label={<Badge color={role.color} text={role.title} />}>
                                            <Badge color={role.color} text={role.title} />
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24}>
                    <Button
                        htmlType="submit"
                        loading={isLoading}
                        icon={<SaveOutlined />}
                        type="primary">
                        Save Change
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
