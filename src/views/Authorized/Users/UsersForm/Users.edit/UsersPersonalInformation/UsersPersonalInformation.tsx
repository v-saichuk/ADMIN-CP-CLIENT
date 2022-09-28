import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';
import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../../../store/hooks/useRedux';
import { editUser } from '../../../../../../store/users/users.slice';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import axios from '../../../../../../axios';

export const UsersPersonalInformation: FC = () => {
    const dispatch = useAppDispatch();
    const { userId } = useParams();
    const { Option } = Select;
    const { roles } = useAppSelector((state) => state.usersRole);
    const user = useAppSelector((state) => state.users.users.find((el) => el._id === userId));
    const userRole = roles.find((el) => el._id === user?.roleId);
    const [selectRole, setSelectRole] = useState(userRole?._id);
    const [isLoading, setLoading] = useState(false);

    const fetchUserUpdate = async (values: any) => {
        setLoading(true);
        try {
            const { data } = await axios.patch(`/api/user/${userId}`, {
                // avatarUrl: 'http://safdf.com/asdf/asdf',
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                roleId: selectRole,
                social: {},
            });
            message.success(data.message);
            setLoading(false);
            dispatch(
                editUser({
                    _id: userId,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    roleId: selectRole,
                    // avatar: user.avatar,
                }),
            );
            return data;
        } catch (e: any) {
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
                                initialValue={user?.firstName}
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
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="lastName"
                                hasFeedback
                                initialValue={user?.lastName}
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
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="email"
                                initialValue={user?.email}
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
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="role"
                                initialValue={userRole?.title}
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
                </Col>
                <Col className="gutter-row" span={24}>
                    <Button htmlType="submit" loading={isLoading} type="primary">
                        Save Change
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
