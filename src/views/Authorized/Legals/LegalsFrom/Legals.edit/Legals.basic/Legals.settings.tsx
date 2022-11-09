import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/useRedux';
import { Badge, Button, Col, Form, Input, message, Row, Select, Typography } from 'antd';
import * as Legal from '../../../../../../store/legals/legalas.slice';
import { CheckOutlined, CloseOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

export const LegalsBasic: FC = () => {
    const dispatch = useAppDispatch();
    const { legalId: LEGAL_PAGE_ID } = useParams();
    const LEGAL_PAGE = useAppSelector((state) => state.legals.LegalsData).find(
        (legal) => legal._id === LEGAL_PAGE_ID,
    );
    const { lang } = useAppSelector((state) => state.language);
    const { offers } = useAppSelector((state) => state.offers);
    const { offerOwner } = useAppSelector((state) => state.offerOwner);
    const { websites } = useAppSelector((state) => state.websites);
    const [isLoading, setLoading] = useState(false);

    const fetchUpdate = async (values: any) => {
        setLoading(true);
        try {
            const { data } = await axios.patch(`/api/legals/${LEGAL_PAGE_ID}`, values);
            dispatch(Legal.update(data.legal));
            message.success(data.message);
            setLoading(false);
            return;
        } catch (e: any) {
            setLoading(false);
            console.log('Error update legal page settings =>', e);
            e.response.data.map((el: any) => message.error(el.msg));
            return;
        }
    };

    if (!LEGAL_PAGE) {
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
                            <div style={{ marginBottom: 10 }}>Legal page information</div>
                            <Row gutter={[16, 16]}>
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="name"
                                        hasFeedback
                                        initialValue={LEGAL_PAGE?.name}
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
                                        initialValue={
                                            !LEGAL_PAGE?.language[0].enabled
                                                ? LEGAL_PAGE?.language[0].icon +
                                                  ' ' +
                                                  LEGAL_PAGE?.language[0].title
                                                : LEGAL_PAGE?.language[0]._id
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
                                <Col className="gutter-row" span={24} md={{ span: 12 }}>
                                    <Form.Item
                                        name="offer"
                                        hasFeedback
                                        initialValue={LEGAL_PAGE.offer[0]._id}
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
                                        initialValue={LEGAL_PAGE.offerOwner[0]._id}
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
                                        initialValue={LEGAL_PAGE.website[0]._id}
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
                                        initialValue={LEGAL_PAGE.enabled}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select Status!',
                                            },
                                        ]}>
                                        <Select placeholder="Select status">
                                            <Select.Option value={true}>
                                                <CheckOutlined style={{ color: '#66d986' }} />{' '}
                                                Active
                                            </Select.Option>
                                            <Select.Option value={false}>
                                                <CloseOutlined style={{ color: '#f25b5b' }} />{' '}
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
                                icon={<SafetyCertificateOutlined />}
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
