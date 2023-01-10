import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import * as Landing from '../../../../store/landings/landings.slice';
import * as Icon from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { Countrys } from '../../../../components/Countrys/Countrys';

const key = 'updatable';

export const LandingSettings: FC = () => {
    const dispatch = useAppDispatch();
    const { id: LANDING_PAGE_ID } = useParams();
    const LANDING = useAppSelector((state) =>
        state.landings.landingsData.find((landing) => landing._id === LANDING_PAGE_ID),
    );
    const { websites } = useAppSelector((state) => state.websites);
    const COUNTRYS = Countrys();
    const { lang } = useAppSelector((state) => state.language);
    const { offers } = useAppSelector((state) => state.offers);
    const { TemplatesData } = useAppSelector((state) => state.templates);

    const [isLoading, setLoading] = useState(false);

    const fetchUpdate = async (values: any) => {
        setLoading(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch(`/api/landing/${LANDING_PAGE_ID}`, values);

            dispatch(Landing.update(data.data));
            setLoading(false);
            message.success({ content: 'Updated!', key, duration: 2 });

            return;
        } catch (e) {
            setLoading(false);
            message.error({ content: 'Error!', key, duration: 2 });
            return;
        }
    };

    if (!LANDING) {
        return <h1>Error. NO LANDING PAGE</h1>;
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
                            <div className="content_full_header">SETTINGS</div>
                            <Row gutter={[16, 16]}>
                                {/* Name */}
                                <Col className="gutter-row" span={24} md={{ span: 24 }}>
                                    <Form.Item
                                        name="name"
                                        initialValue={LANDING.name}
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
                                        initialValue={LANDING.country}
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
                                            {COUNTRYS.map((cou, ind) => (
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
                                        initialValue={LANDING.language._id}
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
                                        initialValue={LANDING.website._id}
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
                                        initialValue={LANDING.offer._id}
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
                                        initialValue={LANDING.template_pack}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Language!',
                                            },
                                        ]}>
                                        <Select
                                            showSearch
                                            disabled
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
                                        initialValue={LANDING.status}
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
                                    <Form.Item name="note" initialValue={LANDING.note}>
                                        <TextArea
                                            allowClear
                                            autoSize={{ minRows: 5 }}
                                            placeholder="Note"
                                        />
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
