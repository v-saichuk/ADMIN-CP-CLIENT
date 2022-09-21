import { Button, Col, Form, Input, Row, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { FC, useState } from 'react';
import { useAppSelector } from '../../../../../store/hooks/useRedux';

export const PersonalInfoForm: FC = () => {
    const { Option } = Select;
    const { roles } = useAppSelector((state) => state.usersRole);

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
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

    const [isLoad, setLoad] = useState(false);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            console.log('Відправлено', values);
        }, 1000);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
                                initialValue={'Administartor'}
                                rules={[{ required: true, message: 'Please input your Role!' }]}>
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        (option!.children as unknown as string)
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }>
                                    {roles.map((el) => (
                                        <Option key={el.id} value={el.id}>
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
