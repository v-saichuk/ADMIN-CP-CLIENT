import { FC } from 'react';
import { Row } from 'antd';
import cn from 'classnames';

import './Logo.scss';

interface ILogin {
    boxClass?: String[];
    iconClass?: String[];
    textClass?: String[];
}

export const Logo: FC<ILogin> = ({ boxClass, iconClass, textClass }) => (
    <Row className={cn('logo', boxClass)}>
        <svg
            className={cn('logo__icon', iconClass)}
            width="46"
            height="47"
            viewBox="0 0 46 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M43.1066 26.9844L24.5198 6.81332C23.5205 5.72889 21.9066 5.72889 20.9073 6.81332L2.32052 26.9844C1.32127 28.0689 1.32127 29.8204 2.32052 30.9048L10.1137 39.3623C11.0086 40.3335 12.4595 40.3335 13.3544 39.3623C14.2494 38.3911 14.2494 36.8165 13.3544 35.8453L7.4465 29.4338C7.19779 29.1639 7.19779 28.7542 7.4465 28.4843L22.2894 12.3762C22.5381 12.1063 22.9156 12.1063 23.1643 12.3762L38.0072 28.4843C38.2559 28.7542 38.2559 29.1639 38.0072 29.4338L32.0992 35.8453C31.2043 36.8165 31.2043 38.3911 32.0992 39.3623C32.9941 40.3335 34.445 40.3335 35.34 39.3623L43.1323 30.9058C44.1099 29.8169 44.102 28.0647 43.1066 26.9844Z"
                fill="url(#paint0_linear_7_26630)"
            />
            <path
                d="M43.1066 26.9844L24.5198 6.81332C23.5205 5.72889 21.9066 5.72889 20.9073 6.81332L2.32052 26.9844C1.32127 28.0689 1.32127 29.8204 2.32052 30.9048C3.31978 31.9893 10.1137 39.3623 10.1137 39.3623C11.0086 40.3335 12.4595 40.3335 13.3544 39.3623C14.2494 38.3911 14.2494 36.8165 13.3544 35.8453L7.4465 29.4338C7.19779 29.1639 7.19779 28.7542 7.4465 28.4843L22.2894 12.3762C22.5381 12.1063 22.9156 12.1063 23.1643 12.3762L38.0072 28.4843C38.5415 29.1564 39.6237 30.2529 39.8769 31.8632C40.065 33.06 39.6509 34.3684 38.6347 35.7884C39.5095 34.839 41.0087 33.2115 43.1323 30.9058C44.1099 29.8169 44.102 28.0647 43.1066 26.9844Z"
                fill="url(#paint1_linear_7_26630)"
            />
            <path
                opacity="0.9"
                d="M30.4858 30.569C31.4153 29.5978 31.4153 28.0232 30.4858 27.052L24.5147 20.8133C23.4768 19.7289 21.8004 19.7289 20.7626 20.8132L14.7609 27.1062C13.8324 28.0797 13.8338 29.6548 14.7639 30.6266C15.6934 31.5978 17.2005 31.5978 18.13 30.6266L22.198 26.3762C22.4564 26.1063 22.8484 26.1063 23.1068 26.3762L27.1196 30.569C28.0492 31.5401 29.5562 31.5401 30.4858 30.569Z"
                fill="url(#paint2_linear_7_26630)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_7_26630"
                    x1="43.8594"
                    y1="27.1711"
                    x2="31.7447"
                    y2="45.4659"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FA881D" />
                    <stop offset="1" stopColor="#FEBA7B" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_7_26630"
                    x1="43.8594"
                    y1="29.7421"
                    x2="-1.5096"
                    y2="21.6466"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FAAA60" />
                    <stop offset="0.378601" stopColor="#FC9F47" />
                    <stop offset="1" stopColor="#FF7C01" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_7_26630"
                    x1="11.8445"
                    y1="23.4416"
                    x2="30.751"
                    y2="35.0217"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFDE6" />
                    <stop offset="0.414726" stopColor="#FFF173" />
                    <stop offset="1" stopColor="#FFE602" />
                </linearGradient>
            </defs>
        </svg>
        <div className={cn('logo__title', textClass)}>
            Admin- <span className="logo__sub_title">CP</span>
        </div>
    </Row>
);
