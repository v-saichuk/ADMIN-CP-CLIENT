import { Checkbox } from 'antd';
import { FC } from 'react';

import { useAppSelector } from '../../../../../store/hooks/useRedux';

import './UsersFilter.scss';

interface ISearchUser {
    setSearch: (obj: any) => any;
}

export const UsersFilter: FC<ISearchUser> = ({ setSearch }) => {
    const { users } = useAppSelector((state) => state.users);
    const { roles } = useAppSelector((state) => state.usersRole);

    const onChange = (activeRoles: any) => {
        const filter = activeRoles.length
            ? activeRoles.map((el: any) => users.filter((elm) => el === elm.roleId)).flat()
            : users;

        setSearch(filter);
    };

    return (
        <div className="user_page__filter-role">
            <div className="user_page__filter-role_title">Role</div>
            <Checkbox.Group onChange={onChange}>
                {roles.map((el) => (
                    <div key={el._id} className="user_page__filter-role_container">
                        <Checkbox value={el._id} />
                        <span
                            className="user_page__filter-role_mark"
                            style={{ backgroundColor: el.color, marginLeft: '10px' }}></span>
                        <div className="user_page__filter-role_name">{el.title}</div>
                    </div>
                ))}
            </Checkbox.Group>
        </div>
    );
};
