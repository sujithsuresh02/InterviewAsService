

export interface addRequestFormData {
    jobRole: string;
    jobDescription: string;
    optional: string;
    numberOfVacancy: number;
    TotalStudentsCount: number;
    studentName: string;
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
  