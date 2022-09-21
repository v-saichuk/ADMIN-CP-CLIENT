import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

interface IUsers {
    id: string;
    avatar: string;
    firstname: string;
    lastname: string;
    email: string;
    roleId: string;
    social: {
        facebook: string;
        twitter: string;
        telegram: string;
        linkedin: string;
    };
    password: string;
}

const USERS: IUsers[] = [
    {
        id: '1',
        avatar: 'avatar_url',
        firstname: 'Vitaliy',
        lastname: 'Saichuk',
        email: 'saic4uk@gmail.com',
        roleId: '1',
        social: {
            facebook: 'testing',
            twitter: 'testing',
            telegram: 'testing',
            linkedin: 'testing',
        },
        password: '2107fily',
    },
    {
        id: '2',
        avatar: 'avatar_url',
        firstname: 'John 2',
        lastname: 'Doe',
        email: 'johnDoe@gmail.com',
        roleId: '2',
        social: {
            facebook: '',
            twitter: '',
            telegram: 'test',
            linkedin: '',
        },
        password: '2107fily',
    },
    {
        id: '3',
        avatar: 'avatar_url',
        firstname: 'John 3',
        lastname: 'Doe',
        email: 'johnDoe@gmail.com',
        roleId: '3',
        social: {
            facebook: '',
            twitter: '',
            telegram: '',
            linkedin: '',
        },
        password: '2107fily',
    },
];

const initialState = {
    isActive: false,
    users: USERS,
};

const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.users.push(action.payload);
            message.success('Saved!');
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((el) => el.id !== action.payload);
            message.success('Deleted!');
        },
        editUser: (state, action) => {
            state.users = state.users.map((el) =>
                el.id === action.payload.id ? { ...el, ...action.payload } : el,
            );
            message.success('Saved!');
        },
    },
});

export default users.reducer;
export const { createUser, editUser, deleteUser } = users.actions;
