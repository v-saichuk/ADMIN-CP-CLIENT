import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import axios from '../../../../../axios';
import * as Legals from '../../../../../store/legals/legalas.slice';
import { Badge, Breadcrumb, Button, Col, Form, Input, Layout, message, Row, Select } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import * as Icon from '@ant-design/icons';

export const LegalsCreate: FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const { lang } = useAppSelector((state) => state.language);
    const { offers } = useAppSelector((state) => state.offers);
    const { offerOwner } = useAppSelector((state) => state.offerOwner);
    const { websites } = useAppSelector((state) => state.websites);
    const [isLoading, setLoading] = useState(false);

    const fetchCreate = async (values: any) => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/legals', values);
            dispatch(Legals.create(data.legal));
            message.success(data.message);
            navigation(`/legals/edit/${data.legal._id}`);
            setLoading(false);
            return;
        } catch (e: any) {
            setLoading(false);
            console.log('ERROR CREATE WEBSITES =>', e);
            e.response.data.map((el: any) => message.error(el.msg));
            return;
        }
    };

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb className="Breadcrumb-custome">
                <Breadcrumb.Item>
                    <Button
                        icon={<Icon.LeftOutlined />}
                        type={'primary'}
                        style={{ marginRight: 10 }}
                        onClick={() => navigation('/legals')}
                    />
                    Legals
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
                            <div style={{ marginBottom: 10 }}>Legal page information</div>
                            <Row gutter={[16, 16]}>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
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
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="offer"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Offer!',
                                            },
                                        ]}>
                                        <Select
                                            showSearch
                                            placeholder="Select offer"
                                            optionFilterProp="children"
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
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="offerOwner"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Offer Owner!',
                                            },
                                        ]}>
                                        <Select
                                            showSearch
                                            placeholder="Select offer owner"
                                            optionFilterProp="children"
                                            optionLabelProp="label"
                                            filterOption={(input, option: any) =>
                                                option.children.props.text
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            {offerOwner.map((owner) => (
                                                <Select.Option
                                                    key={owner._id}
                                                    value={owner._id}
                                                    label={
                                                        <Badge
                                                            color={owner.color}
                                                            text={owner.name}
                                                        />
                                                    }>
                                                    <Badge color={owner.color} text={owner.name} />
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="website"
                                        hasFeedback
                                        rules={[
                                            {
                                                type: 'string',
                                                required: true,
                                                message: 'Please select Website!',
                                            },
                                        ]}>
                                        <Select
                                            style={{ width: '100%' }}
                                            showSearch
                                            placeholder="Select website"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option!.children as unknown as string)
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            {websites.map((site) => (
                                                <Select.Option key={site._id} value={site._id}>
                                                    {site.url}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="enabled"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Status!',
                                            },
                                        ]}>
                                        <Select placeholder="Select status">
                                            <Select.Option value={true}>
                                                <Icon.CheckOutlined style={{ color: '#66d986' }} />{' '}
                                                Active
                                            </Select.Option>
                                            <Select.Option value={false}>
                                                <Icon.CloseOutlined style={{ color: '#f25b5b' }} />{' '}
                                                Deactive
                                            </Select.Option>
                                        </Select>
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
