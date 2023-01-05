import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal } from 'antd';
import * as F from '../../../../../../components/Fields/Fields.create';

import { PlusOutlined } from '@ant-design/icons';

export const FieldCreate: FC = () => {
    const { pathname } = useLocation();
    const url = pathname.split('/');
    const templateId = url[2];
    const sectionId = url[3];

    const [isModal, setIsModal] = useState(false);

    return (
        <>
            <Button type="primary" onClick={() => setIsModal(true)} icon={<PlusOutlined />}>
                Add Field
            </Button>

            <Modal
                okText="Save"
                title="New Field"
                visible={isModal}
                footer={null}
                onCancel={() => setIsModal(false)}>
                <div className="field-form">
                    <F.FieldTextCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldRichTextCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldNumberCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldImageCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldLinkCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldVideoCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldListCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldChipCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldFaqCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldCommentCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldCodeCreate
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                </div>
            </Modal>
        </>
    );
};
