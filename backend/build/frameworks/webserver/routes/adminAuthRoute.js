"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/controllers/Admin/authController"));
const adminImplementation_1 = require("../../database/Postgres/repositories/Admin/adminImplementation");
const adminRepostories_1 = require("../../../application/repositories/Admin/adminRepostories");
const adminServices_1 = require("../../services/adminServices");
const adminService_1 = require("../../../application/services/adminService");
const adminAuthRouter = () => {
    const controller = (0, authController_1.default)(adminRepostories_1.adminRepositoryInterface, adminImplementation_1.adminRepositoryImplementation, adminService_1.adminServiceInterface, adminServices_1.adminServiceImplementation);
    const router = express_1.default.Router();
    router.post('/signup', controller.adminSignup);
    router.post('/login', controller.adminLogin);
    return router;
};
exports.default = adminAuthRouter;
