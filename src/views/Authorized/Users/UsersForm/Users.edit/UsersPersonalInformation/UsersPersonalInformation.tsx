import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';
import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import { useAppSelector, useAppDispatch } from '../../../../../../store/hooks/useRedux';
import { editUser } from '../../../../../../store/users/users.slice';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

export const UsersPersonalInformation: FC = () => {
    const dispatch = useAppDispatch();
    const { userId } = useParams();
    const { Option } = Select;
    const { roles } = useAppSelector((state) => state.usersRole);
    const user = useAppSelector((state) => state.users.users.find((el) => el.id === userId));
    const userRole = roles.find((el) => el._id === user?.roleId);
    const [selectRole, setSelectRole] = useState(userRole?._id);
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
                editUser({
                    id: userId,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    roleId: selectRole,
                    // avatar: user.avatar,
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
                                name="firstname"
                                hasFeedback
                                initialValue={user?.firstname}
                                rules={[
                                    { required: true, message: 'Please input your First Name!' },
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
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="lastname"
                                hasFeedback
                                initialValue={user?.lastname}
                                rules={[
                                    { required: true, message: 'Please input your Last Name!' },
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
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                name="email"
                                hasFeedback
                                initialValue={user?.email}
                                rules={[
                                    { required: true, message: 'Please input your E-Mail!' },
                                    {
                                        type: 'email',
                                        warningOnly: true,
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
                                rules={[{ required: true, message: 'Please input your Role!' }]}>
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Select a person"
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
