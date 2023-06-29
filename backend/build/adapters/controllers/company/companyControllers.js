"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const companies_1 = require("../../../application/useCases/company/companies");
const companyController = (companyDbInterface, companiesDbImplementation, companyServiceInterface, companyServiceImplementation, adminRepositoryInterface, adminRepositoryImplementation) => {
    const CompanyDbRepository = companyDbInterface(companiesDbImplementation());
    const CompanyServiceRepository = companyServiceInterface(companyServiceImplementation());
    const adminDbRepostory = adminRepositoryInterface(adminRepositoryImplementation());
    const addRequest = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        const companyId = req.id;
        const { jobRole, jobDescription, optional, numberOfVacancy, TotalStudentsCount, } = req.body;
        console.log("controllers");
        const data = {
            jobRole,
            jobDescription,
            optional,
            numberOfVacancy,
            TotalStudentsCount,
            companyId,
        };
        let result = await (0, companies_1.postRequest)(data, CompanyDbRepository, CompanyServiceRepository);
        console.log(result);
        console.log("final");
        res.json({
            result,
        });
    });
    const uploadCv = (0, express_async_handler_1.default)(async (req, res) => {
        const { addrequestId } = req.body;
        const companyId = req.id;
        const filetype = req.file?.mimetype;
        const cvPath = req.file?.path;
        const cv = req.file?.originalname;
        const bufferData = req.file?.buffer;
        const cvDetails = {
            path: cvPath || undefined,
            filetype: filetype || undefined,
            Buffer: bufferData,
            companyId,
        };
        const result = await (0, companies_1.postRequestWithCVDetails)(cvDetails, addrequestId, CompanyDbRepository, CompanyServiceRepository);
        console.log(result);
        res.json({
            TotalUploadedCv: result,
        });
        console.log("nncontroller final");
    });
    const postDemo = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        const result = await (0, companies_1.postDemoRequest)(req.body, CompanyDbRepository);
        if (result) {
            res.json({
                message: "Form Submitted Successfully",
                result,
            });
        }
    });
    const getFullPlans = (0, express_async_handler_1.default)(async (req, res) => {
        const fullPlans = await (0, companies_1.getAllPlans)(adminDbRepostory);
        if (fullPlans) {
            res.json({
                fullPlans,
            });
        }
    });
    const subscriptions = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        const companyid = req.id;
        console.log(companyid, "id");
        const { price, planName, validity, id, interviews } = req.body;
        const subscriptionData = {
            planName: planName,
            totalAmount: price,
            planId: id,
            validity: validity,
            companyId: companyid,
            numberOfInterviews: interviews,
        };
        const order = await (0, companies_1.createSubscription)(subscriptionData, CompanyServiceRepository, CompanyDbRepository);
        if (order.orderId) {
            res.json({
                orderId: order.orderId,
            });
        }
    });
    const capturpayment = (0, express_async_handler_1.default)(async (req, res) => {
        let orderId = req.params.id;
        console.log(orderId);
        const companyid = req.id;
        console.log(companyid);
        const resposne = await (0, companies_1.verifyPayment)(orderId, companyid, CompanyServiceRepository, CompanyDbRepository);
        if (resposne) {
            res.json({
                status: "success",
            });
        }
    });
    const getAllPaymentHistory = (0, express_async_handler_1.default)(async (req, res) => {
        const companyId = req.id;
        const paymentHistory = await (0, companies_1.getFullPaymentHistort)(companyId, CompanyDbRepository);
        res.json({
            paymentHistory,
        });
    });
    const profileEdit = (0, express_async_handler_1.default)(async (req, res) => {
        const companyId = req.id;
        console.log(companyId, "id");
        const { username, changeEmail } = req.body;
        const editResponse = await (0, companies_1.editProfile)(username, changeEmail, companyId, CompanyDbRepository);
        console.log(editResponse, "profile resposne");
        if (editResponse === true) {
            res.json({
                message: "Profile Edited Successfully",
            });
        }
    });
    const getCompanyDetails = (0, express_async_handler_1.default)(async (req, res) => {
        const companyId = req.id;
        const response = await (0, companies_1.getSignupdata)(companyId, CompanyDbRepository);
        console.log(response, "response");
        res.json({
            response,
        });
    });
    const TotalUploadedCv = (0, express_async_handler_1.default)(async (req, res) => {
        const companyId = req.id;
        const response = await (0, companies_1.uploadedCvCount)(companyId, CompanyDbRepository);
        if (response) {
            res.json({
                response,
            });
        }
    });
    const resetPasswordEmailconfirmation = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        const { name, email } = req.body;
        const response = await (0, companies_1.passwordemailConfirmation)(email, name, CompanyServiceRepository, CompanyDbRepository);
        if (response) {
            res.json({
                message: "Reset Password Link Has Sent To Respective Email Id",
            });
        }
    });
    const postResetPassword = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        const companyId = req.id;
        const { newPassword, oldPassword } = req.body;
        const resposne = (0, companies_1.resetPassword)(newPassword, oldPassword, companyId, CompanyDbRepository, CompanyServiceRepository);
        if (express_1.response) {
            res.json({
                message: "Password Reseted Successfully",
            });
        }
    });
    const getFeedbackDetails = (0, express_async_handler_1.default)(async (req, res) => {
        const companyId = req.id;
        const response = await (0, companies_1.FeedbackDetails)(companyId, CompanyDbRepository);
        console.log(response);
        if (response) {
            res.json({
                response,
            });
        }
    });
    return {
        addRequest,
        uploadCv,
        postDemo,
        getFullPlans,
        subscriptions,
        capturpayment,
        getAllPaymentHistory,
        profileEdit,
        getCompanyDetails,
        TotalUploadedCv,
        resetPasswordEmailconfirmation,
        postResetPassword,
        getFeedbackDetails,
    };
};
exports.default = companyController;
