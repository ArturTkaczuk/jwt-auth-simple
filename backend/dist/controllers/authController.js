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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.loginUser = exports.registerUser = exports.test = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = require("../helpers/bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
        const userFoundInDB = yield user_1.UserModel.findOne({ email });
        if (userFoundInDB) {
            return res.json({ error: "email is already in use" });
        }
        const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
        const newUser = yield user_1.UserModel.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.json(newUser);
    }
    catch (error) {
        console.error(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userFoundInDB = yield user_1.UserModel.findOne({ email });
        const userWasNotFoundInDB = !userFoundInDB;
        if (userWasNotFoundInDB) {
            return res.json({ error: "user doesn't exist" });
        }
        const hashedPassword = userFoundInDB.password;
        const passwordsMatch = yield (0, bcrypt_1.comparePassword)(password, hashedPassword);
        if (passwordsMatch) {
            jsonwebtoken_1.default.sign({
                id: userFoundInDB._id,
                email: userFoundInDB.email,
                name: userFoundInDB.name,
            }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err)
                    throw err;
                return res.cookie("token", token).json(userFoundInDB);
            });
        }
        else {
            return res.json({ error: "incorrect password" });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.loginUser = loginUser;
const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err)
                throw err;
            res.json(user);
        });
    }
    else {
        res.json(null);
    }
};
exports.getProfile = getProfile;
