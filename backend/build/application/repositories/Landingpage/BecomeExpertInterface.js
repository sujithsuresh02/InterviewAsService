"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.becomeexpertsDbInterface = void 0;
const becomeexpertsDbInterface = (implementationRepository) => {
    const becomeInterviewExperts = async (formData) => {
        return implementationRepository.postInterviewExpert(formData);
    };
    const valiadteToken = async (interviewToken) => {
        return await implementationRepository.validateinterviewToken(interviewToken);
    };
    return {
        becomeInterviewExperts,
        valiadteToken
    };
};
exports.becomeexpertsDbInterface = becomeexpertsDbInterface;
