import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal } from 'antd';

import * as Landing from '../../../../../../store/landings/landings.slice';
import * as F from '../../../../../../components/Fields/Fields.create';

import { PlusOutlined } from '@ant-design/icons';

export const LandingFieldCreate: FC = () => {
    const { pathname } = useLocation();
    const url = pathname.split('/');
    const LANDING_ID = url[2];
    const SECTION_ID = url[3];

    const [isModal, setIsModal] = useState(false);

    const params = {
        main_id: LANDING_ID,
        section_id: SECTION_ID,
        request_url: '/api/landing/field/action',
        handleModal: setIsModal,
        fieldCreate: Landing.fieldCreate,
    };

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
                    <F.FieldTextCreate {...params} />
                    <F.FieldRichTextCreate {...params} />
                    <F.FieldNumberCreate {...params} />
                    <F.FieldImageCreate {...params} />
                    <F.FieldLinkCreate {...params} />
                    <F.FieldVideoCreate {...params} />
                    <F.FieldListCreate {...params} />
                    <F.FieldChipCreate {...params} />
                    <F.FieldFaqCreate {...params} />
                    <F.FieldCommentCreate {...params} />
                    <F.FieldCodeCreate {...params} />
                </div>
            </Modal>
        </>
    );
};
