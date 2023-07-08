"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.becomeExpertsImplementation = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../../Connection/connection");
const becomeInterviewExperts_1 = require("../../models/becomeInterviewExperts");
connection_1.sequelize
    .sync()
    .then(() => {
    console.log("Database synchronized successfully!");
})
    .catch((error) => { });
const interviewexperts = (0, becomeInterviewExperts_1.initInterviewExpertModal)(connection_1.sequelize);
const becomeExpertsImplementation = () => {
    const postInterviewExpert = async ({ fullName, currentEmployer, linkedIn, phoneNumber, email, cvFile, experience, graduationYear, domainExpertise, message, }) => {
        try {
            const data = {
                fullName,
                phoneNumber,
                email,
                linkedIn,
                cvFile,
                currentEmployer,
                experience,
                graduationYear,
                domainExpertise,
                message,
            };
            const result = await interviewexperts.create(data, {
                returning: true,
            });
            const name = result.dataValues.fullName;
            const Token = result.dataValues.Token;
            console.log(name, "name");
            console.log(Token, "token");
            return { name, Token };
        }
        catch (error) {
            console.log(error);
        }
    };
    const validateinterviewToken = async (Token) => {
        try {
            console.log(Token, "token");
            const query = ` SELECT "interviewToken" FROM "interviews" WHERE "interviewToken" = :Token`;
            const response = await connection_1.sequelize.query(query, {
                replacements: { Token: Token },
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log(response, "response");
            return response[0].interviewToken;
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        postInterviewExpert,
        validateinterviewToken,
    };
};
exports.becomeExpertsImplementation = becomeExpertsImplementation;
