import { FC, useEffect, useRef, useState } from 'react';
import axios from '../../../axios';
import { Col, Form, Input, message, Modal, Row, Tag, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import * as Template from '../../../store/templates/templates.slice';
import { useAppDispatch } from '../../../store/hooks/useRedux';
import { TweenOneGroup } from 'rc-tween-one';

import { PlusOutlined } from '@ant-design/icons';

import type { InputRef } from 'antd';
import { IFields } from '../../../types/index';
import { FirstUppercase } from '../../../utils/helpers/uppercase';

interface IProps {
    field: IFields;
    sectionId: string;
    templateId: string;
    url: string;
}

interface IValue {
    name: string;
    description: string;
    text: string;
}

const key = 'update';

export const FieldChipUpdate: FC<IProps> = ({ field, templateId, sectionId, url }) => {
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const [tags, setTags] = useState<string[]>(field.content.chip);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleClose = (removedTag: string) => setTags(tags.filter((tag) => tag !== removedTag));

    const showInput = () => setInputVisible(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag: string) => {
        const tagElem = (
            <Tag
                closable
                style={{ marginTop: 8 }}
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}>
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    const tagChild = tags.map(forMap);

    const handleUpdateField = async (value: IValue) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.patch(url, {
                templateId,
                sectionId,
                fieldId: field._id,
                information: {
                    field_type: 'Chip',
                    field_name: value.name,
                    field_description: value.description,
                },
                content: {
                    chip: tags,
                },
            });

            dispatch(
                Template.fieldUpdate({
                    templateId: templateId,
                    sectionId: sectionId,
                    fields: data.fields,
                }),
            );

            setIsModal(false);
            message.success({ content: 'Updated!', key, duration: 2 });
        } catch (e) {
            setIsLoadingForm(false);
            message.error({ content: 'Error!', key, duration: 2 });
        } finally {
            setIsLoadingForm(false);
        }
    };

    const onOpen = () => {
        setIsModal(true);
    };

    const onCancel = () => {
        form.resetFields();
        setIsModal(false);
    };

    return (
        <>
            <Typography.Link onClick={onOpen}>{FirstUppercase(field.field_name)}</Typography.Link>

            <Modal
                okText="Save"
                title="Edit Chip"
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={onCancel}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleUpdateField}
                    size="middle"
                    autoComplete="off">
                    <div style={{ marginBottom: 5 }}>Information</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                initialValue={field.field_name}
                                rules={[{ required: true, message: 'Please input name!' }]}>
                                <Input placeholder="Name field" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="description" initialValue={field.field_description}>
                                <TextArea
                                    showCount
                                    maxLength={100}
                                    style={{ height: 50 }}
                                    placeholder="Description"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr style={{ border: '1px solid #303030' }} />

                    <div style={{ marginBottom: 5 }}>Content</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            {!!tagChild.length && (
                                <div style={{ marginBottom: 16 }}>
                                    <TweenOneGroup
                                        enter={{
                                            scale: 0.8,
                                            opacity: 0,
                                            type: 'from',
                                            duration: 100,
                                        }}
                                        onEnd={(e) => {
                                            if (e.type === 'appear' || e.type === 'enter') {
                                                (e.target as any).style = 'display: inline-block';
                                            }
                                        }}
                                        leave={{ opacity: 0, width: 0, scale: 0, duration: 300 }}
                                        appear={false}>
                                        {tagChild}
                                    </TweenOneGroup>
                                </div>
                            )}
                            {inputVisible && (
                                <Input
                                    ref={inputRef}
                                    type="text"
                                    autoFocus
                                    style={{ width: '100%' }}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                                <Tag
                                    onClick={showInput}
                                    className="site-tag-plus"
                                    style={{
                                        width: '100%',
                                        height: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                    <PlusOutlined style={{ marginRight: 5 }} /> New Element
                                </Tag>
                            )}
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
