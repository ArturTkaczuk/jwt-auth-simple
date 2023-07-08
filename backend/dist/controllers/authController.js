"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.test = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = require("../helpers/bcrypt");
const test = (req, res) => {
    res.json("Test working");
};
exports.test = test;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // data validation
        if (!name) {
            return res.json({
                error: "name is required",
            });
        }
        if (!password) {
            return res.json({
                error: "password is required",
            });
        }
        if (password.length < 8) {
            return res.json({
                error: "password is less than 8 characters",
            });
        }
        const userExists = yield user_1.UserModel.findOne({ email });
        if (userExists) {
            return res.json({ error: "email is already in use" });
        }
        const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
        const user = yield user_1.UserModel.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.json(user);
    }
    catch (error) {
        console.error(error);
    }
});
exports.registerUser = registerUser;
