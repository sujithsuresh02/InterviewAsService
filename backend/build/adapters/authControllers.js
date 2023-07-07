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
                result,
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
            status: "success",
            message: "user verified",
            token,
        });
    });
    const valiadteSignup = (0, express_async_handler_1.default)(async (req, res) => {
        const token = req.params.token;
        const validationToken = await (0, auth_1.signupPageValidation)(token, dbRepositoryCompany);
        console.log(validationToken, "validation token");
        res.json({
            validationToken: validationToken,
        });
    });
    const valiadteInterviewerSignup = (0, express_async_handler_1.default)(async (req, res) => {
        const token = req.params.token;
        const validationToken = await (0, auth_1.interviewerSignupValidation)(token, dbRepositoryCompany);
        console.log(validationToken, "validation token");
        res.json({
            validationToken: validationToken,
        });
    });
    const forgotPassword = async (req, res) => {
        console.log(req.body);
        const { email } = req.body;
        console.log(email, "from controller");
        const response = await (0, auth_1.forgottingPassword)(email, dbRepositoryCompany, authService);
        if (response === true) {
            res.json({
                message: "For Changing The Password The Link Has Sent To Registread Email  Successfully",
            });
        }
    };
    const changePassword = async (req, res) => {
        console.log(req.body);
        const { newPassword, email, role } = req.body;
        const response = await (0, auth_1.changingPasssword)(newPassword, email, role, dbRepositoryCompany, authService);
        if (response) {
            res.json({
                message: "Your Password Is Changed Successfully ",
            });
        }
    };
    const valiadateForgotpassword = async (req, res) => {
        const token = req.params.token;
        const response = await (0, auth_1.forgotPasswordValidation)(token, dbRepositoryCompany);
        console.log(response);
        if (response) {
            res.json({
                response,
            });
        }
    };
    return {
        registerCompany,
        login,
        loginWithGoogle,
        valiadteSignup,
        valiadteInterviewerSignup,
        forgotPassword,
        changePassword,
        valiadateForgotpassword,
    };
};
exports.default = authcontroller;
