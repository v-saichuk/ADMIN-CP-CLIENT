import { ReactNode } from 'react';

export interface ILanguage {
    _id: string;
    code: string;
    title: string;
    icon: ReactNode;
    enabled: boolean;
}

export interface IRoles {
    _id: string;
    title: string;
    color: string;
    isSetting: boolean;
    users: {
        createUsers: boolean;
        editUsers: boolean;
        deleteUsers: boolean;
    };
    projects: {
        createProjects: boolean;
        editProjects: boolean;
        deleteProjects: boolean;
    };
}

export interface IRolesForm {
    _id?: string;
    title: string;
    color: string;
    isSetting: boolean;
    createUsers: boolean;
    editUsers: boolean;
    deleteUsers: boolean;
    createProjects: boolean;
    editProjects: boolean;
    deleteProjects: boolean;
}

export interface IRoleColor {
    id: string;
    color: string;
}

export interface IUsers {
    _id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    social: {
        facebook: string;
        twitter: string;
        telegram: string;
        linkedin: string;
    };
    passwordHash: string;
}
