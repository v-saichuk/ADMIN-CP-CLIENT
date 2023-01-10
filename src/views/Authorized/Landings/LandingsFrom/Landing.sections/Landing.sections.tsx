import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, List, Row, Space } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

import { LandingSectionCreate } from './Landing.section.create/Landing.section.create';
import { LandingSectionEdit } from './Landing.section.edit/Landing.section.edit';
import { LandingSectionDelete } from './Landing.section.delete/Landing.section.delete';

import { EmptyCustome } from '../../../../../components/EmptyCustome/EmptyCustome';
import { useAppSelector } from '../../../../../store/hooks/useRedux';

export const LandingSections: FC = () => {
    const { id: LANDING_PAGE_ID } = useParams();
    const Landing = useAppSelector((state) => state.landings.landingsData).find(
        (el) => el._id === LANDING_PAGE_ID,
    );

    return (
        <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={24}>
                <div className="content_full_header">
                    <span>SECTIONS</span>
                    <LandingSectionCreate />
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
                                    dataSource={Landing?.sections}
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
                                                        to={`/landing/${LANDING_PAGE_ID}/${section._id}`}>
                                                        {section.title}
                                                    </Link>
                                                </Row>
                                                <Row gutter={3}>
                                                    <Space size="small">
                                                        <LandingSectionEdit
                                                            sectionId={section._id}
                                                        />
                                                        <LandingSectionDelete
                                                            landing_id={LANDING_PAGE_ID}
                                                            section_id={section._id}
                                                        />
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
