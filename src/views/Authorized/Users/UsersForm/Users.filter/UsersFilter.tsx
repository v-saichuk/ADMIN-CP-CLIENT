import { FC } from 'react';

import { useAppSelector } from '../../../../../store/hooks/useRedux';

import './UsersFilter.scss';

export const UsersFilter: FC = () => {
    const { roles } = useAppSelector((state) => state.usersRole);

    return (
        <>
            {/* <div className="user_page__filter">
                <Radio.Group defaultValue="a" size="middle">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Radio.Button className="user_page__filter-button" value="a">
                            <UserOutlined /> All
                        </Radio.Button>
                        <Radio.Button className="user_page__filter-button" value="b">
                            <CheckCircleOutlined /> Online
                        </Radio.Button>
                    </Space>
                </Radio.Group>
            </div> */}
            <div className="user_page__filter-role">
                <div className="user_page__filter-role_title">Role</div>
                {roles.map((el) => (
                    <div key={el._id} className="user_page__filter-role_container">
                        <span
                            className="user_page__filter-role_mark"
                            style={{ backgroundColor: el.color }}></span>
                        <div className="user_page__filter-role_name">{el.title}</div>
                    </div>
                ))}
            </div>
        </>
    );
};
