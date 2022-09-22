import { FC } from 'react';
import * as ic from '../../assets/images/country/country';

interface IProps {
    code: string;
}

const flagIcon = [
    {
        code: 'AF',
        icon: <ic.AF />,
    },
    {
        code: 'AL',
        icon: <ic.AL />,
    },
    {
        code: 'AE',
        icon: <ic.AE />,
    },
    {
        code: 'AM',
        icon: <ic.AM />,
    },
    {
        code: 'AZ',
        icon: <ic.AZ />,
    },
    {
        code: 'BA',
        icon: <ic.BA />,
    },
    {
        code: 'BG',
        icon: <ic.BG />,
    },
    {
        code: 'CN',
        icon: <ic.CN />,
    },
    {
        code: 'NR',
        icon: <ic.HR />,
    },
    {
        code: 'CZ',
        icon: <ic.CZ />,
    },
    {
        code: 'DK',
        icon: <ic.DK />,
    },
    {
        code: 'NL',
        icon: <ic.NL />,
    },
    {
        code: 'US',
        icon: <ic.US />,
    },
    {
        code: 'EE',
        icon: <ic.EE />,
    },
    {
        code: 'FI',
        icon: <ic.FI />,
    },
    {
        code: 'FR',
        icon: <ic.FR />,
    },
    {
        code: 'GE',
        icon: <ic.GE />,
    },
    {
        code: 'DE',
        icon: <ic.DE />,
    },
    {
        code: 'GR',
        icon: <ic.GR />,
    },
    {
        code: 'IL',
        icon: <ic.IL />,
    },
    {
        code: 'HU',
        icon: <ic.HU />,
    },
    {
        code: 'IS',
        icon: <ic.IS />,
    },
    {
        code: 'ID',
        icon: <ic.ID />,
    },
    {
        code: 'IE',
        icon: <ic.IE />,
    },
    {
        code: 'IT',
        icon: <ic.IT />,
    },
    {
        code: 'JP',
        icon: <ic.JP />,
    },
    {
        code: 'CA',
        icon: <ic.CA />,
    },
    {
        code: 'KZ',
        icon: <ic.KZ />,
    },
    {
        code: 'KR',
        icon: <ic.KR />,
    },
    {
        code: 'KG',
        icon: <ic.KG />,
    },
    {
        code: 'LV',
        icon: <ic.LV />,
    },
    {
        code: 'LT',
        icon: <ic.LT />,
    },
    {
        code: 'MK',
        icon: <ic.MK />,
    },
    {
        code: 'MG',
        icon: <ic.MG />,
    },
    {
        code: 'MY',
        icon: <ic.MY />,
    },
    {
        code: 'MT',
        icon: <ic.MT />,
    },
    {
        code: 'MN',
        icon: <ic.MN />,
    },
    {
        code: 'NP',
        icon: <ic.NP />,
    },
    {
        code: 'NO',
        icon: <ic.NO />,
    },
    {
        code: 'PL',
        icon: <ic.PL />,
    },
    {
        code: 'PT',
        icon: <ic.PT />,
    },
    {
        code: 'RO',
        icon: <ic.RO />,
    },
    {
        code: 'SK',
        icon: <ic.SK />,
    },
    {
        code: 'SL',
        icon: <ic.SL />,
    },
    {
        code: 'SO',
        icon: <ic.SO />,
    },
    {
        code: 'ES',
        icon: <ic.ES />,
    },
    {
        code: 'SD',
        icon: <ic.SD />,
    },
    {
        code: 'SE',
        icon: <ic.SE />,
    },
    {
        code: 'TJ',
        icon: <ic.TJ />,
    },
    {
        code: 'TH',
        icon: <ic.TH />,
    },
    {
        code: 'TR',
        icon: <ic.TR />,
    },
    {
        code: 'UA',
        icon: <ic.UA />,
    },
    {
        code: 'UZ',
        icon: <ic.UZ />,
    },
    {
        code: 'VN',
        icon: <ic.VN />,
    },
    {
        code: 'ILY',
        icon: <ic.ILY />,
    },
];

export const FlagIcon: FC<IProps> = ({ code }) =>
    flagIcon.filter((icon) => icon.code === code && icon.icon)[0].icon;
