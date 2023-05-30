import { initCompanyModel } from "../models/auth";
import { initStudentModel } from "../models/auth";
import { initInterviewerModel } from "../models/auth";
import { sequelize } from "../Connection/connection";
import { QueryTypes } from 'sequelize';

export const companyDbRepositoryImplementation = () => {
  const Companies = initCompanyModel(sequelize);
  const Interviewer = initInterviewerModel(sequelize);
  const Student = initStudentModel(sequelize);
  
  // Add the synchronization code here
  sequelize.sync()
    .then(() => {
      console.log('Database synchronized successfully!');
    })
    .catch((error) => {
      console.error('Error synchronizing database:', error);
    });
  
  const registerCompany = async (signupDetails: {
    role: string;
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { role, name, email, password } = signupDetails;
  console.log("role");
  console.log(role);
  
  
      let tableName;
      switch (role) {
        case 'Company':
          tableName = Companies;
          break;
        case 'Interviewer':
          tableName = Interviewer;
          break;
        case 'Student':
          tableName = Student;
          break;
        default:
          console.error('Invalid role');
          return;
      }

      const result = await tableName.create({
        name,
        email,
        password,
      });
 console.log(result);
 
      console.log('siguped successfully!');
      return result;
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

const getCompanyByEmail = async (email: string) => {
  try {
    const query = `
      SELECT *, 'Interviewer' AS role FROM "Interviewers" WHERE email = :email
      UNION ALL
      SELECT *, 'company' AS role FROM "Companies" WHERE email = :email
      UNION ALL
      SELECT *, 'student' AS role FROM "Students" WHERE email = :email;
    `;

    const result = await sequelize.query(query, {
      replacements: { email },
      type: QueryTypes.SELECT,
    });

    // console.log('Result on getByEmail implementation');
    // console.log(result);

    return result;
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    throw error;
  }
};

  
  
  return {
    registerCompany,
    getCompanyByEmail,
  };
};

export type companyDbImplementation = typeof companyDbRepositoryImplementation;
