"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyRepostoriesImplementation_1 = require("../../database/Postgres/repositories/companyRepostoriesImplementation");
const companyRepositoriesInterface_1 = require("../../../application/repositories/companyRepositoriesInterface");
const authserviceimplementaion_1 = require("../../services/authserviceimplementaion");
const authserviceinterface_1 = require("../../../application/services/authserviceinterface");
const authControllers_1 = __importDefault(require("../../../adapters/authControllers"));
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authControllers_1.default)(authserviceinterface_1.authServiceInterface, authserviceimplementaion_1.authServiceImplementation, companyRepositoriesInterface_1.companyDbRepository, companyRepostoriesImplementation_1.companyDbRepositoryImplementation);
    router.post('/signup', controller.registerCompany);
    router.post('/login', controller.login);
    router.post('/sign_in_with_google', controller.loginWithGoogle);
    return router;
};
exports.default = authRouter;
