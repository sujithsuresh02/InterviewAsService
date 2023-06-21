import { UUID } from "crypto";


export interface adminFormValues {
    email: string;
    password: string;
    name: string;
  }

 export interface Plans {
    features: string;
    interviews: number;
    planName: string;
    price: number;
    validity: number;
  }

  export interface editPlans {
    features: string;
    interviews: number;
    planName: string;
    price: number;
    validity: number;
    planId:UUID
  }
  
  