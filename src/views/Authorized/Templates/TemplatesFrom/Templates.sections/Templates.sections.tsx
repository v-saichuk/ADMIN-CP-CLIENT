import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SectionCreate } from './Section.create/Section.create';
import { Button, Col, List, Row, Space } from 'antd';
import { DeleteOutlined, FolderOutlined } from '@ant-design/icons';
import { EmptyCustome } from '../../../../../components/EmptyCustome/EmptyCustome';
import { SectionEdit } from './Section.edit/Section.edit';
import { DeleteSection } from './Section.delete/SectionDelete';
import { useAppSelector } from '../../../../../store/hooks/useRedux';

export const TemplatesSections: FC = () => {
    const { DeleteConfirm } = DeleteSection();

    const { id: TEMPLATE_PAGE_ID } = useParams();
    const Template = useAppSelector((state) => state.templates.TemplatesData).find(
        (el) => el._id === TEMPLATE_PAGE_ID,
    );

    return (
        <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={24}>
                <div className="content_full_header">
                    <span>SECTIONS</span>
                    <SectionCreate />
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
                                    dataSource={Template?.sections}
                                    renderItem={(section) => (
                                        <Col
                                            key={section._id}
                                            span={24}
                                            style={{ marginBottom: 5 }}>
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
                                                    <Link
                                                        to={`/template/${TEMPLATE_PAGE_ID}/${section._id}`}>
                                                        {section.title}
                                                    </Link>
                                                </Row>
                                                <Row gutter={3}>
                                                    <Space size="small">
                                                        <SectionEdit sectionId={section._id} />
                                                        <Button
                                                            size="small"
                                                            onClick={() =>
                                                                DeleteConfirm(section._id)
                                                            }>
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
