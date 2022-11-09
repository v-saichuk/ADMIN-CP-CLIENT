import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import { Breadcrumb, Button, Col, Form, Input, Layout, message, Row, Select } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import * as Website from '../../../../../store/websites/websites.slice';
import axios from '../../../../../axios';
import TextArea from 'antd/lib/input/TextArea';

import * as Icon from '@ant-design/icons';

export const WebsitesEdit: FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const { id: WEBSITE_ID } = useParams();
    const { offers } = useAppSelector((state) => state.offers);
    const { websites } = useAppSelector((state) => state.websites);
    const WEBSITE = websites.find((site) => site._id === WEBSITE_ID);

    const [isLoading, setLoading] = useState(false);
    const fetchUpdate = async (values: any) => {
        setLoading(true);
        try {
            const { data } = await axios.patch(`/api/websites/${WEBSITE_ID}`, values);
            dispatch(Website.update(data.website));
            message.success(data.message);
            setLoading(false);
            // navigation('/');
            return;
        } catch (e: any) {
            console.log('ERROR EDIT WEBSITES =>', e);
            e.response.data.map((el: any) => message.error(el.msg));
            setLoading(false);
            return;
        }
    };

    const selectBefore = (
        <Select defaultValue="http://" className="select-before">
            <Select.Option value="http://">http://</Select.Option>
            <Select.Option value="https://">https://</Select.Option>
        </Select>
    );

    if (!WEBSITE) {
        return <h1>Loading</h1>;
    }

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb className="Breadcrumb-custome">
                <Breadcrumb.Item>
                    <Button
                        icon={<Icon.LeftOutlined />}
                        type={'primary'}
                        style={{ marginRight: 10 }}
                        onClick={() => navigation('/')}
                    />
                    Website
                </Breadcrumb.Item>
                <Breadcrumb.Item>Edit</Breadcrumb.Item>
                <Breadcrumb.Item>ID:{WEBSITE_ID}</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background user_page__content user_page__main main_content"
                style={{ border: 'none' }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={fetchUpdate}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 24]}>
                        <Col className="gutter-row" span={24}>
                            <div style={{ marginBottom: 10 }}>Website information</div>
                            <Row gutter={[16, 16]}>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="url"
                                        hasFeedback
                                        initialValue={WEBSITE?.url}
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please input Website URL!',
                                            },
                                            {
                                                type: 'string',
                                                min: 2,
                                                message: 'Minimum length 2 characters',
                                            },
                                        ]}>
                                        <Input
                                            addonBefore={selectBefore}
                                            placeholder="URL"
                                            allowClear
                                        />
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="enabled"
                                        hasFeedback
                                        initialValue={WEBSITE?.enabled}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Status!',
                                            },
                                        ]}>
                                        <Select
                                            style={{ width: '100%' }}
                                            showSearch
                                            placeholder="Select status"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            <Select.Option value={true}>Active</Select.Option>
                                            <Select.Option value={false}>Deactive</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24}>
                                    <Form.Item
                                        name="offers"
                                        hasFeedback
                                        initialValue={WEBSITE?.offers.map((offer) => offer._id)}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select offers!',
                                            },
                                        ]}>
                                        <Select
                                            showSearch
                                            placeholder="Select offers"
                                            optionFilterProp="children"
                                            mode="multiple"
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            {offers.map((offer) => (
                                                <Select.Option key={offer._id} value={offer._id}>
                                                    {offer.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24}>
                                    <Form.Item
                                        name="notes"
                                        hasFeedback
                                        initialValue={WEBSITE?.notes}>
                                        <TextArea allowClear rows={4} placeholder="Notes" />
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
