import { becomeexpertsDbImplementation } from "../../../frameworks/database/Postgres/repositories/Landingpage/becomeexpertsImplementation";
import { FormValues } from "../../../types/interviewExperts";
export const becomeexpertsDbInterface= (
  implementationRepository: ReturnType<becomeexpertsDbImplementation>
) => {

  const becomeInterviewExperts= async(formData:FormValues)=>{
    return implementationRepository.postInterviewExpert(formData)
  }
  const valiadteToken=async(interviewToken:string)=>{
    return await implementationRepository.validateinterviewToken(interviewToken);
    }
  return{
    becomeInterviewExperts,
    valiadteToken
  }
}


export type becomeInterviewexpertsDbInterface = typeof becomeexpertsDbInterface;
