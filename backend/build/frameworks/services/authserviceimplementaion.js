"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceImplementation = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const authServiceImplementation = () => {
    const encryptPassword = async (password) => {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        return hashedPassword;
    };
    const comparePassword = (password, hashedPassword) => {
        return bcryptjs_1.default.compare(password, hashedPassword);
    };
    const generateAcessesToken = (payload) => {
        const acessesToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, {
            expiresIn: "1d",
        });
        return acessesToken;
    };
    const generateRefreshTokenToken = (payload) => {
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, {
            expiresIn: "7d",
        });
        return refreshToken;
    };
    const verifyAccessToken = (token) => {
        try {
            console.log('hlo access');
            return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        }
        catch (error) {
            console.log(error, "error in database ");
        }
    };
    const verifyRefreshToken = (token) => {
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    };
    return {
        encryptPassword,
        comparePassword,
        generateAcessesToken,
        generateRefreshTokenToken,
        verifyAccessToken,
        verifyRefreshToken,
    };
};
exports.authServiceImplementation = authServiceImplementation;
