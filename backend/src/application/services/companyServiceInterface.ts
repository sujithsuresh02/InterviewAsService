import { companyDbServiceImplementation} from "../../frameworks/services/companyService";
export const companyServiceInterface = (
  companyService: ReturnType<companyDbServiceImplementation>
) => {

    const extractDataFromPdf = (path: string) => {
    return  companyService.extractData(path);
    };

   
  return{
    extractDataFromPdf,
   
  }
};

export  type CompanyDbServiceInterface= typeof companyServiceInterface