import { FC } from 'react';
import { ConfigProvider, Empty } from 'antd';

import './EmptyCustome.scss';

interface IProps {
    children: JSX.Element;
}

export const EmptyCustome: FC<IProps> = ({ children }) => {
    const customizeRenderEmpty = () => (
        <Empty
            className="empty-custom"
            imageStyle={{
                height: 70,
            }}
            description={false}></Empty>
    );

    return <ConfigProvider renderEmpty={customizeRenderEmpty}>{children}</ConfigProvider>;
};
