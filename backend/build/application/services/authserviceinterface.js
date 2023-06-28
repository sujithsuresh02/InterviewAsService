"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const encryptPassword = (password) => service.encryptPassword(password);
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    const generateAcessesToken = (payload) => service.generateAcessesToken(payload);
    const generateRefreshTokenToken = (payload) => service.generateRefreshTokenToken(payload);
    const verifyAccessToken = (token) => service.verifyAccessToken(token);
    const verifyRefereshToken = (token) => service.verifyRefreshToken(token);
    return {
        encryptPassword,
        comparePassword,
        generateAcessesToken,
        generateRefreshTokenToken,
        verifyAccessToken,
        verifyRefereshToken
    };
};
exports.authServiceInterface = authServiceInterface;
