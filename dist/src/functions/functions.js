"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.validateID = exports.sendMessage = exports.sendResponse = exports.createUser = void 0;
const types_1 = require("../types/types");
const uuid_1 = require("uuid");
const createUser = (userReq, arr) => {
    if (!userReq.name || !userReq.email) {
        throw new Error(' Please contain all required fields');
    }
    const id = (0, uuid_1.v4)();
    const newUserData = {
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
    };
    arr.push(newUserData);
    return newUserData;
};
exports.createUser = createUser;
const sendResponse = (res, statusCode, data) => {
    if (data === undefined) {
        res.writeHead(types_1.STATUS_CODE.NOT_FOUND, { 'Content-Type': types_1.CONTENT_TYPES.TextPlain });
        res.end('Resource not found');
    }
    else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.writeHead(statusCode, { 'Content-Type': types_1.CONTENT_TYPES.ApplicationJSON });
        res.end(JSON.stringify(data));
    }
};
exports.sendResponse = sendResponse;
const sendMessage = (res, statusCode, message) => {
    res.writeHead(statusCode, { 'Content-Type': types_1.CONTENT_TYPES.TextPlain });
    res.end(message);
};
exports.sendMessage = sendMessage;
const validateID = (id) => {
    const regExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regExp.test(id);
};
exports.validateID = validateID;
const deleteUser = (userID, arr) => {
    const userIndex = arr.findIndex(item => item.data.user.id === userID);
    if (userIndex !== -1) {
        const deletedUser = arr.splice(userIndex, 1)[0];
        return deletedUser;
    }
    else {
        throw new Error('User is not founded');
    }
};
exports.deleteUser = deleteUser;
