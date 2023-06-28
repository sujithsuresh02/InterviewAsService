"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminauthenticateToken = void 0;
const authserviceinterface_1 = require("../../../application/services/authserviceinterface");
const authserviceimplementaion_1 = require("../../services/authserviceimplementaion");
const authservicemiddleware = (0, authserviceinterface_1.authServiceInterface)((0, authserviceimplementaion_1.authServiceImplementation)());
const adminauthenticateToken = (req, res, next) => {
    console.log("hi");
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    console.log("auth header");
    if (!authHeader) {
        console.log("Access token not found");
        return;
    }
    const accessToken = authHeader.split("access_token=")[1].split(",")[0];
    const refreshToken = authHeader.split("refresh_token=")[1].split(",")[0];
    console.log(accessToken);
    console.log("access token");
    console.log(refreshToken);
    console.log("refresh token");
    if (!accessToken) {
        console.log("Access token not found");
        return;
    }
    const decoded = authservicemiddleware.verifyAccessToken(accessToken);
    console.log(decoded);
    if (!decoded) {
        console.log("Invalid access token");
        return;
    }
    if (decoded.role === "admin") {
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(currentTime);
        console.log(decoded.exp && decoded.exp < currentTime);
        if (decoded.exp && decoded.exp < currentTime) {
            console.log("Token has expired");
            if (!refreshToken) {
                console.log("Refresh token not found");
            }
            console.log('referesjh');
            const refreshDecoded = authservicemiddleware.verifyRefereshToken(refreshToken);
            if (!refreshDecoded) {
                console.log("Invalid refresh token");
            }
            console.log('access');
            const name = refreshDecoded.name;
            const role = refreshDecoded.role;
            const id = refreshDecoded.id;
            req.name = name;
            req.role = role;
            req.id = id;
            const newAccessToken = authservicemiddleware.generateAcessesToken(refreshDecoded);
            next();
        }
        else {
            console.log(decoded);
            console.log('access vvdcbccv');
            console.log('below');
            req.id = decoded.id;
            req.name = decoded.name;
            next();
        }
    }
    else {
        console.log("You are restricted from accessing this API");
        return;
    }
};
exports.adminauthenticateToken = adminauthenticateToken;
