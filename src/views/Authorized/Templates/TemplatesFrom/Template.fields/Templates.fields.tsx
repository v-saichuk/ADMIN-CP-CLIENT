import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Col, List, Row, Space } from 'antd';
import { DeleteOutlined, FolderOutlined } from '@ant-design/icons';
import { EmptyCustome } from '../../../../../components/EmptyCustome/EmptyCustome';
import { useAppSelector } from '../../../../../store/hooks/useRedux';
import { FieldCreate } from './Field.create/Field.create';

export const TemplatesFields: FC = () => {
    const { pathname } = useLocation();

    const TEMPLATE_ID = pathname.split('/')[2];
    const SECTION_ID = pathname.split('/')[4];

    const Template = useAppSelector((state) => state.templates.TemplatesData).find(
        (template) => template._id === TEMPLATE_ID,
    );

    const Section = Template?.sections.find((field) => field._id === SECTION_ID);

    console.log('Field', Section?.fields);

    return (
        <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={24}>
                <div className="content_full_header">
                    <span>FIELDS</span>
                    <FieldCreate />
                </div>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Row gutter={[16, 5]}>
                            <EmptyCustome>
                                <List
                                    itemLayout="horizontal"
                                    style={{ width: '100%' }}
                                    pagination={{
                                        defaultPageSize: 10,
                                        hideOnSinglePage: true,
                                        showSizeChanger: false,
                                    }}
                                    dataSource={Section?.fields}
                                    renderItem={(section) => (
                                        <Col span={24} style={{ marginBottom: 5 }}>
                                            <Row
                                                className="settings_users_form__row"
                                                justify="space-between">
                                                <Row align="middle">
                                                    <FolderOutlined
                                                        style={{
                                                            marginRight: 10,
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                    {/* <Link to={`/template/section/${section._id}`}>
                                                        {section.title}
                                                    </Link> */}
                                                    Field info
                                                </Row>
                                                <Row gutter={3}>
                                                    <Space size="small">
                                                        <Button size="small">
                                                            <DeleteOutlined />
                                                        </Button>
                                                        <Button size="small">
                                                            <DeleteOutlined />
                                                        </Button>
                                                    </Space>
                                                </Row>
                                            </Row>
                                        </Col>
                                    )}
                                />
                            </EmptyCustome>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
