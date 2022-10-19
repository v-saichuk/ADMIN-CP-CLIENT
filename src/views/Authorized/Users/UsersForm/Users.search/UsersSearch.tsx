import { FC, useState } from 'react';
import { Select } from 'antd';
import { useAppSelector } from '../../../../../store/hooks/useRedux';

import './UsersSearch.scss';

interface ISearchUser {
    setSearch: (obj: any) => any;
}

export const SearchUser: FC<ISearchUser> = ({ setSearch }) => {
    const { users } = useAppSelector((state) => state.users);
    const { roles } = useAppSelector((state) => state.usersRole);

    const handleChange = (value: any) => {
        setSearch(
            value.length
                ? value.map((el: { key: any }) => users.find((elm) => el.key === elm._id))
                : users,
        );
    };

    return (
        <Select
            labelInValue={true}
            mode="multiple"
            onChange={handleChange}
            showArrow
            placeholder="Search user"
            style={{ width: '100%', marginTop: '20px' }}>
            {users.map((user) => (
                <Select.Option key={user._id} value={user.firstName + user.lastName}>
                    <div className="search_user">
                        {roles.map(
                            (role) =>
                                role._id === user.roleId && (
                                    <span
                                        key={role._id}
                                        className="search_dot"
                                        style={{ backgroundColor: role.color }}></span>
                                ),
                        )}
                        {user.firstName} {user.lastName}
                    </div>
                </Select.Option>
            ))}
        </Select>
    );
};
