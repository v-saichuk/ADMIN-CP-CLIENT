import { FC, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Radio, Row, Switch } from 'antd';
import axios from '../../../../../../axios';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/useRedux';
import { updateRole } from '../../../../../../store/settings/usersRole.slice';
import { IRoles, IRoleColor, IRolesForm } from '../../../../../../types/';
import * as Icon from '@ant-design/icons';

import './RoleEdit.scss';

interface IProps {
    roleId: string;
}

const key = 'updatable';

const COLOR_BUTTON: IRoleColor[] = [
    {
        id: '1',
        color: '#66D986',
    },
    {
        id: '2',
        color: '#FADB14',
    },
    {
        id: '3',
        color: '#14A7FA',
    },
    {
        id: '4',
        color: '#F59337',
    },
    {
        id: '5',
        color: '#F25B5B',
    },
    {
        id: '6',
        color: '#E637F5',
    },
    {
        id: '7',
        color: '#37DEF5',
    },
    {
        id: '8',
        color: '#3BF537',
    },
    {
        id: '9',
        color: '#979797',
    },
    {
        id: '10',
        color: '#56565F',
    },
    {
        id: '11',
        color: '#fff',
    },
];

export const RoleEdit: FC<IProps> = ({ roleId }) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const { roles } = useAppSelector((state) => state.usersRole);
    const role = roles.find((el) => el._id === roleId);
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const handlePatchRole = async (props: IRolesForm) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const updatedRole: IRoles = {
                _id: roleId,
                title: props.title,
                color: props.color,
                isSetting: props.isSetting,
                users: {
                    createUsers: props.createUsers,
                    editUsers: props.editUsers,
                    deleteUsers: props.deleteUsers,
                },
                projects: {
                    createProjects: props.createProjects,
                    editProjects: props.editProjects,
                    deleteProjects: props.deleteProjects,
                },
            };
            const { data } = await axios.patch(`/api/roles/${roleId}`, updatedRole);
            if (data.success) {
                setIsLoadingForm(false);
                dispatch(updateRole(updatedRole));
                setIsModal(false);
                message.success({ content: 'Saved!', key, duration: 2 });
                return;
            } else {
                setIsLoadingForm(false);
                message.error({ content: 'Error!', key, duration: 2 });
            }
        } catch (e) {
            setIsLoadingForm(false);
            message.error({ content: 'Error!', key, duration: 2 });
        } finally {
            setIsLoadingForm(false);
        }
    };

    return (
        <>
            <Button size="small" loading={isLoadingForm} onClick={() => setIsModal(!isModal)}>
                <Icon.EditOutlined />
            </Button>
            <Modal
                okText="Save"
                title={`Edit Role "${role?.title}"`}
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={() => setIsModal(false)}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handlePatchRole}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                initialValue={role?.title}
                                rules={[
                                    { required: true, message: 'Please input role title!' },
                                    { min: 3, message: 'Minimum length 3 characters' },
                                    { type: 'string', message: 'Role name cannot be a number' },
                                ]}>
                                <Input placeholder="Title" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                initialValue={role?.color}
                                name="color"
                                rules={[{ required: true, message: 'Please select a color!' }]}>
                                <Row justify="space-between">
                                    <Radio.Group
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>
                                        {COLOR_BUTTON.map((el) => (
                                            <Radio.Button
                                                key={el.id}
                                                value={el.color}
                                                autoFocus={el.color === role?.color}
                                                style={{ backgroundColor: el.color }}
                                                className="settings_users_role_create_modal__button"
                                            />
                                        ))}
                                    </Radio.Group>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={24}>Users</Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="createUsers"
                                        initialValue={role?.users?.createUsers}
                                        valuePropName="checked">
                                        <Switch
                                            size="small"
                                            checkedChildren={<Icon.CheckOutlined />}
                                            unCheckedChildren={<Icon.CloseOutlined />}
                                        />
                                    </Form.Item>
                                    <span>Create Users</span>
                                </Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="editUsers"
                                        initialValue={role?.users?.editUsers}
                                        valuePropName="checked">
                                        <Switch
                                            size="small"
                                            checkedChildren={<Icon.CheckOutlined />}
                                            unCheckedChildren={<Icon.CloseOutlined />}
                                        />
                                    </Form.Item>
                                    <span>Edit users</span>
                                </Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="deleteUsers"
                                        initialValue={role?.users?.deleteUsers}
                                        valuePropName="checked">
                                        <Switch
                                            size="small"
                                            checkedChildren={<Icon.CheckOutlined />}
                                            unCheckedChildren={<Icon.CloseOutlined />}
                                        />
                                    </Form.Item>
                                    <span>Delete users</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={24}>Projects</Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="createProjects"
                                        initialValue={role?.projects?.createProjects}
                                        valuePropName="checked">
                                        <Switch
                                            size="small"
                                            checkedChildren={<Icon.CheckOutlined />}
                                            unCheckedChildren={<Icon.CloseOutlined />}
                                        />
                                    </Form.Item>
                                    <span>Create Projects</span>
                                </Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="editProjects"
                                        initialValue={role?.projects?.editProjects}
                                        valuePropName="checked">
                                        <Switch
                                            size="small"
                                            checkedChildren={<Icon.CheckOutlined />}
                                            unCheckedChildren={<Icon.CloseOutlined />}
                                        />
                                    </Form.Item>
                                    <span>Edit Projects</span>
                                </Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="deleteProjects"
                                        initialValue={role?.projects?.deleteProjects}
                                        valuePropName="checked">
                                        <Switch
                                            size="small"
                                            checkedChildren={<Icon.CheckOutlined />}
                                            unCheckedChildren={<Icon.CloseOutlined />}
                                        />
                                    </Form.Item>
                                    <span>Delete Projects</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row>
                                <Col span={24}>Settings</Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="isSetting"
                                        initialValue={role?.isSetting}
                                        valuePropName="checked">
                                        <Switch
                                            size="small"
                                            checkedChildren={<Icon.CheckOutlined />}
                                            unCheckedChildren={<Icon.CloseOutlined />}
                                        />
                                    </Form.Item>
                                    <span>Access to settings</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
