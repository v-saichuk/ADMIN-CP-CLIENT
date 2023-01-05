import { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import * as Template from '../../../store/templates/templates.slice';
import { useAppDispatch } from '../../../store/hooks/useRedux';
import axios from '../../../axios';
import { TweenOneGroup } from 'rc-tween-one';

import type { InputRef } from 'antd';
import * as SVG from '../../../assets/images/svg/svg';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';

import { IFieldCreateProps } from '../../../types/index';

interface IValue {
    name: string;
    description: string;
    text: string;
}

const key = 'update';

export const FieldChipCreate: FC<IFieldCreateProps> = ({
    templateId,
    sectionId,
    url,
    handleModal,
}) => {
    const [isModal, setIsModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);

    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const [tags, setTags] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleClose = (removedTag: string) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

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

    const handleCreateFields = async (value: IValue) => {
        setIsLoadingForm(true);
        message.loading({ content: 'Loading...', key });
        try {
            const { data } = await axios.post(url, {
                templateId,
                sectionId,
                information: {
                    field_type: 'Chip',
                    field_name: value.name,
                    field_description: value.description,
                },
                content: {
                    chip: !!tags ? tags : [],
                },
            });

            const section = data.sections.find((section: any) => section._id === sectionId);

            dispatch(
                Template.fieldCreate({
                    templateId,
                    sectionId,
                    fields: section?.fields,
                }),
            );

            form.resetFields();
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
        handleModal(false);
    };

    const onCancel = () => {
        form.resetFields();
        setIsModal(false);
    };

    const onBack = () => {
        setIsModal(false);
        handleModal(true);
    };

    return (
        <>
            <div className="field-create" onClick={onOpen}>
                <div className="field-create__content">
                    <SVG.IconChip x={40} y={40} />
                    <span className="fields-create__title">CHIP</span>
                </div>
            </div>

            <Modal
                okText="Save"
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            type="primary"
                            size="small"
                            icon={<ArrowLeftOutlined />}
                            onClick={onBack}
                        />
                        <span style={{ marginLeft: 10 }}>Chip</span>
                    </div>
                }
                visible={isModal}
                onOk={() => form.submit()}
                confirmLoading={isLoadingForm}
                onCancel={onCancel}>
                <Form
                    name="basic"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleCreateFields}
                    size="middle"
                    autoComplete="off">
                    <div style={{ marginBottom: 5 }}>Information</div>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input name!' }]}>
                                <Input placeholder="Name field" size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="description">
                                <TextArea
                                    showCount
                                    maxLength={100}
                                    style={{ height: 50 }}
                                    placeholder="Description"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <hr style={{ border: '0.1px solid #303030' }} />

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
