"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InterviewerInterface_1 = require("../../../application/repositories/Interviewer/InterviewerInterface");
const InterviewerImplementation_1 = require("../../database/Postgres/repositories/Interviewer/InterviewerImplementation");
const InterviewerController_1 = __importDefault(require("../../../adapters/controllers/Interviewer/InterviewerController"));
const interviwerRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, InterviewerController_1.default)(InterviewerInterface_1.interviwerDbInterface, InterviewerImplementation_1.interviwerDbImplementation);
    router.post("/addtime_slot", controller.addAvailableTimeSlot);
    router.get("/view_timeslots", controller.getallTimeslots);
    router.get("/view_interviews", controller.getAllSchedulledInterviews);
    router.put("/add_feedback", controller.updateFeedback);
    router.get("/daily_interviews", controller.datewiseInterviewsListing);
    router.get("/completed_Interviews", controller.completedInterviews);
    router.get("/interviewer_Details", controller.getIntreviewerData);
    router.put("/edit_profile", controller.editProfile);
    return router;
};
exports.default = interviwerRouter;
