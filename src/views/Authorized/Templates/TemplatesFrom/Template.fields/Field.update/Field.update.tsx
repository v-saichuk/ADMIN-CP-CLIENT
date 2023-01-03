import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import * as F from '../../../../../../components/Fields/Fields.update';

import { IFields } from '../../../../../../types';

interface IProps {
    field: IFields;
}

export const FieldUpdate: FC<IProps> = ({ field }) => {
    const { pathname } = useLocation();
    const url = pathname.split('/');
    const templateId = url[2];
    const sectionId = url[3];

    switch (field.field_type) {
        case 'Text':
            return (
                <F.FieldTextUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );
        case 'RichText':
            return (
                <F.FieldRichTextUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        case 'Number':
            return (
                <F.FieldNumberUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        case 'Image':
            return (
                <F.FieldImageUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        case 'Link':
            return (
                <F.FieldLinkUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        case 'Video':
            return (
                <F.FieldVideoUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        case 'List':
            return (
                <F.FieldListUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        case 'Chip':
            return (
                <F.FieldChipUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        case 'Question':
            return (
                <F.FieldFaqUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        case 'Comment':
            return (
                <F.FieldCommentUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        case 'Code':
            return (
                <F.FieldCodeUpdate
                    field={field}
                    templateId={templateId}
                    sectionId={sectionId}
                    url={'/api/template/field/update'}
                />
            );

        default:
            return null;
    }
};
