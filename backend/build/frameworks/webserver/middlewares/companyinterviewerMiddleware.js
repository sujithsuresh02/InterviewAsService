"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const authserviceinterface_1 = require("../../../application/services/authserviceinterface");
const authserviceimplementaion_1 = require("../../services/authserviceimplementaion");
const authservicemiddleware = (0, authserviceinterface_1.authServiceInterface)((0, authserviceimplementaion_1.authServiceImplementation)());
const authenticateToken = async (req, res, next) => {
    const authHeader = req?.headers?.authorization;
    console.log(authHeader);
    if (!authHeader) {
        console.log("Access token not found");
    }
    const accessToken = authHeader?.split("access_token=")[1].split(",")[0];
    const refreshToken = authHeader?.split("refresh_token=")[1].split(",")[0];
    console.log(accessToken, refreshToken, "-----------------------------------------------------------");
    if (!accessToken) {
        console.log("Access token not found");
    }
    const decoded = await authservicemiddleware.verifyAccessToken(accessToken);
    if (!decoded) {
        console.log("Invalid access token");
        if (!refreshToken) {
            res.json({
                refreshTokenErr: true,
                message: "Your Session Period Has Expired. Please Login To Continue...!",
            });
        }
        console.log("hlo");
        const refreshDecoded = await authservicemiddleware.verifyRefereshToken(refreshToken);
        if (!refreshDecoded) {
            res.json({
                refreshTokenErr: true,
                message: "Your Session Period Has Expired. Please Login To Continue...!",
            });
        }
        const { name, role, id } = refreshDecoded;
        req.name = name;
        req.role = role;
        req.id = id;
        const newAccessToken = await authservicemiddleware.generateAcessesToken({
            name,
            role,
            id,
        });
        console.log(newAccessToken, "newAccessToken");
        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
        next();
    }
    else {
        if (decoded.role === "company" || decoded.role === "interviewer") {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < currentTime) {
                console.log("Token has expired");
                const refreshToken = authHeader
                    .split("refresh_token=")[1]
                    .split(",")[0];
                if (!refreshToken) {
                    res.json({
                        refreshTokenErr: true,
                        message: "Your Session Period Has Expired. Please Login To Continue...!",
                    });
                }
                const refreshDecoded = await authservicemiddleware.verifyRefereshToken(refreshToken);
                console.log(refreshDecoded, "refreshDecoded");
                if (!refreshDecoded) {
                    console.log("refresh tojken expired");
                    res.json({
                        refreshTokenErr: true,
                        message: "Your Session Period Has Expired. Please Login To Continue...!",
                    });
                }
                const { name, role, id } = refreshDecoded;
                req.name = name;
                req.role = role;
                req.id = id;
                const newAccessToken = await authservicemiddleware.generateAcessesToken({ name, role, id });
                res.setHeader("authorization", `Bearer ${newAccessToken}`);
                next();
            }
            else {
                req.id = decoded.id;
                req.name = decoded.name;
                next();
            }
        }
        else {
            res.json({
                refreshTokenErr: true,
                message: "Your Session Period Has Expired. Please Login To Continue...!",
            });
        }
    }
};
exports.authenticateToken = authenticateToken;
