import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, Modal } from 'antd';
import { useAppDispatch } from '../../../../../../store/hooks/useRedux';
import { FieldText } from '../../../../../../components/Fields/Field.text/Field.text';

import { PlusOutlined } from '@ant-design/icons';
import { FieldRichText } from '../../../../../../components/Fields/Field.rich_text/Field.rich_text';
import { FieldNumber } from '../../../../../../components/Fields/Field.number/Field.number';
import { FieldImage } from '../../../../../../components/Fields/Field.image/Field.image';
import { FieldLink } from '../../../../../../components/Fields/Field.link/Field.link';
import { FieldVideo } from '../../../../../../components/Fields/Field.video/Field.video';
import { FieldChip } from '../../../../../../components/Fields/Field.chip/Field.chip';
import { FieldFaq } from '../../../../../../components/Fields/Field.faq/Field.faq';
import { FieldComment } from '../../../../../../components/Fields/Field.comment/Field.comment';
import { FieldCode } from '../../../../../../components/Fields/Field.code/Field.code';
import { FieldList } from '../../../../../../components/Fields/Field.list/Field.list';

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
                title="New Fields"
                visible={isModal}
                footer={null}
                onCancel={() => setIsModal(false)}>
                <div className="field-form">
                    <FieldText
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldRichText
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldNumber
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldImage
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldLink
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldVideo
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldList
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldChip
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldFaq
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldComment
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                    <FieldCode
                        templateId={templateId}
                        sectionId={sectionId}
                        url={'/api/template/field/action'}
                    />
                </div>
            </Modal>
        </>
    );
};
