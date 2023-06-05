import { companyDbImplementation } from "../../frameworks/database/Postgres/repositories/companyRepostoriesImplementation";

export const companyDbRepository = (
  repository: ReturnType<companyDbImplementation>
) => {
  const registerCompany = async (signupDetails: {
    role:string;
    name: string;
    email: string;
    password: string;
  }) => {
    console.log("mm");
    console.log(signupDetails);
    console.log("this is interface")

    return await repository.registerCompany(signupDetails);
  };

  const getCompanyByEmail= async (email: string) =>
  await repository.getCompanyByEmail (email);

 const getByEmailSignup=async(email:string,role:string)=>{
 return await repository.getByEmailSignup (email,role);
 }
  return {
    registerCompany,
    getCompanyByEmail,
    getByEmailSignup
  };
};
export type CompanyDbInterface = typeof companyDbRepository;
