"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyRepostories_1 = require("../../database/Postgres/repositories/company/companyRepostories");
const companyRepostories_2 = require("../../../application/repositories/companyRepositories/companyRepostories");
const companyControllers_1 = __importDefault(require("../../../adapters/controllers/company/companyControllers"));
const companyService_1 = require("../../services/companyService");
const companyServiceInterface_1 = require("../../../application/services/companyServiceInterface");
const adminImplementation_1 = require("../../database/Postgres/repositories/Admin/adminImplementation");
const adminRepostories_1 = require("../../../application/repositories/Admin/adminRepostories");
adminImplementation_1.adminRepositoryImplementation;
const LandingRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, companyControllers_1.default)(companyRepostories_2.companyDbInterface, companyRepostories_1.companiesDbImplementation, companyServiceInterface_1.companyServiceInterface, companyService_1.companyServiceImplementation, adminRepostories_1.adminRepositoryInterface, adminImplementation_1.adminRepositoryImplementation);
    router.post("/demo", controller.postDemo);
    //  router.post("/become_interviewexperts",interviewExpertUpload.single('cv'),controller.postDemo)
    return router;
};
exports.default = LandingRouter;
