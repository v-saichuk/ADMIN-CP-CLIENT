import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import * as Template from '../../../../store/templates/templates.slice';
import { Content } from 'antd/lib/layout/layout';
import { Breadcrumb, Button, Col, Form, Input, Layout, message, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Counters } from '../../../../components/Counters/Counters';

import * as Icon from '@ant-design/icons';

interface IValueForm {
    name: string;
    country: string[];
    language: string;
    website: string;
    offer: string;
    template_pack: string;
    status: boolean;
    note: string;
}

export const LandingCreate: FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const { websites } = useAppSelector((state) => state.websites);
    const { lang } = useAppSelector((state) => state.language);
    const { offers } = useAppSelector((state) => state.offers);
    const { TemplatesData } = useAppSelector((state) => state.templates);
    const COUNTERS = Counters();

    const [isLoading, setLoading] = useState(false);

    const fetchCreate = async (values: IValueForm) => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/landing', values);
            console.log('data =>>>', data);
            // dispatch(Template.create(data.template));
            message.success(data.message);
            // navigation(`/template/${data.template._id}`);
            setLoading(false);
            return;
        } catch (e: any) {
            setLoading(false);
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
                        onClick={() => navigation('/landings')}
                    />
                    Landing
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
                                {/* Name */}
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

                                {/* Country */}
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="country"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Country!',
                                            },
                                        ]}>
                                        <Select
                                            showSearch
                                            placeholder="Select Country"
                                            optionFilterProp="children"
                                            optionLabelProp="label"
                                            mode="multiple"
                                            filterOption={(input, option: any) =>
                                                option.children.props.children[1]
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            {COUNTERS.map((cou, ind) => (
                                                <Select.Option
                                                    key={ind}
                                                    value={cou.flag + ' ' + cou.title}
                                                    label={
                                                        <div className="lang-table">
                                                            <span>{cou.flag}</span>
                                                            {cou.title}
                                                        </div>
                                                    }>
                                                    <div className="lang-table">
                                                        <span>{cou.flag}</span>
                                                        {cou.title}
                                                    </div>
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                {/* Language */}
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
                                            placeholder="Select Language"
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

                                {/* Website */}
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
                                            placeholder="Select Website"
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

                                {/* Offer */}
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
                                            placeholder="Select Offer"
                                            optionFilterProp="children"
                                            optionLabelProp="label"
                                            filterOption={(input, option: any) =>
                                                option.children.props.children[2]
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            {offers.map((offer) => (
                                                <Select.Option
                                                    key={offer._id}
                                                    value={offer._id}
                                                    label={
                                                        <>
                                                            <Icon.StarOutlined
                                                                style={{ color: 'orange' }}
                                                            />{' '}
                                                            {offer.name}
                                                        </>
                                                    }>
                                                    <>
                                                        <Icon.StarOutlined
                                                            style={{ color: 'orange' }}
                                                        />{' '}
                                                        {offer.name}
                                                    </>
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                {/* Template Pack */}
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="template_pack"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Language!',
                                            },
                                        ]}>
                                        <Select
                                            showSearch
                                            placeholder="Select Template Pack"
                                            optionFilterProp="children"
                                            optionLabelProp="label"
                                            filterOption={(input, option: any) =>
                                                option.children.props.children[1]
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }>
                                            {TemplatesData.map((template) => (
                                                <Select.Option
                                                    key={template._id}
                                                    value={template._id}
                                                    label={
                                                        <div className="lang-table">
                                                            {template.template_pack}
                                                        </div>
                                                    }>
                                                    <div className="lang-table">
                                                        {template.template_pack}
                                                    </div>
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                {/* Statuts */}
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="status"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Status!',
                                            },
                                        ]}>
                                        <Select placeholder="Select Status">
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

                                {/* Note */}
                                <Col className="gutter-row" span={24} md={{ span: 24 }}>
                                    <Form.Item name="note" hasFeedback>
                                        <TextArea allowClear placeholder="Note" />
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
