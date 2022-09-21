import { FC, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Radio, Row, Switch, Tooltip } from 'antd';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks/useRedux';
import { addRole, handleIsActive } from '../../../../../../store/settings/usersRole.slice';

import { PlusOutlined } from '@ant-design/icons';
import './RoleCreate.scss';

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

export const RoleCreate: FC = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const { isLoading } = useAppSelector((state) => state.usersRole);
    const [isActive, setActive] = useState(false);

    const onFinish = (props: IFinish) => {
        setTimeout(() => {
            dispatch(
                addRole({
                    id: uuid(),
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
                }),
            );
            form.resetFields();
            dispatch(handleIsActive(false));
            setActive(false);
        }, 1000);
    };

    const onOk = () => {
        form.submit();
        dispatch(handleIsActive(true));
    };

    const onFinishFailed = () => {
        message.error('Please fill in all fields');
        dispatch(handleIsActive(false));
    };

    const onCancel = () => setActive(false);

    return (
        <>
            <Tooltip placement="topLeft" title={'Add a new user role'} mouseEnterDelay={0.5}>
                <Button size="middle" type="primary" onClick={() => setActive(true)}>
                    <PlusOutlined /> Create role
                </Button>
            </Tooltip>
            <Modal
                okText="Save"
                title="New Role"
                visible={isActive}
                onOk={onOk}
                confirmLoading={isLoading}
                onCancel={onCancel}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    size="middle"
                    autoComplete="off">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
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
                                                className="settings_users_role_create_modal__button"
                                                style={{
                                                    backgroundColor: el.color,
                                                }}></Radio.Button>
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
                                        initialValue={false}
                                        valuePropName="checked">
                                        <Switch size="small" />
                                    </Form.Item>
                                    <span>Create Users</span>
                                </Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="editUsers"
                                        initialValue={false}
                                        valuePropName="checked">
                                        <Switch size="small" />
                                    </Form.Item>
                                    <span>Edit users</span>
                                </Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="deleteUsers"
                                        initialValue={false}
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
                                        initialValue={false}
                                        valuePropName="checked">
                                        <Switch size="small" />
                                    </Form.Item>
                                    <span>Create Projects</span>
                                </Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="editProjects"
                                        initialValue={false}
                                        valuePropName="checked">
                                        <Switch size="small" />
                                    </Form.Item>
                                    <span>Edit Projects</span>
                                </Col>
                                <Col span={24} className="settings_users_role_create_modal__swich">
                                    <Form.Item
                                        name="deleteProjects"
                                        initialValue={false}
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
                                        initialValue={false}
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
        </>
    );
};
