"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyDbRepositoryImplementation = void 0;
const auth_1 = require("../models/auth");
const auth_2 = require("../models/auth");
const auth_3 = require("../models/auth");
const connection_1 = require("../Connection/connection");
const sequelize_1 = require("sequelize");
const Demo_1 = require("../models/Demo");
const companyDbRepositoryImplementation = () => {
    const companies = (0, auth_1.initCompanyModel)(connection_1.sequelize);
    const interviewer = (0, auth_3.initInterviewerModel)(connection_1.sequelize);
    const student = (0, auth_2.initStudentModel)(connection_1.sequelize);
    const Demos = (0, Demo_1.initDemoDetailsModel)(connection_1.sequelize);
    // Add the synchronization code here
    connection_1.sequelize
        .sync()
        .then(() => {
        console.log("Database synchronized successfully!");
    })
        .catch((error) => {
        console.error("Error synchronizing database:", error);
    });
    const registerCompany = async (signupDetails) => {
        try {
            const { role, name, email, password } = signupDetails;
            console.log("role");
            console.log(role);
            let tableName;
            switch (role) {
                case "Company":
                    tableName = companies;
                    break;
                case "Interviewer":
                    tableName = interviewer;
                    break;
                case "Student":
                    tableName = student;
                    break;
                default:
                    console.error("Invalid role");
                    return;
            }
            const result = await tableName.create({
                name,
                email,
                password,
            }, { returning: true });
            const response = {
                validationToken: result.dataValues.ValidationToken,
                name: result.dataValues.name,
            };
            console.log(response);
            console.log("siguped successfully!");
            return response;
        }
        catch (error) {
            console.error("Error creating company:", error);
        }
    };
    const getByEmail = async (email) => {
        try {
            const query = `
      SELECT *, 'interviewer' AS role FROM "interviewers" WHERE "email" = :email
      UNION ALL
      SELECT *, 'company' AS role FROM "companies" WHERE "email" = :email
    `;
            const result = await connection_1.sequelize.query(query, {
                replacements: { email },
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log("Result on getByEmail implementation");
            console.log(result);
            return result;
        }
        catch (error) {
            console.error("Error retrieving user by email:", error);
            throw error;
        }
    };
    const getByEmailSignup = async (email, role) => {
        try {
            let query;
            console.log(role);
            if (role === "Company") {
                query = `
        SELECT * FROM "companies" WHERE email = :email
        
      `;
            }
            else {
                query = `
        SELECT *FROM "interviewers" WHERE email = :email
       
      `;
            }
            const result = await connection_1.sequelize.query(query, {
                replacements: { email },
                type: sequelize_1.QueryTypes.SELECT,
            });
            console.log("Result on getByEmail implementation");
            console.log(result);
            return result;
        }
        catch (error) {
            console.error("Error retrieving user by email:", error);
            throw error;
        }
    };
    return {
        registerCompany,
        getByEmail,
        getByEmailSignup,
    };
};
exports.companyDbRepositoryImplementation = companyDbRepositoryImplementation;
