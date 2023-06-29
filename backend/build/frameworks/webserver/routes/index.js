"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const company_1 = __importDefault(require("./company"));
const adminAuthRoute_1 = __importDefault(require("./adminAuthRoute"));
const admin_1 = __importDefault(require("./admin"));
const Landing_1 = __importDefault(require("./Landing"));
const Interviewer_1 = __importDefault(require("./Interviewer"));
const companyinterviewerMiddleware_1 = require("../middlewares/companyinterviewerMiddleware");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const interviewExpertLanding_1 = __importDefault(require("./interviewExpertLanding"));
const ChatRoute_1 = __importDefault(require("./ChatRoute"));
const message_1 = __importDefault(require("./message"));
const routes = (app) => {
    app.use("/api/auth", (0, auth_1.default)());
    app.use("/api/chat", (0, ChatRoute_1.default)());
    app.use("/api/company", companyinterviewerMiddleware_1.authenticateToken, (0, company_1.default)());
    app.use("/api/admin/auth", (0, adminAuthRoute_1.default)());
    app.use("/api/admin", adminMiddleware_1.adminauthenticateToken, (0, admin_1.default)());
    app.use("/api", (0, Landing_1.default)());
    app.use("/api", (0, interviewExpertLanding_1.default)());
    app.use("/api/interviewer", companyinterviewerMiddleware_1.authenticateToken, (0, Interviewer_1.default)());
    app.use("/api/message", (0, message_1.default)());
};
exports.default = routes;
