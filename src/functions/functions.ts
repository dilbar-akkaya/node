import { ServerResponse } from "http";
import { CONTENT_TYPES, IHobby, IUser, IUserReq, IUserResponse, STATUS_CODE } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

export const createUser = (userReq: IUserReq, arr: IUserResponse[]) => {
    if (!userReq.name || !userReq.email) {
        throw new Error(' Please contain all required fields');
    }
    const id = uuidv4();
    const newUserData: IUserResponse = {
        data: {
            user: {
                id: id,
                name: userReq.name,
                email: userReq.email,
            },
            links: {
                self: `/api/users/${id}`,
                hobbies: `/api/users/${id}/hobbies`,
            },
        },
        error: null,
    }
    arr.push(newUserData);
    return newUserData;
}

export const sendResponse = (res: ServerResponse, statusCode: number, data: IUserResponse | IUserResponse[] | undefined | string[]) => {
    if (data === undefined) {
        res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': CONTENT_TYPES.TextPlain });
        res.end('Resource not found');
    } else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.writeHead(statusCode, { 'Content-Type': CONTENT_TYPES.ApplicationJSON });
        res.end(JSON.stringify(data));
    }
};

export const sendMessage = (res: ServerResponse, statusCode: number, message: string) => {
    res.writeHead(statusCode, { 'Content-Type': CONTENT_TYPES.TextPlain });
    res.end(message);
};

export const validateID = (id: string) => {
    const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regExp.test(id);
}

export const deleteUser = (userID: string, arr: IUserResponse[]) => {
    const userIndex = arr.findIndex(item => item.data.user.id === userID);
    if (userIndex !== -1) {
        const deletedUser = arr.splice(userIndex, 1)[0];
        return deletedUser;
    } else {
        throw new Error('User is not founded');
    }
}