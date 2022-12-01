import { FC } from 'react';
import axios from '../../../../../axios';
import { ILanguage } from '../../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import { Col, List, Row, Switch, Skeleton, message } from 'antd';
import * as Language from '../../../../../store/settings/language.slice';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import './LanguageSettings.scss';

const key = 'updatable';

export const LanguageSettings: FC = () => {
    const dispatch = useAppDispatch();
    const { lang, isLoading } = useAppSelector((state) => state.language);
    const handleCountry = async ([enabled, id]: [boolean, string]) => {
        message.loading({ content: 'Loading...', key });
        await axios
            .patch(`/api/language/${id}`, { enabled })
            .then(() => {
                message.success({
                    content: enabled ? 'Activated' : 'Deactivated',
                    key,
                    duration: 2,
                });
                dispatch(
                    Language.update({
                        id,
                        enabled,
                    }),
                );
            })
            .catch((e) => {
                message.error({ content: 'Error!', key, duration: 2 });
            });
    };

    const fakeDataLang = Array.from({ length: 55 }).map(
        (_, i): ILanguage => ({
            _id: String(i),
            title: '',
            icon: '',
            enabled: false,
        }),
    );

    return (
        <Row gutter={[16, 24]}>
            <Col span={24}>
                <Row gutter={[16, 24]}>
                    <Col>Languages</Col>
                </Row>
            </Col>
            <Col span={24} style={{ height: 'calc(100vh - 230px)', overflow: 'scroll' }}>
                <List
                    grid={{
                        gutter: 10,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 3,
                        xl: 4,
                        xxl: 5,
                    }}
                    dataSource={isLoading ? fakeDataLang : lang}
                    renderItem={(item) => (
                        <List.Item style={{ marginBottom: '10px' }}>
                            <div className="language__item">
                                {isLoading ? (
                                    <div className="language__skeleton">
                                        <div style={{ marginRight: 10 }}>
                                            <Skeleton.Avatar size={'small'} shape={'square'} />
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <Skeleton.Input
                                                size="small"
                                                className="language__skeleton-box-wid"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="language__box">
                                            <div className="language__flag">
                                                <span style={{ fontSize: 30, lineHeight: 0 }}>
                                                    {item.icon}
                                                </span>
                                            </div>
                                            <div className="language__country">{item.title}</div>
                                        </div>
                                        <div className="language__swich">
                                            <Switch
                                                size="small"
                                                defaultChecked={item.enabled}
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                onChange={(checked: boolean) =>
                                                    handleCountry([checked, item._id])
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    );
};
