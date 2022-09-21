import { FC, useState } from 'react';
import { Button, Col, Modal, notification, Row, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/useRedux';
import { deleteRole } from '../../../../../store/settings/usersRole.slice';
import { RoleCreate } from './Role.create/RoleCreate';
import { RoleEdit } from './Role.edit/RoleEdit';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import './RoleSettings.scss';

export const RoleSettings: FC = () => {
    const { confirm } = Modal;
    const { roles } = useAppSelector((state) => state.usersRole);
    const { users } = useAppSelector((state) => state.users);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [roleId, setRoleId] = useState('');
    const dispatch = useAppDispatch();

    const editUser = (id: string) => {
        setIsModalEditVisible(true);
        setRoleId(id);
    };

    const handleShowNotDeleteRole = (userArr: any[]) => {
        notification.error({
            message: 'Deletion error',
            description: `You cannot delete a role because it contains users: (${userArr
                .map((el) => el.firstname)
                .join(', ')})`,
        });
    };

    const handleShowDeleteRole = (id: string, titleRole: string) => {
        confirm({
            title: 'Do you really want to delete?',
            content: `Once deleted, you will not be able to restore role (${titleRole})`,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(deleteRole(id));
            },
        });
    };

    const handleDeleteRole = (id: string, title: string) => {
        const activeUserRole = users.filter((el) => el.roleId === id);
        activeUserRole.length > 0
            ? handleShowNotDeleteRole(activeUserRole)
            : handleShowDeleteRole(id, title);
    };

    return (
        <Row gutter={[16, 24]}>
            <Col span={24}>
                <Row gutter={[16, 24]} justify="space-between" align="middle">
                    <Col>User Role</Col>
                    <Col>
                        {isModalEditVisible && (
                            <RoleEdit isModal={setIsModalEditVisible} roleId={roleId} />
                        )}
                        <RoleCreate />
                    </Col>
                </Row>
            </Col>

            <Col span={24} style={{ height: 'calc(100vh - 240px)', overflow: 'scroll' }}>
                <Row gutter={[16, 10]}>
                    {roles.map((el) => (
                        <Col span={24} key={el.id}>
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
                                        <Tooltip
                                            placement="topLeft"
                                            title={'Edit'}
                                            mouseEnterDelay={0.5}>
                                            <Button
                                                size="small"
                                                type="text"
                                                onClick={() => editUser(el.id)}>
                                                <EditOutlined />
                                            </Button>
                                        </Tooltip>
                                    </Col>
                                    <Col>
                                        <Tooltip
                                            placement="topLeft"
                                            title={'Delete'}
                                            mouseEnterDelay={0.5}>
                                            <Button
                                                size="small"
                                                type="text"
                                                onClick={() => handleDeleteRole(el.id, el.title)}>
                                                <DeleteOutlined />
                                            </Button>
                                        </Tooltip>
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
