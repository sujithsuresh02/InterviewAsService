import { sequelize } from "../../Connection/connection";
import { initAdminModel } from "../../models/admins";
import {
  Plans,
  adminFormValues,
  editPlans,
} from "../../../../../types/adminInterfaceType";
import { QueryTypes } from "sequelize";
import { initSubscriptionPlans } from "../../models/admins";
import AppError from "../../../../../utils/appError";
import { HttpStatus } from "../../../../../types/httpStatus";
import { log } from "console";
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

  const plans = initSubscriptionPlans(sequelize);
  const addSubscriptionPlans = async ({
    features,
    interviews,
    planName,
    price,
    validity,
  }: Plans) => {
    try {
      const datas = {
        features,
        interviews,
        planName,
        price,
        validity,
      };
      console.log(datas, "from imple");

      const response = await plans.create(datas);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw new AppError("Already Added This Plan ", HttpStatus.BAD_REQUEST);
    }
  };
  const getAllPlans = async () => {
    const query = `
    
   SELECT "id", "features","interviews","planName","price", "validity",DATE("createdAt" )  AS CreatedDate FROM "plans"
    `;

    const result = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return result;
  };

  const deletePlans = async (id: string) => {
    try {
      const query = `
      DELETE FROM "plans"
      WHERE id = :id
    `;

      const result = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.DELETE,
      });

      console.log(result, "deleted result ");

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const editPlans= async (editedData:editPlans) => {
    try {
      const query = `
        UPDATE plans
        SET "planName" = $1, "price" = $2, "validity" = $3, "interviews" = $4, "features" = $5
        WHERE id = $6;
      `;
      const values = [
        editedData.planName,
        editedData.price,
        editedData.validity,
        editedData.interviews,
        editedData.features,
        editedData.planId
      ];
  
      await sequelize.query(query, { bind: values });
      console.log("Plan updated successfully");
      return true
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };
  
  return {
    adminSignup,
    getCompanyByEmail,
    getFullRequest,
    getStudentDetails,
    getDemoRequest,
    addSubscriptionPlans,
    getAllPlans,
    deletePlans,
    editPlans
  };
};
export type adminDbImplementation = typeof adminRepositoryImplementation;
