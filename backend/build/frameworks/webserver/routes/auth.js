"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authImplementation_1 = require("../../database/Postgres/repositories/authImplementation");
const authInterface_1 = require("../../../application/repositories/authInterface");
const authserviceimplementaion_1 = require("../../services/authserviceimplementaion");
const authserviceinterface_1 = require("../../../application/services/authserviceinterface");
const authControllers_1 = __importDefault(require("../../../adapters/authControllers"));
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authControllers_1.default)(authserviceinterface_1.authServiceInterface, authserviceimplementaion_1.authServiceImplementation, authInterface_1.companyDbRepository, authImplementation_1.companyDbRepositoryImplementation);
    router.post('/signup', controller.registerCompany);
    router.post('/login', controller.login);
    router.post('/sign_in_with_google', controller.loginWithGoogle);
    router.get('/signup/:token', controller.valiadteSignup);
    router.get('/validate_interviewer/:token', controller.valiadteInterviewerSignup);
    router.post('/enter_email', controller.forgotPassword);
    router.post('/changepassword', controller.changePassword);
    router.get('/validate_forgotpassword/:token', controller.valiadateForgotpassword);
    return router;
};
exports.default = authRouter;
