export interface IUserReq {
    name: string,
    email: string,
    hobbies?: string[];
}
export interface IUser {
    id: string,
    name: string,
    email: string,
    hobbies?: string[];
}
export interface ILink {
    self: string,
    hobbies: string,
}
export interface IHobby {
    hobbies: string[]
}

export interface IUserResponse {
    data: {
        user: IUser,
        links: ILink,
    },
    error: null,

}
export interface IHobbyResponse {
    data: {
        hobbies: IHobby,
        links: {
            self: string,
            user: string,
        },
    },
    error: null,

}
export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

export enum STATUS_CODE {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    CREATED = 201,
    NO_CONTENT = 204,
    INTERNAL_SERVER_ERROR = 500,
};
export enum CONTENT_TYPES {
    TextPlain = 'text/plain',
    ApplicationJSON = 'application/json',
}
export const ENDPOINT = '/api/users';