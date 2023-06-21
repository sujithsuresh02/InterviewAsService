import { companyDbImplementation } from "../../frameworks/database/Postgres/repositories/companyRepostoriesImplementation";

export const companyDbRepository = (
  repository: ReturnType<companyDbImplementation>
) => {
  const registerCompany = async (signupDetails: {
    role?:string|any;
    name: string;
    email: string;
    password?: string| null;
  }) => {
    console.log("mm");
    console.log(signupDetails);
    console.log("this is interface")

    return await repository.registerCompany(signupDetails);
  };

  const getByEmail= async (email: string) =>
  await repository.getByEmail (email);

 const getByEmailSignup=async(email:string,role:string)=>{
 return await repository.getByEmailSignup (email,role);
 }
  return {
    registerCompany,
    getByEmail,
    getByEmailSignup
  };
};
export type CompanyDbInterface = typeof companyDbRepository;
