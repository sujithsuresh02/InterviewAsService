

export interface addRequestFormData {
    jobRole: string;
    jobDescription: string;
    optional: string;
    numberOfVacancy: number;
    TotalStudentsCount: number;
    companyId:string|undefined
  }

  export interface CVDetails {
    path?: string;
    filetype?: string;
    Buffer: Buffer | undefined;
  }
  
  export interface studentDetails {
    name: string;
    email: string;
    phone: string;
    experience: string;
    skills: string;
    education: string;
    projects?: string;
    address?: string;
    sex?: string;
    age?: string;
    certifications?: string;
  }
  

  export interface demoDetails{
    fullName:string,
    company: string,
    role: string,
    emailId: string,
    contactNumber:string,
    learnAboutUs:string,
    message?: string|null,
  }