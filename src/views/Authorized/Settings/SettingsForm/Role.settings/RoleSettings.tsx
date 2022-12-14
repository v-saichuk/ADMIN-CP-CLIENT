import { FC } from 'react';
import { Col, Row, Skeleton, Space } from 'antd';
import { useAppSelector } from '../../../../../store/hooks/useRedux';
import { RoleCreate } from './Role.create/RoleCreate';
import { RoleEdit } from './Role.edit/RoleEdit';
import { RoleDelete } from './Role.delete/Role.delete';

import './RoleSettings.scss';

export const RoleSettings: FC = () => {
    const { roles, isLoading } = useAppSelector((state) => state.usersRole);

    const fakeDataRole = Array.from({ length: 5 }).map(() => <></>);

    return (
        <Row gutter={[16, 15]}>
            <Col span={24}>
                <Row gutter={[16, 24]} justify="space-between" align="middle">
                    <Col>User Roles</Col>
                    <Col>
                        <RoleCreate />
                    </Col>
                </Row>
            </Col>

            <Col span={24} style={{ height: 'calc(100vh - 240px)', overflow: 'scroll' }}>
                <Row gutter={[16, 5]}>
                    {isLoading &&
                        fakeDataRole.map((_, ind) => (
                            <Col span={24} key={ind}>
                                <Row className="settings_users_form__row" justify="space-between">
                                    <Row align="middle">
                                        <Col>
                                            <Skeleton.Avatar
                                                size={'small'}
                                                shape="square"
                                                style={{ marginRight: 10 }}
                                            />
                                            <Skeleton.Input size="small" />
                                        </Col>
                                    </Row>
                                    <Row gutter={3}>
                                        <Col>
                                            <Skeleton.Avatar
                                                size={'small'}
                                                shape="square"
                                                style={{ marginRight: 3 }}
                                            />
                                        </Col>
                                        <Col>
                                            <Skeleton.Avatar size={'small'} shape="square" />
                                        </Col>
                                    </Row>
                                </Row>
                            </Col>
                        ))}

                    {!isLoading &&
                        roles.map((el) => (
                            <Col span={24} key={el._id}>
                                <Row className="settings_users_form__row" justify="space-between">
                                    <Row align="middle">
                                        <Col>
                                            <span
                                                className={'settings_users_form__dot'}
                                                style={{ backgroundColor: el.color }}></span>
                                        </Col>
                                        <Col>{el.title}</Col>
                                    </Row>
                                    <Row gutter={3}>
                                        <Space size="small">
                                            <RoleEdit roleId={el._id} />
                                            <RoleDelete roleId={el._id} />
                                        </Space>
                                    </Row>
                                </Row>
                            </Col>
                        ))}
                </Row>
            </Col>
        </Row>
    );
};
