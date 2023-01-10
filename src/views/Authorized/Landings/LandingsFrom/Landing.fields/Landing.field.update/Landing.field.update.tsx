import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import * as F from '../../../../../../components/Fields/Fields.update';
import * as Landing from '../../../../../../store/landings/landings.slice';

import { IFields } from '../../../../../../types';

interface IProps {
    field: IFields;
}

export const LandingFieldUpdate: FC<IProps> = ({ field }) => {
    const { pathname } = useLocation();
    const url = pathname.split('/');
    const LANDING_ID = url[2];
    const SECTION_ID = url[3];

    const params = {
        field,
        main_id: LANDING_ID,
        section_id: SECTION_ID,
        request_url: '/api/landing/field/update',
        fieldUpdate: Landing.fieldUpdate,
    };

    switch (field.field_type) {
        case 'Text':
            return <F.FieldTextUpdate {...params} />;
        case 'RichText':
            return <F.FieldRichTextUpdate {...params} />;

        case 'Number':
            return <F.FieldNumberUpdate {...params} />;

        case 'Image':
            return <F.FieldImageUpdate {...params} />;

        case 'Link':
            return <F.FieldLinkUpdate {...params} />;

        case 'Video':
            return <F.FieldVideoUpdate {...params} />;

        case 'List':
            return <F.FieldListUpdate {...params} />;

        case 'Chip':
            return <F.FieldChipUpdate {...params} />;

        case 'Question':
            return <F.FieldFaqUpdate {...params} />;

        case 'Comment':
            return <F.FieldCommentUpdate {...params} />;

        case 'Code':
            return <F.FieldCodeUpdate {...params} />;

        default:
            return null;
    }
};
