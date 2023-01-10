export interface IWebsites {
    _id: string;
    url: string;
    offers: IOffers[];
    enabled: boolean;
    notes: string;
}

export interface ILandings {
    _id: string;
    name: string;
    country: string[];
    language: ILanguage;
    website: IWebsites;
    offer: IOffers;
    template_pack: string;
    status: boolean;
    note: string;
    sections: ITemplateSections[];
}

export interface ILandingsPage {
    key: React.Key;
    name: JSX.Element;
    country: JSX.Element[];
    language: JSX.Element;
    website: string;
    offer: JSX.Element;
    template_pack: string;
    status: JSX.Element;
    notes: string;
}

export interface ITemplates {
    _id: string;
    name: string;
    language: ILanguage;
    template_pack: string;
    description: string;
    sections: ITemplateSections[];
    screenshot: string;
}

export interface ITemplateSections {
    _id: string;
    title: string;
    fields: IFields[];
}

export interface IFields {
    _id: string;
    field_type: string;
    field_name: string;
    field_description: string;
    content: {
        text?: string;
        rich_text?: string;
        number?: string;
        title?: string;
        link?: string;
        video_url?: string;
        list?: string[];
        question?: string;
        reply?: string;
        fullname?: string;
        avatar_url?: string;
        comment?: string;
        code?: string;
        chip: string[];
        sizes: {
            small?: string;
            medium?: string;
            large?: string;
        };
    };
}

export interface IFieldCreateProps {
    main_id: string;
    section_id: string;
    request_url: string;
    handleModal: any;
    fieldCreate: any;
}

export interface ILegals {
    _id: string;
    name: string;
    language: ILanguage[];
    offer: IOffers[];
    website: IWebsites[];
    offerOwner: IOfferOwner[];
    enabled: boolean;
    content: {
        title?: string;
        description?: string;
    };
}

export interface ILanguage {
    _id: string;
    title: string;
    icon: string;
    enabled: boolean;
}

export interface IOfferOwner {
    _id: string;
    name: string;
    color: string;
}

export interface IOffers {
    _id: string;
    name: string;
    offerOwner: IOfferOwner;
    logo: string;
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

export interface ITemplatesPage {
    key: React.Key;
    name: JSX.Element;
    language: JSX.Element;
    template_pack: string;
    description: string;
    screenshot: JSX.Element;
}
