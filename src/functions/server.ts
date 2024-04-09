import http from 'http';
import { ENDPOINT, HTTP_METHOD, STATUS_CODE } from '../types/types';
import { createUser, deleteUser, sendMessage, sendResponse, validateID } from './functions';
import { usersDB } from '../db/db';

export const createServer = () => {
    const server = http.createServer((req, res) => {
        try {
            if (req.method === HTTP_METHOD.GET && req.url === ENDPOINT) {
                sendResponse(res, STATUS_CODE.OK, usersDB);
            } else if (req.method === HTTP_METHOD.GET && req.url && req.url.startsWith(`${ENDPOINT}/`) && req.url.endsWith('/hobbies')) {
                console.log(req.url);
                const urlArray = req.url.split('/');
                const userID = urlArray[3];
                console.log(userID, 'userid');
                if (!userID) {
                    sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                } else {
                    const isValidate = validateID(userID);
                    if (!isValidate) {
                        sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
                    } else {
                        const user = usersDB.find((item) => {
                            console.log(item, 'item');
                            return item.data.user.id === userID;
                        });
                        if (user) {
                            console.log(user.data.user.hobbies)
                            sendResponse(res, STATUS_CODE.OK, user.data.user.hobbies);
                        } else {
                            sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                        };
                    };
                };
            }

            else if (req.method === HTTP_METHOD.GET && req.url && req.url.startsWith(`${ENDPOINT}/`)) {
                const urlArray = req.url.split('/');
                const userID = urlArray[urlArray.length - 1];
                if (!userID || userID === '') {
                    sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                } else {
                    const isValidate = validateID(userID);
                    if (!isValidate) {
                        sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
                    } else {
                        const user = usersDB.find((item) => {
                            return item.data.user.id === userID;
                        });
                        if (user) {
                            sendResponse(res, STATUS_CODE.CREATED, user);
                        } else {
                            sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                        };
                    };
                };
            }

            else if (req.method === HTTP_METHOD.POST && req.url === ENDPOINT) {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    try {
                        const parsedUser = JSON.parse(body);
                        const newUser = createUser(parsedUser, usersDB);
                        sendResponse(res, STATUS_CODE.CREATED, newUser);
                    } catch (err) {
                        sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid User Data');
                    };
                });
            }
            else if (req.method === HTTP_METHOD.PATCH && req.url && req.url.startsWith(`${ENDPOINT}/`) && req.url.endsWith('/hobbies')) {
                const urlArray = req.url.split('/');
                const userID = urlArray[3];
                if (!userID) {
                    sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                } else {
                    const isValidate = validateID(userID);
                    if (!isValidate) {
                        sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
                    } else {
                        const user = usersDB.find((item) => {
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
                                    const unique = [...new Set(updatedHobbies.hobbies)] as string[];
                                    console.log(unique)
                                    user.data.user.hobbies = unique;
                                    sendResponse(res, STATUS_CODE.OK, user);
                                } catch (err) {
                                    sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid User Data. Please contain all required fields');
                                };
                            });
                        } else {
                            sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                        };
                    };
                };
            }

            else if (req.method === HTTP_METHOD.DELETE && req.url && req.url.startsWith(`${ENDPOINT}/`)) {
                const urlArray = req.url.split('/');
                const userID = urlArray[urlArray.length - 1];
                if (!userID) {
                    sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
                } else {
                    const isValidate = validateID(userID);
                    if (!isValidate) {
                        sendMessage(res, STATUS_CODE.BAD_REQUEST, 'Invalid userId. Please enter a valid uuidv4');
                    } else {
                        const deletedUser = deleteUser(userID, usersDB);
                        sendResponse(res, STATUS_CODE.OK, deletedUser);
                    };
                };
            } else {
                sendMessage(res, STATUS_CODE.NOT_FOUND, 'The requested resource was not found');
            };
        } catch (err) {
            sendMessage(res, STATUS_CODE.INTERNAL_SERVER_ERROR, 'Internal server error');
            throw new Error('Internal server error');
        };
    });
    server.on('error', (err: NodeJS.ErrnoException) => {
        console.error('Server starting error:', err.code);
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${8000} is already using`);
        };
    });
    return server;
};