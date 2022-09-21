import { FC } from 'react';
import { Col, Form, Input, Modal, Radio, Row, Switch } from 'antd';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/useRedux';
import { editRole, handleIsActive } from '../../../../../../store/settings/usersRole.slice';

import './RoleEdit.scss';

const COLOR_BUTTON = [
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

interface IRoleEdit {
    roleId: string;
    isModal: (isActive: boolean) => any;
}

interface IFinish {
    title: string;
    color: string;
    isSetting: boolean;
    createUsers: boolean;
    editUsers: boolean;
    deleteUsers: boolean;
    createProjects: boolean;
    editProjects: boolean;
    deleteProjects: boolean;
}

export const RoleEdit: FC<IRoleEdit> = ({ roleId, isModal }) => {
    const [form] = Form.useForm();
    const { isLoading, roles } = useAppSelector((state) => state.usersRole);
    const dispatch = useAppDispatch();

    const role = roles.filter((el) => el.id === roleId)[0];

    const onFinish = (props: IFinish) => {
        setTimeout(() => {
            dispatch(editRole({ id: roleId, ...props }));
            form.resetFields();
            dispatch(handleIsActive(false));
            isModal(false);
        }, 1000);
    };

    const onOk = () => {
        form.submit();
        dispatch(handleIsActive(true));
    };
    const onCancel = () => isModal(false);

    return (
        <Modal
            okText="Save"
            title={`Edit Role "${role?.title}"`}
            visible={true}
            onOk={onOk}
            confirmLoading={isLoading}
            onCancel={onCancel}>
            <Form
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size="middle"
                autoComplete="off">
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item
                            name="title"
                            initialValue={role?.title}
                            rules={[{ required: true, message: 'Please input role title!' }]}>
                            <Input placeholder="Title" size="middle" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
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
                                            autoFocus={el.color === role.color}
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
                                    <Switch size="small" />
                                </Form.Item>
                                <span>Create Users</span>
                            </Col>
                            <Col span={24} className="settings_users_role_create_modal__swich">
                                <Form.Item
                                    name="editUsers"
                                    initialValue={role?.users?.editUsers}
                                    valuePropName="checked">
                                    <Switch size="small" />
                                </Form.Item>
                                <span>Edit users</span>
                            </Col>
                            <Col span={24} className="settings_users_role_create_modal__swich">
                                <Form.Item
                                    name="deleteUsers"
                                    initialValue={role?.users?.deleteUsers}
                                    valuePropName="checked">
                                    <Switch size="small" />
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
                                    <Switch size="small" />
                                </Form.Item>
                                <span>Create Projects</span>
                            </Col>
                            <Col span={24} className="settings_users_role_create_modal__swich">
                                <Form.Item
                                    name="editProjects"
                                    initialValue={role?.projects?.editProjects}
                                    valuePropName="checked">
                                    <Switch size="small" />
                                </Form.Item>
                                <span>Edit Projects</span>
                            </Col>
                            <Col span={24} className="settings_users_role_create_modal__swich">
                                <Form.Item
                                    name="deleteProjects"
                                    initialValue={role?.projects?.deleteProjects}
                                    valuePropName="checked">
                                    <Switch size="small" />
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
                                    <Switch size="small" />
                                </Form.Item>
                                <span>Access to settings</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
