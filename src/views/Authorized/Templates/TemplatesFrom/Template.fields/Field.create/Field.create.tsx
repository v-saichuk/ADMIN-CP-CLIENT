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
                    <F.FieldText
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldRichText
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldNumber
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldImage
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldLink
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldVideo
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldList
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldChip
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldFaq
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldComment
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                        handleModal={setIsModal}
                    />
                    <F.FieldCode
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
