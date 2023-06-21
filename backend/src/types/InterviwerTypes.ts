export interface Timeslot {
  newdate: Date;
  dayOfWeek: string;
  times: any[];
  interviewerId: string;
}

export interface feedbackData {
  codingScore: string;
  communicationScore: string;
  feedbackDescription: string;
  technicalScore: string;
  interviewId: string;
  TotalInterviewScore:string;
}
