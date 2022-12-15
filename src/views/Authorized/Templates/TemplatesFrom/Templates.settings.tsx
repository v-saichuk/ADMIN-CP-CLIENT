import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import * as Template from '../../../../store/templates/templates.slice';
import * as Icon from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import type { UploadFile } from 'antd/es/upload/interface';

export const TemplatesSettings: FC = () => {
    const dispatch = useAppDispatch();
    const { id: TEMPLATE_PAGE_ID } = useParams();
    const TEMPLATE_PAGE = useAppSelector((state) => state.templates.TemplatesData).find(
        (template) => template._id === TEMPLATE_PAGE_ID,
    );
    const { lang } = useAppSelector((state) => state.language);
    const [isLoading, setLoading] = useState(false);

    const fetchUpdate = async (values: any) => {
        setLoading(true);
        try {
            const { data } = await axios.patch(`/api/template/${TEMPLATE_PAGE_ID}`, values);
            dispatch(Template.update(data.template));
            message.success(data.message);
            setLoading(false);
            return;
        } catch (e: any) {
            setLoading(false);
            console.log('Error update template page settings =>', e);
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

    if (!TEMPLATE_PAGE) {
        return <h1>Error. NO LEGAL PAGE</h1>;
    }

    return (
        <Row gutter={[16, 24]}>
            <Col span={24} style={{ height: 'calc(100vh - 240px)', overflow: 'scroll' }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={fetchUpdate}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 24]}>
                        <Col className="gutter-row" span={24}>
                            <div style={{ marginBottom: 10 }}>TEMPLATE SETTINGS</div>
                            <Row gutter={[16, 16]}>
                                <Col className="gutter-row" span={24} md={{ span: 24 }}>
                                    <Form.Item
                                        name="name"
                                        hasFeedback
                                        initialValue={TEMPLATE_PAGE?.name}
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
                                        initialValue={TEMPLATE_PAGE?.template_pack}
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
                                        initialValue={
                                            !TEMPLATE_PAGE?.language.enabled
                                                ? TEMPLATE_PAGE?.language.icon +
                                                  ' ' +
                                                  TEMPLATE_PAGE?.language.title
                                                : TEMPLATE_PAGE?.language._id
                                        }
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
                                        initialValue={TEMPLATE_PAGE?.description}
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
            </Col>
        </Row>
    );
};
