"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateInterviewToken = exports.interviewExperts = void 0;
const interviewExperts = async (formData, InterviewExpertDbRepository) => {
    const response = InterviewExpertDbRepository.becomeInterviewExperts(formData);
    return response;
};
exports.interviewExperts = interviewExperts;
const authenticateInterviewToken = async (interviewToken, InterviewExpertDbRepository) => {
    return InterviewExpertDbRepository.valiadteToken(interviewToken);
};
exports.authenticateInterviewToken = authenticateInterviewToken;
