"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Becomeinterviewexperts_1 = __importDefault(require("../../../adapters/controllers/Landingpage/Becomeinterviewexperts"));
const multer_1 = require("../../services/multer");
const becomeexpertsImplementation_1 = require("../../database/Postgres/repositories/Landingpage/becomeexpertsImplementation");
const BecomeExpertInterface_1 = require("../../../application/repositories/Landingpage/BecomeExpertInterface");
const interviewexpertLandingRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, Becomeinterviewexperts_1.default)(BecomeExpertInterface_1.becomeexpertsDbInterface, becomeexpertsImplementation_1.becomeExpertsImplementation);
    router.post("/become_interviewexpert", multer_1.upload, controller.postInterviewExpert);
    router.get("/validate_interviewToken/:token", controller.validateInterviewToken);
    return router;
};
exports.default = interviewexpertLandingRouter;
