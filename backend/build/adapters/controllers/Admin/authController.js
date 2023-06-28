"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const admins_1 = require("../../../application/useCases/Admin/admins");
const adminAuthController = (adminRepositoryInterface, adminRepositoryImplementation, adminServiceInterface, adminServiceImplementation) => {
    const adminDbRepostory = adminRepositoryInterface(adminRepositoryImplementation());
    const adminServiceRepostory = adminServiceInterface(adminServiceImplementation());
    const adminSignup = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        const response = await (0, admins_1.adminsRegister)(req.body, adminDbRepostory, adminServiceRepostory);
        res.json({
            status: "Success",
            message: "Admin Creataed Successfully",
        });
    });
    const adminLogin = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        let loggedInDetails = await (0, admins_1.performAdminLogin)(req.body, adminDbRepostory, adminServiceRepostory);
        res.json({
            status: "success",
            message: "Admin Logged In Successfully",
            loggedInDetails,
        });
    });
    return {
        adminSignup,
        adminLogin,
    };
};
exports.default = adminAuthController;
