"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (passwordHash) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.genSalt(10, (err, salt) => {
            if (err)
                reject(err);
            bcrypt_1.default.hash(passwordHash, salt, (err, hash) => {
                if (err)
                    reject(err);
                resolve(hash);
            });
        });
    });
};
