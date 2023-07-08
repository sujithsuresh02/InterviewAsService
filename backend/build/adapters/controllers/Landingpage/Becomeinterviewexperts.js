"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const becomeExperts_1 = require("../../../application/useCases/Landingpage/becomeExperts");
const interviewexpertsController = (becomeExpertInterface, becomeExpertsImplementation) => {
    const interviewExpertsDbRepository = becomeExpertInterface(becomeExpertsImplementation());
    const postInterviewExpert = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body);
        console.log(req.file);
        const { fullName, phoneNumber, email, linkedIn, currentEmployer, experience, graduationYear, domainExpertise, message, } = req.body;
        console.log(req.file?.filename);
        const cvFile = req.file?.filename;
        const formData = {
            fullName,
            phoneNumber,
            email,
            linkedIn,
            cvFile: cvFile,
            currentEmployer,
            experience,
            graduationYear,
            domainExpertise,
            message,
        };
        const Tokens = await (0, becomeExperts_1.interviewExperts)(formData, interviewExpertsDbRepository);
        console.log(Tokens);
        res.json({
            message: "Form Submitted Successfully!!",
            Tokens: Tokens,
            status: "success",
        });
    });
    const validateInterviewToken = (0, express_async_handler_1.default)(async (req, res) => {
        const interviewToken = req.params.token;
        console.log(interviewToken);
        const resposne = await (0, becomeExperts_1.authenticateInterviewToken)(interviewToken, interviewExpertsDbRepository);
        if (express_1.response) {
            res.json({
                interviewtoken: resposne,
            });
        }
    });
    return {
        postInterviewExpert,
        validateInterviewToken,
    };
};
exports.default = interviewexpertsController;
