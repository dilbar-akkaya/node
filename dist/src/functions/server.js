"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const http_1 = __importDefault(require("http"));
const types_1 = require("../types/types");
const functions_1 = require("./functions");
const db_1 = require("../db/db");
const createServer = () => {
    const server = http_1.default.createServer((req, res) => {
        try {
            if (req.method === types_1.HTTP_METHOD.GET && req.url === types_1.ENDPOINT) {
                (0, functions_1.sendResponse)(res, types_1.STATUS_CODE.OK, db_1.usersDB);
            }
            else if (req.method === types_1.HTTP_METHOD.GET && req.url && req.url.startsWith(`${types_1.ENDPOINT}/`) && req.url.endsWith('/hobbies')) {
                console.log(req.url);
                const urlArray = req.url.split('/');
                const userID = urlArray[3];
                console.log(userID, 'userid');
                if (!userID) {
                    (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                }
                else {
                    const isValidate = (0, functions_1.validateID)(userID);
                    if (!isValidate) {
                        (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
                    }
                    else {
                        const user = db_1.usersDB.find((item) => {
                            console.log(item, 'item');
                            return item.data.user.id === userID;
                        });
                        if (user) {
                            console.log(user.data.user.hobbies);
                            (0, functions_1.sendResponse)(res, types_1.STATUS_CODE.OK, user.data.user.hobbies);
                        }
                        else {
                            (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            else if (req.method === types_1.HTTP_METHOD.GET && req.url && req.url.startsWith(`${types_1.ENDPOINT}/`)) {
                const urlArray = req.url.split('/');
                const userID = urlArray[urlArray.length - 1];
                if (!userID || userID === '') {
                    (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                }
                else {
                    const isValidate = (0, functions_1.validateID)(userID);
                    if (!isValidate) {
                        (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
                    }
                    else {
                        const user = db_1.usersDB.find((item) => {
                            return item.data.user.id === userID;
                        });
                        if (user) {
                            (0, functions_1.sendResponse)(res, types_1.STATUS_CODE.CREATED, user);
                        }
                        else {
                            (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            else if (req.method === types_1.HTTP_METHOD.POST && req.url === types_1.ENDPOINT) {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    try {
                        const parsedUser = JSON.parse(body);
                        const newUser = (0, functions_1.createUser)(parsedUser, db_1.usersDB);
                        (0, functions_1.sendResponse)(res, types_1.STATUS_CODE.CREATED, newUser);
                    }
                    catch (err) {
                        (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.BAD_REQUEST, 'Invalid User Data');
                    }
                    ;
                });
            }
            else if (req.method === types_1.HTTP_METHOD.PATCH && req.url && req.url.startsWith(`${types_1.ENDPOINT}/`) && req.url.endsWith('/hobbies')) {
                const urlArray = req.url.split('/');
                const userID = urlArray[3];
                if (!userID) {
                    (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                }
                else {
                    const isValidate = (0, functions_1.validateID)(userID);
                    if (!isValidate) {
                        (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
                    }
                    else {
                        const user = db_1.usersDB.find((item) => {
                            console.log(item, 'item');
                            return item.data.user.id === userID;
                        });
                        if (user) {
                            let body = '';
                            req.on('data', (chunk) => {
                                body += chunk;
                            });
                            req.on('end', () => {
                                try {
                                    const updatedHobbies = JSON.parse(body);
                                    console.log(updatedHobbies, "hobbies");
                                    const unique = [...new Set(updatedHobbies.hobbies)];
                                    console.log(unique);
                                    user.data.user.hobbies = unique;
                                    (0, functions_1.sendResponse)(res, types_1.STATUS_CODE.OK, user);
                                }
                                catch (err) {
                                    (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.BAD_REQUEST, 'Invalid User Data. Please contain all required fields');
                                }
                                ;
                            });
                        }
                        else {
                            (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            else if (req.method === types_1.HTTP_METHOD.DELETE && req.url && req.url.startsWith(`${types_1.ENDPOINT}/`)) {
                const urlArray = req.url.split('/');
                const userID = urlArray[urlArray.length - 1];
                if (!userID) {
                    (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                }
                else {
                    const isValidate = (0, functions_1.validateID)(userID);
                    if (!isValidate) {
                        (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
                    }
                    else {
                        const deletedUser = (0, functions_1.deleteUser)(userID, db_1.usersDB);
                        (0, functions_1.sendResponse)(res, types_1.STATUS_CODE.OK, deletedUser);
                    }
                    ;
                }
                ;
            }
            else {
                (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
            }
            ;
        }
        catch (err) {
            (0, functions_1.sendMessage)(res, types_1.STATUS_CODE.INTERNAL_SERVER_ERROR, 'Internal server error');
            throw new Error('Internal server error');
        }
        ;
    });
    server.on('error', (err) => {
        console.error('Server starting error:', err.code);
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${8000} is already using`);
        }
        ;
    });
    return server;
};
exports.createServer = createServer;
