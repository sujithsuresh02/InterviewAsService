import { sequelize } from "../../Connection/connection";
import { initAdminModel } from "../../models/admins";
import { adminFormValues } from "../../../../../types/adminInterfaceType";
import { QueryTypes } from "sequelize";
import configKeys from "../../../../../config";
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export const adminRepositoryImplementation = () => {
  const admins = initAdminModel(sequelize);
  const adminSignup = async ({ name, email, password }: adminFormValues) => {
    try {
      const result = await admins.create({
        name,
        email,
        password,
      });
      console.log(result);

      console.log("siguped successfully!");
      return result;
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const getCompanyByEmail = async (email: string) => {
    try {
      const query = `
        SELECT *FROM "admins" WHERE email = :email
      `;

      const result = await sequelize.query(query, {
        replacements: { email },
        type: QueryTypes.SELECT,
      });

      console.log(result);

      return result;
    } catch (error) {
      console.error("Error retrieving user by email:", error);
      throw error;
    }
  };
  const getFullRequest = async () => {
    try {
      const query = `
  SELECT "companies"."name" AS companyName, "companies"."id" AS companyId,"addrequests"."id", "addrequests"."jobRole", "addrequests"."numberOfVacancy", "addrequests"."TotalStudentsCount", DATE("addrequests"."createdAt") AS requestedDate
  FROM "addrequests"
  JOIN "companies" ON "addrequests"."companyId" = "companies"."id"
`;

      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      console.log(result);
      console.log("jobrolessssssssssssssss");

      return result;
    } catch (error) {}
  };

  const getStudentDetails = async (id: string) => {
    try {
      const query = ` SELECT * FROM  "studentcvs" WHERE "studentcvs"."addRequestId"=:id
      `;
      const result = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {}
  };

  const getDemoRequest = async () => {
    try {
      const query = ` SELECT "fullName" ,"company","role","emailId","contactNumber","learnAboutUs",DATE("createdAt" )  AS Date FROM  "demos";
      `;
      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
  
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  

  return {
    adminSignup,
    getCompanyByEmail,
    getFullRequest,
    getStudentDetails,
    getDemoRequest,
  };
};
export type adminDbImplementation = typeof adminRepositoryImplementation;
