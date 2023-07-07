"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Interviewer_1 = require("../../../application/useCases/Interviewer/Interviewer");
const interviwerController = (interviwerDbInterface, interviwerDbImplementation) => {
    const interviwerDbRepositort = interviwerDbInterface(interviwerDbImplementation());
    const addAvailableTimeSlot = (0, express_async_handler_1.default)(async (req, res) => {
        const interviewerId = req.id;
        console.log(interviewerId, "id");
        console.log(req.body);
        const { date, dayOfWeek, times } = req.body;
        //  const newdate: Date=date.toDateString();
        //  console.log(newdate);
        const newdate = date;
        const timeSlots = {
            newdate,
            dayOfWeek,
            times,
            interviewerId,
        };
        console.log("hjkl");
        const response = await (0, Interviewer_1.addTimeSlot)(timeSlots, interviwerDbRepositort);
        if (response) {
            res.json({
                message: "Time Upadted Successfully",
            });
        }
    });
    const getallTimeslots = (0, express_async_handler_1.default)(async (req, res) => {
        const resposne = await (0, Interviewer_1.viewAllInterviewerTimeslots)(interviwerDbRepositort);
        if (resposne) {
            res.json({
                resposne,
            });
        }
    });
    const getAllSchedulledInterviews = (0, express_async_handler_1.default)(async (req, res) => {
        const interviewerId = req.id;
        const resposne = await (0, Interviewer_1.getInterviews)(interviewerId, interviwerDbRepositort);
        console.log(resposne);
        if (resposne) {
            res.json({
                resposne,
            });
        }
    });
    const updateFeedback = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        const { codingScore, communicationScore, feedbackDescription, technicalScore, interviewId, TotalInterviewScore, } = req.body;
        const feedbackDetails = {
            codingScore,
            communicationScore,
            feedbackDescription,
            technicalScore,
            interviewId,
            TotalInterviewScore,
        };
        console.log(feedbackDetails);
        const response = await (0, Interviewer_1.addInterviewFeedBack)(feedbackDetails, interviwerDbRepositort);
        if (response) {
            res.json({
                message: "Feedback Details Updated Successfully",
            });
        }
    });
    const datewiseInterviewsListing = (0, express_async_handler_1.default)(async (req, res) => {
        const response = await (0, Interviewer_1.DailyInterviews)(interviwerDbRepositort);
        console.log(response);
        if (response) {
            res.json({
                response,
            });
        }
    });
    const completedInterviews = (0, express_async_handler_1.default)(async (req, res) => {
        const interviewerId = req.id;
        const result = await (0, Interviewer_1.interviewsCompleted)(interviewerId, interviwerDbRepositort);
        if (result) {
            res.json({
                result,
            });
        }
    });
    const getIntreviewerData = (0, express_async_handler_1.default)(async (req, res) => {
        const interviewerId = req.id;
        const result = await (0, Interviewer_1.interviewerDetails)(interviewerId, interviwerDbRepositort);
        console.log(result);
        res.json({
            result,
        });
    });
    const editProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const { username, changeEmail } = req.body;
        const interviewerId = req.id;
        const result = await (0, Interviewer_1.editProfileDetails)(username, changeEmail, interviewerId, interviwerDbRepositort);
        if (result) {
            res.json({
                message: "Profile Updated SuccessFully",
            });
        }
    });
    return {
        addAvailableTimeSlot,
        getallTimeslots,
        getAllSchedulledInterviews,
        updateFeedback,
        datewiseInterviewsListing,
        completedInterviews,
        getIntreviewerData,
        editProfile,
    };
};
exports.default = interviwerController;
