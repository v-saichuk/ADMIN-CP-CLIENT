import { FC, useEffect } from 'react';
import { Col, List, Row, Switch, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import { handleLanguage } from '../../../../../store/settings/language.slice';
import { getCountry } from '../../../../../store/settings/language.slice';
import { FlagIcon } from '../../../../../components/FlagIcon/FlagIcon';

import './LanguageSettings.scss';

export const LanguageSettings: FC = () => {
    const { lang, isLoading } = useAppSelector((state) => state.language);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCountry());
    }, [dispatch]);

    return (
        <Row gutter={[16, 24]}>
            <Col span={24}>
                <Row gutter={[16, 24]}>
                    <Col>Language</Col>
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
                    dataSource={lang}
                    renderItem={(item) => (
                        <List.Item style={{ marginBottom: '10px' }}>
                            <div className="language__item">
                                {isLoading ? (
                                    // TODO: Зробити автоматичне додавання кількості блоків щоб не було скачків перед першим рендером
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
                                                <FlagIcon code={item.code} />
                                            </div>
                                            <div className="language__country">{item.title}</div>
                                        </div>
                                        <div className="language__swich">
                                            <Switch
                                                size="small"
                                                defaultChecked={item.enabled}
                                                onChange={(checked: boolean) =>
                                                    dispatch(handleLanguage([checked, item.code]))
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
