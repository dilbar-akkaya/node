"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENDPOINT = exports.CONTENT_TYPES = exports.STATUS_CODE = exports.HTTP_METHOD = void 0;
var HTTP_METHOD;
(function (HTTP_METHOD) {
    HTTP_METHOD["GET"] = "GET";
    HTTP_METHOD["POST"] = "POST";
    HTTP_METHOD["PATCH"] = "PATCH";
    HTTP_METHOD["DELETE"] = "DELETE";
})(HTTP_METHOD || (exports.HTTP_METHOD = HTTP_METHOD = {}));
;
var STATUS_CODE;
(function (STATUS_CODE) {
    STATUS_CODE[STATUS_CODE["OK"] = 200] = "OK";
    STATUS_CODE[STATUS_CODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    STATUS_CODE[STATUS_CODE["NOT_FOUND"] = 404] = "NOT_FOUND";
    STATUS_CODE[STATUS_CODE["CREATED"] = 201] = "CREATED";
    STATUS_CODE[STATUS_CODE["NO_CONTENT"] = 204] = "NO_CONTENT";
    STATUS_CODE[STATUS_CODE["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(STATUS_CODE || (exports.STATUS_CODE = STATUS_CODE = {}));
;
var CONTENT_TYPES;
(function (CONTENT_TYPES) {
    CONTENT_TYPES["TextPlain"] = "text/plain";
    CONTENT_TYPES["ApplicationJSON"] = "application/json";
})(CONTENT_TYPES || (exports.CONTENT_TYPES = CONTENT_TYPES = {}));
exports.ENDPOINT = '/api/users';
