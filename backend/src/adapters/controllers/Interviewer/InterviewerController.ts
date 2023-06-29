import { Request, Response, response } from "express";
import asyncHandler from "express-async-handler";
import { InterviweImplementation } from "../../../frameworks/database/Postgres/repositories/Interviewer/InterviewerImplementation";
import { InterviwerDbInterface } from "../../../application/repositories/Interviewer/InterviewerInterface";
import { Timeslot, feedbackData } from "../../../types/InterviwerTypes";
import {
  addTimeSlot,
  viewAllInterviewerTimeslots,
  getInterviews,
  addInterviewFeedBack,
  DailyInterviews,
  interviewsCompleted,
  interviewerDetails,
  editProfileDetails,
} from "../../../application/useCases/Interviewer/Interviewer";
const interviwerController = (
  interviwerDbInterface: InterviwerDbInterface,
  interviwerDbImplementation: InterviweImplementation
) => {
  const interviwerDbRepositort = interviwerDbInterface(
    interviwerDbImplementation()
  );
  const addAvailableTimeSlot = asyncHandler(
    async (req: Request, res: Response) => {
      const interviewerId: string = (req as any).id;

      console.log(interviewerId, "id");
      console.log(req.body);

      const { date, dayOfWeek, times } = req.body;
      //  const newdate: Date=date.toDateString();
      //  console.log(newdate);
      const newdate = date;

      const timeSlots: Timeslot = {
        newdate,
        dayOfWeek,
        times,
        interviewerId,
      };
      console.log("hjkl");

      const response: any = await addTimeSlot(
        timeSlots,
        interviwerDbRepositort
      );
      if (response) {
        res.json({
          message: "Time Upadted Successfully",
        });
      }
    }
  );

  const getallTimeslots = asyncHandler(async (req: Request, res: Response) => {
    const resposne = await viewAllInterviewerTimeslots(interviwerDbRepositort);
    if (resposne) {
      res.json({
        resposne,
      });
    }
  });
  const getAllSchedulledInterviews = asyncHandler(
    async (req: Request, res: Response) => {
      const interviewerId: string = (req as any).id;

      const resposne = await getInterviews(
        interviewerId,
        interviwerDbRepositort
      );
      if (resposne) {
        res.json({
          resposne,
        });
      }
    }
  );

  const updateFeedback = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const {
      codingScore,
      communicationScore,
      feedbackDescription,
      technicalScore,
      interviewId,
      TotalInterviewScore,
    } = req.body;

    const feedbackDetails: feedbackData = {
      codingScore,
      communicationScore,
      feedbackDescription,
      technicalScore,
      interviewId,
      TotalInterviewScore,
    };

    console.log(feedbackDetails);

    const response: any = await addInterviewFeedBack(
      feedbackDetails,
      interviwerDbRepositort
    );
    if (response) {
      res.json({
        message: "Feedback Details Updated Successfully",
      });
    }
  });

  const datewiseInterviewsListing = asyncHandler(
    async (req: Request, res: Response) => {
      const response: any = await DailyInterviews(interviwerDbRepositort);
      console.log(response);

      if (response) {
        res.json({
          response,
        });
      }
    }
  );

  const completedInterviews = asyncHandler(
    async (req: Request, res: Response) => {
      const interviewerId: string = (req as any).id;

      const result = await interviewsCompleted(
        interviewerId,
        interviwerDbRepositort
      );
      if (result) {
        res.json({
          result,
        });
      }
    }
  );
  const getIntreviewerData = asyncHandler(
    async (req: Request, res: Response) => {
      const interviewerId: string = (req as any).id;

      const result = await interviewerDetails(
        interviewerId,
        interviwerDbRepositort
      );
      if (result) {
        res.json({
          result,
        });
      }
    }
  );
  const editProfile = asyncHandler(async (req: Request, res: Response) => {
    const { username, changeEmail } = req.body;
    const interviewerId: string = (req as any).id;

    const result = await editProfileDetails(
      username,
      changeEmail,
      interviewerId,
      interviwerDbRepositort
    );
    if (result) {
      res.json({
        message: "Profile Updated SuccessFully",
      });
    }
  });

  return {
    addAvailableTimeSlot,
    getallTimeslots,
    getAllSchedulledInterviews,
    updateFeedback,
    datewiseInterviewsListing,
    completedInterviews,
    getIntreviewerData,
    editProfile,
  };
};

export default interviwerController;
