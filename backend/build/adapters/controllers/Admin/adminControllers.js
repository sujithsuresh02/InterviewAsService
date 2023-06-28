"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const admins_1 = require("../../../application/useCases/Admin/admins");
const adminsController = (adminRepositoryInterface, adminRepositoryImplementation, adminServiceInterface, adminServiceImplementation) => {
    const adminDbRepostory = adminRepositoryInterface(adminRepositoryImplementation());
    const adminServiceRepostory = adminServiceInterface(adminServiceImplementation());
    const getAllRequest = (0, express_async_handler_1.default)(async (req, res) => {
        const fullRequest = await (0, admins_1.getFullRequest)(adminDbRepostory);
        console.log(fullRequest);
        res.json({
            fullRequest,
        });
    });
    const getStudentCVDetails = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.params.id);
        console.log("params");
        let id = req.params.id;
        const response = await (0, admins_1.getFullStudentDetils)(adminDbRepostory, id);
        res.json({
            response,
        });
    });
    const getDemoRequest = (0, express_async_handler_1.default)(async (req, res) => {
        const result = await (0, admins_1.getFullDemoRequest)(adminDbRepostory);
        res.json({
            result,
        });
    });
    const sendConfirmationMail = (0, express_async_handler_1.default)(async (req, res) => {
        console.log("controller entered");
        console.log(req.params.email);
        console.log("params");
        let email = req.params.email;
        console.log(req.params.email);
        const result = await (0, admins_1.sendConfirmMail)(email, adminServiceRepostory);
        res.json({
            message: "Email has been Sent Successfully",
        });
    });
    const postSubscriptionPlans = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        console.log("controllers");
        const { features, interviews, planName, price, validity } = req.body;
        const plansData = {
            features,
            interviews,
            planName,
            price,
            validity,
        };
        const response = await (0, admins_1.postPlans)(plansData, adminDbRepostory);
        if (response) {
            res.json({
                status: "Success",
                message: "Plan Added Successfully",
            });
        }
    });
    const getFullPlans = (0, express_async_handler_1.default)(async (req, res) => {
        console.log("cnssnjhl");
        const fullPlans = await (0, admins_1.getAllPlans)(adminDbRepostory);
        if (fullPlans) {
            res.json({
                fullPlans,
            });
        }
    });
    const deletePlan = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.params.id);
        const Id = req.params.id;
        const response = await (0, admins_1.deletePlans)(Id, adminDbRepostory);
        if (response) {
            res.json({
                id: Id,
                status: "Success",
                message: "Plan Deleted Successfully",
            });
        }
    });
    const editPlans = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        const { features, interviews, planName, price, validity, planId } = req.body;
        const plansData = {
            features,
            interviews,
            planName,
            price,
            validity,
            planId,
        };
        const editedResponse = await (0, admins_1.editPlan)(plansData, adminDbRepostory);
        if (editedResponse) {
            res.json({
                status: "Success",
                message: "Plans Updated  Successfully",
            });
        }
    });
    const assignInterviwer = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.params.id);
        const studentId = req.params.id;
        const response = await (0, admins_1.assignTimeSlot)(studentId, adminDbRepostory);
        if (response) {
            res.json({
                response,
            });
        }
    });
    const getAllTimeSlotDetails = (0, express_async_handler_1.default)(async (req, res) => {
        const response = await (0, admins_1.getTimeSlotDetails)(adminDbRepostory);
        if (response) {
            res.json({
                response,
            });
        }
    });
    const getAllInterviewerRequest = (0, express_async_handler_1.default)(async (req, res) => {
        const result = await (0, admins_1.getIntervieweExpertsRequest)(adminDbRepostory);
        if (result) {
            res.json({
                result,
            });
        }
    });
    const interviewerEmailConfirmation = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.params.email);
        const email = req.params.email;
        const response = await (0, admins_1.emailConfirmation)(email, adminDbRepostory, adminServiceRepostory);
        if (response) {
            res.json({
                message: "Email Sent Succesfully",
            });
        }
    });
    const sentEmailRejection = (0, express_async_handler_1.default)(async (req, res) => {
        const id = req.params.id;
        const email = req.params.email;
        const interviewerId = await (0, admins_1.rejectionMail)(email, id, adminServiceRepostory, adminDbRepostory);
        if (interviewerId) {
            res.json({
                message: "Rejection Mail Successfully Sent",
                interviewerId,
            });
        }
    });
    const postAssignInterviewer = (0, express_async_handler_1.default)(async (req, res) => {
        console.log("fucntion entered");
        console.log();
        console.log(req.body);
        const { interviewerId, studentId, SelectedDate, selectedTime, interviewerEmail, studentEmail, TimeslotId, } = req.body;
        const date = new Date(SelectedDate);
        console.log(date, "sgschgsdhsd");
        const interviewDetails = {
            interviewerId,
            studentId,
            selectedTime,
            SelectedDate,
            TimeslotId,
        };
        const interviewToken = await (0, admins_1.assignInterviewer)(interviewDetails, interviewerEmail, studentEmail, adminDbRepostory, adminServiceRepostory);
        if (interviewToken) {
            res.json({
                message: "Successfully Scheduled Interviewer",
                interviewToken,
            });
        }
    });
    const getAllScheduledInterviews = (0, express_async_handler_1.default)(async (req, res) => {
        const response = await (0, admins_1.getFullScheduledInterviews)(adminDbRepostory);
        console.log(response, "resposne");
        if (response) {
            res.json({
                response,
            });
        }
    });
    const cancelInterview = (0, express_async_handler_1.default)(async (req, res) => {
        const { interviewId } = req.body;
        console.log(interviewId);
        const result = await (0, admins_1.interviewCancellation)(interviewId, adminDbRepostory);
        if (result) {
            res.json({
                message: "Interview Is Cancelled Successfully",
            });
        }
    });
    const cancelledInterViews = (0, express_async_handler_1.default)(async (req, res) => {
        const result = await (0, admins_1.interviewCancelled)(adminDbRepostory);
        if (result) {
            res.json({
                result,
            });
        }
    });
    const daywiseSubscriptionCount = (0, express_async_handler_1.default)(async (req, res) => {
        const response = await (0, admins_1.subscriptionCount)(adminDbRepostory);
        console.log(response);
        if (response.length > 0) {
            res.json({
                response,
            });
        }
    });
    const monthlySubscriptionCount = (0, express_async_handler_1.default)(async (req, res) => {
        const response = await (0, admins_1.monthwiseSubscriptionCount)(adminDbRepostory);
        console.log(response);
        if (response.length > 0) {
            res.json({
                response,
            });
        }
    });
    const totalClientCount = (0, express_async_handler_1.default)(async (req, res) => {
        const response = await (0, admins_1.totalClientAndInterviewsCount)(adminDbRepostory);
        console.log(response);
        if (response) {
            res.json({
                response,
            });
        }
    });
    const fullSubscriptionHistory = (0, express_async_handler_1.default)(async (req, res) => {
        const companyId = req.params.companyId;
        console.log(companyId);
        const response = await (0, admins_1.getAllSubscriptionHistory)(companyId, adminDbRepostory);
        if (response) {
            res.json({
                response,
            });
        }
    });
    const checkInterviewStatus = (0, express_async_handler_1.default)(async (req, res) => {
        const companyId = req.params.companyId;
        console.log(companyId);
        const response = await (0, admins_1.checkingInterviewStatus)(companyId, adminDbRepostory);
        res.json({
            response,
        });
    });
    return {
        getAllRequest,
        getStudentCVDetails,
        getDemoRequest,
        sendConfirmationMail,
        postSubscriptionPlans,
        getFullPlans,
        deletePlan,
        editPlans,
        assignInterviwer,
        getAllTimeSlotDetails,
        getAllInterviewerRequest,
        interviewerEmailConfirmation,
        sentEmailRejection,
        postAssignInterviewer,
        getAllScheduledInterviews,
        cancelInterview,
        cancelledInterViews,
        daywiseSubscriptionCount,
        monthlySubscriptionCount,
        totalClientCount,
        fullSubscriptionHistory,
        checkInterviewStatus,
    };
};
exports.default = adminsController;
