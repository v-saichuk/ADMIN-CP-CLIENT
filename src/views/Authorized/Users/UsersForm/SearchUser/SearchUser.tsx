import { FC, useState } from 'react';
import { Select } from 'antd';
import { useAppSelector } from '../../../../../store/hooks/useRedux';

import './SearchUser.scss';

interface ISearchUser {
    search: any[];
    setSearch: (obj: any) => any;
}

export const SearchUser: FC<ISearchUser> = ({ search, setSearch }) => {
    const { Option } = Select;
    const { users } = useAppSelector((state) => state.users);
    const { roles } = useAppSelector((state) => state.usersRole);
    const [inputSize, setInputSize] = useState('300px');

    const handleChange = (value: any) => {
        setSearch(
            value.length
                ? value.map((el: { key: any }) => users.filter((elm) => el.key === elm.id)[0])
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
            onFocus={() => setInputSize('400px')}
            onBlur={() => setInputSize('300px')}
            style={{ minWidth: inputSize, transition: '0.3s' }}>
            {users.map((el) => (
                <Option key={el.id} value={el.firstname + el.lastname}>
                    <div className="search_user">
                        {roles.map(
                            (elm) =>
                                elm._id === el.roleId && (
                                    <span
                                        key={elm._id}
                                        className="search_dot"
                                        style={{ backgroundColor: elm.color }}></span>
                                ),
                        )}
                        {el.firstname} {el.lastname}
                    </div>
                </Option>
            ))}
        </Select>
    );
};
