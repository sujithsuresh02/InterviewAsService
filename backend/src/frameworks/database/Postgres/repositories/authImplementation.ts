import { initCompanyModel } from "../models/auth";
import { initStudentModel } from "../models/auth";
import { initInterviewerModel } from "../models/auth";
import { sequelize } from "../Connection/connection";
import { QueryTypes } from "sequelize";
import { demoDetails } from "../../../../types/companyInterfaceTypes";
import { initDemoDetailsModel } from "../models/Demo";
import { query, response } from "express";
export const companyDbRepositoryImplementation = () => {
  const companies = initCompanyModel(sequelize);
  const interviewer = initInterviewerModel(sequelize);
  const student = initStudentModel(sequelize);
  const Demos = initDemoDetailsModel(sequelize);
  // Add the synchronization code here
  sequelize
    .sync()
    .then(() => {
      console.log("Database synchronized successfully!");
    })
    .catch((error) => {
      console.error("Error synchronizing database:", error);
    });

  const registerCompany = async (signupDetails: {
    role?: string | null;
    name: string;
    email: string;
    password?: string | null;
  }) => {
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

      const result = await tableName.create(
        {
          name,
          email,
          password,
        },
        { returning: true }
      );

      const response = {
        validationToken: result.dataValues.ValidationToken,
        name: result.dataValues.name,
      };
      console.log(response);

      console.log("siguped successfully!");
      return response;
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const getByEmail = async (email: string) => {
    try {
      const query = `
      SELECT *, 'interviewer' AS role FROM "interviewers" WHERE "email" = :email
      UNION ALL
      SELECT *, 'company' AS role FROM "companies" WHERE "email" = :email
    `;

      const result = await sequelize.query(query, {
        replacements: { email },
        type: QueryTypes.SELECT,
      });

      console.log("Result on getByEmail implementation");
      console.log(result);

      return result;
    } catch (error) {
      console.error("Error retrieving user by email:", error);
      throw error;
    }
  };

  const getByEmailSignup = async (email: string, role: string) => {
    try {
      let query;

      console.log(role);

      if (role === "Company") {
        query = `
        SELECT * FROM "companies" WHERE email = :email
        
      `;
      } else {
        query = `
        SELECT *FROM "interviewers" WHERE email = :email
       
      `;
      }

      const result: any = await sequelize.query(query, {
        replacements: { email },
        type: QueryTypes.SELECT,
      });

      console.log("Result on getByEmail implementation");
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error retrieving user by email:", error);
      throw error;
    }
  };

  const validateSignupPage = async (token: string) => {
    try {
      const query = `SELECT "ValidationToken" FROM "demos" WHERE "ValidationToken"=:token `;
      const result: any = await sequelize.query(query, {
        replacements: { token },
        type: QueryTypes.SELECT,
      });
      console.log(result);
      return result[0]?.ValidationToken;
    } catch (error) {
      console.log(error);
    }
  };

  const interviewerSignupValidation = async (token: string) => {
    try {
      const query = `SELECT "Token" FROM "becominterviewexperts" WHERE "Token" =:token `;
      const result: any = await sequelize.query(query, {
        replacements: { token },
        type: QueryTypes.SELECT,
      });
      console.log(result);
      return result[0]?.Token;
    } catch (error) {
      console.log(error);
    }
  };

  const changingPassword = (
    hashedPasword: string,
    email: string,
    role: string
  ) => {
    try {
      let query;
      if (role == "comapany") {
        query = `
   UPDATE "companies" SET "password"=:hashedPasword
   `;
      } else {
        query = `
  UPDATE "interviewers" SET "password"=:hashedPasword
  `;
      }

      const result = sequelize.query(query, {
        replacements: { hashedPasword },
        type: QueryTypes.SELECT,
      });
      return true
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPasswordValidation = async (id: string) => {
    try {
      const query = `
      SELECT "id","email",'interviewer' AS role FROM "interviewers" WHERE "id" = :id
      UNION ALL
      SELECT "id","email", 'company' AS role FROM "companies" WHERE "id" = :id
    `;

      const result: any = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT,
      });
      console.log(result, "email resposne");
      return result[0];
    } catch (error) {
      console.log(error);
    }
  };
  return {
    registerCompany,
    getByEmail,
    getByEmailSignup,
    validateSignupPage,
    interviewerSignupValidation,
    changingPassword,
    forgotPasswordValidation,
  };
};

export type companyDbImplementation = typeof companyDbRepositoryImplementation;
