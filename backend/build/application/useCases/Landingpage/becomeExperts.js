"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateInterviewToken = exports.interviewExperts = void 0;
const interviewExperts = async (formData, InterviewExpertDbRepository) => {
    return await InterviewExpertDbRepository.becomeInterviewExperts(formData);
};
exports.interviewExperts = interviewExperts;
const authenticateInterviewToken = async (interviewToken, InterviewExpertDbRepository) => {
    return await InterviewExpertDbRepository.valiadteToken(interviewToken);
};
exports.authenticateInterviewToken = authenticateInterviewToken;
