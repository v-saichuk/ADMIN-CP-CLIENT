import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import * as Template from '../../../../../store/templates/templates.slice';
import { Breadcrumb, Button, Col, Form, Input, Layout, message, Row, Select, Upload } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import TextArea from 'antd/lib/input/TextArea';
import type { UploadFile } from 'antd/es/upload/interface';

import * as Icon from '@ant-design/icons';

export const TemplatesCreate: FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const { lang } = useAppSelector((state) => state.language);
    const [isLoading, setLoading] = useState(false);

    const fetchCreate = async (values: any) => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/templates', values);
            dispatch(Template.create(data.template));
            message.success(data.message);
            navigation(`/templates/edit/${data.template._id}`);
            setLoading(false);
            return;
        } catch (e: any) {
            setLoading(false);
            e.response.data.map((el: any) => message.error(el.msg));
            return;
        }
    };

    const fileList: UploadFile[] = [
        // {
        //     uid: '-1',
        //     name: 'xxx.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //     thumbUrl:
        //         'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ];

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb className="Breadcrumb-custome">
                <Breadcrumb.Item>
                    <Button
                        icon={<Icon.LeftOutlined />}
                        type={'primary'}
                        style={{ marginRight: 10 }}
                        onClick={() => navigation('/templates')}
                    />
                    Templates
                </Breadcrumb.Item>
                <Breadcrumb.Item>Create</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="site-layout-background main_content offer__content">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={fetchCreate}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 24]}>
                        <Col className="gutter-row" span={24}>
                            <div style={{ marginBottom: 10 }}>Template page information</div>
                            <Row gutter={[16, 16]}>
                                <Col className="gutter-row" span={24} md={{ span: 24 }}>
                                    <Form.Item
                                        name="name"
                                        hasFeedback
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please input name!',
                                            },
                                            {
                                                type: 'string',
                                                min: 2,
                                                message: 'Minimum length 2 characters',
                                            },
                                        ]}>
                                        <Input placeholder="Name" allowClear />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="template_pack"
                                        hasFeedback
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please input template pack!',
                                            },
                                            {
                                                type: 'string',
                                                min: 2,
                                                message: 'Minimum length 2 characters',
                                            },
                                        ]}>
                                        <Input placeholder="Template Pack" allowClear />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="language"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Language!',
                                            },
                                        ]}>
                                        <Select
                                            showSearch
                                            placeholder="Select language"
                                            optionFilterProp="children"
                                            optionLabelProp="label"
                                            filterOption={(input, option: any) =>
                                                option.children.props.children[1]
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            {lang.map(
                                                (lg) =>
                                                    lg.enabled && (
                                                        <Select.Option
                                                            key={lg._id}
                                                            value={lg._id}
                                                            label={
                                                                <div className="lang-table">
                                                                    <span>{lg.icon}</span>
                                                                    {lg.title}
                                                                </div>
                                                            }>
                                                            <div className="lang-table">
                                                                <span>{lg.icon}</span>
                                                                {lg.title}
                                                            </div>
                                                        </Select.Option>
                                                    ),
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 24 }}>
                                    <Form.Item
                                        name="description"
                                        hasFeedback
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please input description',
                                            },
                                        ]}>
                                        <TextArea
                                            allowClear
                                            placeholder="Description information"
                                            autoSize={{ minRows: 3, maxRows: 20 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item name="image" hasFeedback>
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture"
                                            defaultFileList={[...fileList]}>
                                            <Button icon={<Icon.UploadOutlined />}>
                                                Upload Logo
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="gutter-row" span={24} md={{ span: 12 }}>
                            <Button
                                htmlType="submit"
                                icon={<Icon.SafetyCertificateOutlined />}
                                loading={isLoading}
                                type="primary">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Content>
        </Layout>
    );
};
