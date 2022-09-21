import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

interface IinitialState {
    roles: IRoles[];
    isLoading: boolean;
}

interface IRoles {
    id: string;
    title: string;
    color: string;
    isSetting: boolean;
    users: IUsers;
    projects: IProjects;
}

interface IUsers {
    createUsers: boolean;
    editUsers: boolean;
    deleteUsers: boolean;
}

interface IProjects {
    createProjects: boolean;
    editProjects: boolean;
    deleteProjects: boolean;
}

const initialState: IinitialState = {
    isLoading: false,
    roles: [
        {
            id: '1',
            title: 'Administrator',
            color: '#F59337',
            isSetting: true,
            users: {
                createUsers: true,
                editUsers: true,
                deleteUsers: true,
            },
            projects: {
                createProjects: true,
                editProjects: true,
                deleteProjects: true,
            },
        },
        {
            id: '2',
            title: 'Moderator',
            color: '#FADB14',
            isSetting: false,
            users: {
                createUsers: false,
                editUsers: false,
                deleteUsers: false,
            },
            projects: {
                createProjects: false,
                editProjects: false,
                deleteProjects: false,
            },
        },
        {
            id: '3',
            title: 'Web-Developer',
            color: '#66D986',
            isSetting: true,
            users: {
                createUsers: false,
                editUsers: false,
                deleteUsers: false,
            },
            projects: {
                createProjects: false,
                editProjects: false,
                deleteProjects: false,
            },
        },
    ],
};

const usersRole = createSlice({
    name: 'userRole',
    initialState,
    reducers: {
        handleIsActive: (state, action) => {
            state.isLoading = action.payload;
        },
        addRole: (state, action) => {
            message.success('Saved');
            state.roles.push(action.payload);
        },
        editRole: (state, action) => {
            message.success('Saved');
            state.roles.map((el) =>
                el.id === action.payload.id
                    ? ((el.id = action.payload.id),
                      (el.title = action.payload.title),
                      (el.color = action.payload.color),
                      (el.isSetting = action.payload.isSetting),
                      (el.users.createUsers = action.payload.createUsers),
                      (el.users.editUsers = action.payload.editUsers),
                      (el.users.deleteUsers = action.payload.deleteUsers),
                      (el.projects.createProjects = action.payload.createProjects),
                      (el.projects.editProjects = action.payload.editProjects),
                      (el.projects.deleteProjects = action.payload.deleteProjects))
                    : { ...state.roles },
            );
        },
        deleteRole: (state, action) => {
            message.success('Role removed');
            state.roles = state.roles.filter((el) => el.id !== action.payload);
        },
    },
});

export default usersRole.reducer;

export const { addRole, editRole, deleteRole, handleIsActive } = usersRole.actions;
