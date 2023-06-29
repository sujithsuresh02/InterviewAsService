import { initCompanyModel } from "../models/auth";
import { initStudentModel } from "../models/auth";
import { initInterviewerModel } from "../models/auth";
import { sequelize } from "../Connection/connection";
import { QueryTypes } from "sequelize";
import { demoDetails } from "../../../../types/companyInterfaceTypes";
import { initDemoDetailsModel } from "../models/Demo";
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

  return {
    registerCompany,
    getByEmail,
    getByEmailSignup,
  };
};

export type companyDbImplementation = typeof companyDbRepositoryImplementation;
