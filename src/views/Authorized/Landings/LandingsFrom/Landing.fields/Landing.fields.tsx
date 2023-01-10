import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, List, Pagination, Row, Space } from 'antd';
import { EmptyCustome } from '../../../../../components/EmptyCustome/EmptyCustome';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import axios from '../../../../../axios';

import { LandingFieldCreate } from './Landing.field.create/Landing.field.create';
import { LandingFieldUpdate } from './Landing.field.update/Landing.field.update';
import { LandingFieldDelete } from './Landing.field.delete/Landing.field.delete';

import { dragAndDrop } from '../../../../../store/templates/templates.slice';

import { AnimatePresence, Reorder } from 'framer-motion';

import * as SVG from '../../../../../assets/images/svg/svg';

interface IIcon {
    id: number;
    field: string;
    icon: React.ReactNode;
}

const IconSize = {
    x: 30,
    y: 30,
    style: { marginRight: 5 },
};

const ICON: IIcon[] = [
    {
        id: 1,
        field: 'Text',
        icon: <SVG.IconText {...IconSize} />,
    },
    {
        id: 2,
        field: 'RichText',
        icon: <SVG.IconRichText {...IconSize} />,
    },
    {
        id: 3,
        field: 'Number',
        icon: <SVG.IconNumber {...IconSize} />,
    },
    {
        id: 4,
        field: 'Image',
        icon: <SVG.IconImage {...IconSize} />,
    },
    {
        id: 5,
        field: 'Link',
        icon: <SVG.IconLink {...IconSize} />,
    },
    {
        id: 6,
        field: 'Video',
        icon: <SVG.IconVideo {...IconSize} />,
    },
    {
        id: 7,
        field: 'List',
        icon: <SVG.IconList {...IconSize} />,
    },
    {
        id: 8,
        field: 'Chip',
        icon: <SVG.IconChip {...IconSize} />,
    },
    {
        id: 9,
        field: 'Question',
        icon: <SVG.IconQuestion {...IconSize} />,
    },
    {
        id: 10,
        field: 'Comment',
        icon: <SVG.IconComment {...IconSize} />,
    },
    {
        id: 11,
        field: 'Code',
        icon: <SVG.IconCode {...IconSize} />,
    },
];

export const LandingFields: FC = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const LANDING_ID = pathname.split('/')[2];
    const SECTION_ID = pathname.split('/')[3];

    const Landing = useAppSelector((state) => state.landings.landingsData).find(
        (landing) => landing._id === LANDING_ID,
    );

    const Section = Landing?.sections.find((section) => section._id === SECTION_ID);

    const [useFields, setFields] = useState(Section?.fields);

    useEffect(() => {
        setFields(Section?.fields);
    }, [Section?.fields]);

    const savePosition = async () => {
        try {
            await axios.patch('/api/landing/field/position', {
                landing_id: LANDING_ID,
                section_id: SECTION_ID,
                fields: useFields,
            });

            dispatch(
                dragAndDrop({
                    landing_id: LANDING_ID,
                    section_id: SECTION_ID,
                    fields: useFields,
                }),
            );
        } catch (e) {
            console.log('Error position fields', e);
        }
    };

    return (
        <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={24} style={{ height: 'calc(100vh - 245px)' }}>
                <div className="content_full_header">
                    <span>FIELDS</span>
                    <LandingFieldCreate />
                </div>
                <Row gutter={[16, 16]} style={{ overflow: 'scroll', height: '100%' }}>
                    <Col span={24}>
                        <Row gutter={[16, 5]}>
                            <EmptyCustome>
                                <Reorder.Group
                                    axis="y"
                                    as="div"
                                    style={{ width: '100%' }}
                                    // @ts-ignore
                                    values={useFields}
                                    onPanEnd={() => savePosition()}
                                    onReorder={(fields) => setFields(fields)}>
                                    <AnimatePresence>
                                        <List
                                            itemLayout="horizontal"
                                            style={{ width: '100%' }}
                                            // pagination={{
                                            //     defaultPageSize: 10,
                                            //     hideOnSinglePage: true,
                                            // }}
                                            dataSource={useFields}
                                            renderItem={(field) => (
                                                <Reorder.Item
                                                    key={field._id}
                                                    value={field}
                                                    whileDrag={{
                                                        scale: 1.01,
                                                        zIndex: 1,
                                                        position: 'relative',
                                                    }}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{
                                                        opacity: 0,
                                                        border: '5px solid red',
                                                    }}>
                                                    <Col
                                                        span={24}
                                                        style={{ marginBottom: 5, cursor: 'move' }}>
                                                        <Row
                                                            className="settings_users_form__row"
                                                            justify="space-between"
                                                            align="middle">
                                                            <Col
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                }}>
                                                                {ICON.map(
                                                                    (el) =>
                                                                        el.field ===
                                                                            field.field_type && (
                                                                            <span
                                                                                key={el.id}
                                                                                style={{
                                                                                    display: 'flex',
                                                                                    marginRight: 10,
                                                                                }}>
                                                                                {el.icon}
                                                                            </span>
                                                                        ),
                                                                )}
                                                                <LandingFieldUpdate field={field} />
                                                                <span
                                                                    style={{
                                                                        marginLeft: 10,
                                                                        paddingLeft: 10,
                                                                        paddingRight: 10,
                                                                        fontSize: 9,
                                                                        color: 'grey',
                                                                        textTransform: 'uppercase',
                                                                        borderLeft:
                                                                            '1px solid #80808024',
                                                                        borderRight:
                                                                            '1px solid #80808024',
                                                                    }}>
                                                                    {field.field_type}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        paddingLeft: 10,
                                                                        fontSize: 12,
                                                                    }}>
                                                                    {field.field_description}
                                                                </span>
                                                            </Col>
                                                            <Col>
                                                                <Space size="small">
                                                                    <LandingFieldDelete
                                                                        landingId={LANDING_ID}
                                                                        sectionId={SECTION_ID}
                                                                        fieldId={field._id}
                                                                    />
                                                                </Space>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Reorder.Item>
                                            )}
                                        />
                                    </AnimatePresence>
                                </Reorder.Group>
                            </EmptyCustome>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
