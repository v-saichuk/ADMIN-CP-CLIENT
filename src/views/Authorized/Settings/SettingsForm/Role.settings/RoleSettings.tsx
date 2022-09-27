import { FC, useEffect } from 'react';
import { Col, Row, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import { RoleCreate } from './Role.create/RoleCreate';
import { RoleEdit } from './Role.edit/RoleEdit';
import { getRoles } from '../../../../../store/settings/usersRole.slice';
import { RoleDelete } from './Role.delete/Role.delete';

import './RoleSettings.scss';

export const RoleSettings: FC = () => {
    const { roles, isLoading } = useAppSelector((state) => state.usersRole);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRoles());
    }, [dispatch]);

    const fakeDataRole = Array.from({ length: 5 }).map((el) => <></>);

    return (
        <Row gutter={[16, 24]}>
            <Col span={24}>
                <Row gutter={[16, 24]} justify="space-between" align="middle">
                    <Col>User Roles</Col>
                    <Col>
                        <RoleCreate />
                    </Col>
                </Row>
            </Col>

            <Col span={24} style={{ height: 'calc(100vh - 240px)', overflow: 'scroll' }}>
                <Row gutter={[16, 10]}>
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
                                        <Col>
                                            <RoleEdit roleId={el._id} />
                                        </Col>
                                        <Col>
                                            <RoleDelete roleId={el._id} />
                                        </Col>
                                    </Row>
                                </Row>
                            </Col>
                        ))}
                </Row>
            </Col>
        </Row>
    );
};
