"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../application/useCases/auth");
const authcontroller = (authServiceInterface, authServiceImplementation, CompanyDbInterface, companyDbImplementation) => {
    const dbRepositoryCompany = CompanyDbInterface(companyDbImplementation());
    const authService = authServiceInterface(authServiceImplementation());
    const registerCompany = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        console.log("req.body");
        const { role, name, email, password } = req.body;
        const signupDetails = {
            role,
            name,
            email,
            password,
        };
        console.log("jnjffjgkfjg");
        const result = await (0, auth_1.companyRegister)(signupDetails, dbRepositoryCompany, authService);
        if (result) {
            res.json({
                status: "success",
                message: " Registered  Successfully",
                result
            });
        }
    });
    const login = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const loginDetails = {
            email: email,
            password: password,
        };
        console.log(loginDetails);
        let loggedInDetails = await (0, auth_1.performLogin)(loginDetails, dbRepositoryCompany, authService);
        res.json({
            status: "success",
            message: "Role Is Verified",
            loggedInDetails,
        });
    });
    const loginWithGoogle = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        const userDetails = req.body;
        const user = {
            name: userDetails?.currentUser?.displayName,
            email: userDetails?.currentUser?.email,
        };
        console.log(user);
        const token = await (0, auth_1.googleUserLogin)(user, dbRepositoryCompany, authService);
        res.json({
            status: 'success',
            message: 'user verified',
            token,
        });
    });
    return {
        registerCompany,
        login,
        loginWithGoogle
    };
};
exports.default = authcontroller;
