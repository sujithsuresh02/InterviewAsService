import { sequelize } from "../../Connection/connection";
import { initAdminModel } from "../../models/admins";
import { adminFormValues } from "../../../../../types/adminInterfaceType";
import { QueryTypes } from "sequelize";

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

      // console.log('Result on getByEmail implementation');
      // console.log(result);
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
      SELECT * FROM "AddRequests" 
    `;
      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      return result;
    } catch (error) {}
  };

   const getStudentDetails=async()=>{

    try{

      const query=`
      SELECT `
    }catch(error){

    }
   }

  return {
    adminSignup,
    getCompanyByEmail,
    getFullRequest,
  };
};
export type adminDbImplementation = typeof adminRepositoryImplementation;
