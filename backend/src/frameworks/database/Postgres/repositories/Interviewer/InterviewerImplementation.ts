import { BIGINT, QueryTypes } from "sequelize";
import { sequelize } from "../../Connection/connection";
import Sequelize from "sequelize";
import { initTimeSlotModal } from "../../models/Interviewer";
import AppError from "../../../../../utils/appError";
import { HttpStatus } from "../../../../../types/httpStatus";
import { Timeslot, feedbackData } from "../../../../../types/InterviwerTypes";
import { initTimesModal } from "../../models/Interviewer";
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {});
const timeslots = initTimeSlotModal(sequelize);
const Times = initTimesModal(sequelize);
export const interviwerDbImplementation = () => {
  const addAvailableTimeSlot = async ({
    interviewerId,
    newdate,
    dayOfWeek,
    times,
  }: Timeslot) => {
    console.log(interviewerId, newdate, dayOfWeek, times);
    const [day, month, year]: any = newdate.split("/"); // Split the newdate string
    const formattedDate: any = new Date(year, month - 1, day); // Create a new Date object

    console.log(formattedDate, "formatted date");
    const date =formattedDate
    try {
      const result = await timeslots.create({
        date,
        dayOfWeek,
        interviewerId,
      });
      let timeslotId: String = result?.dataValues?.id;

      const promises = times.map(async (time) => {
        await Times.create({ timeSlot: time, status: "available", timeslotId });
      });

      let response = await Promise.all(promises);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getallAvailableTimeslots = async () => {
    try {
      const query = `
      SELECT "ts".*, string_agg("t"."timeSlot", ', ') AS "timeSlots"
      FROM "Times" AS "t"
      INNER JOIN "timeslots" AS "ts" ON "t"."timeslotId" = "ts"."id"
      GROUP BY "ts"."id";
    `;

      const results = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      console.log(results, "query result ");
      return results;
    } catch (error) {
      console.log(error);
    }
  };

  const scheduledInterviews = async (interviewerId: string) => {
    try {
      const query = `  SELECT
    "i"."id" AS "interview_id",
    "s"."name" AS "student_name",
    "s"."email" AS "studentEmail",
    "s"."phone" AS "studentPhoneNumber",
    "s"."experience" AS "experience",
    "s"."skills" AS "skills",
    "s"."address" AS "address",
    "s"."education" AS "studentQualification",
    "i"."selectedTime" AS "interview_time",
    "i"."SelectedDate" AS "interview_date",
    "a"."jobRole" AS "jobRole",
    "i"."interviewToken" AS "interviewToken"
  FROM
    "interviews" AS i
  JOIN
    "studentcvs" AS s ON "i"."studentId" = "s"."id"
  JOIN
    "addrequests" AS a ON "s"."addRequestId" = "a"."id"
  WHERE
    "i"."interviewerId" = :interviewerId  AND "i"."interviewStatus" = 'scheduled' `;

      const response = await sequelize.query(query, {
        replacements: { interviewerId: interviewerId },
        type: QueryTypes.SELECT,
      });
      console.log(response);

      return response;
    } catch (error) {}
  };

  const addFeedbacKDetails = async ({
    technicalScore,
    codingScore,
    communicationScore,
    interviewId,
    feedbackDescription,
    TotalInterviewScore,
  }: feedbackData) => {
    try {
      const TotalScore = Number(TotalInterviewScore);
      let feedbackStatus;

      if (TotalScore >= 9 && TotalScore <= 10) {
        feedbackStatus = "strong proceed";
      } else if (TotalScore >= 6 && TotalScore <= 8) {
        feedbackStatus = "proceed";
      } else if (TotalScore >= 4 && TotalScore <= 5) {
        feedbackStatus = "reject";
      } else if (TotalScore >= 3) {
        feedbackStatus = "strong reject";
      } else {
        feedbackStatus = "unknown";
      }

      console.log(feedbackStatus);
      const query = `
      UPDATE interviews
      SET
        "codingScore" = :codingScore,
        "technicalScore" = :technicalScore,
        "communicationScore" = :communicationScore,
        "feedbackDescription" = :feedbackDescription,
        "interviewStatus"= 'completed',
        "TotalInterviewScore"=:TotalInterviewScore,
        "feedbackStatus"=:feedbackStatus
      WHERE
        id = :interviewId
    `;
      return await sequelize.query(query, {
        replacements: {
          codingScore: codingScore,
          technicalScore: technicalScore,
          communicationScore: communicationScore,
          feedbackDescription: feedbackDescription,
          interviewId: interviewId,
          TotalInterviewScore: TotalInterviewScore,
          feedbackStatus: feedbackStatus,
        },
        type: QueryTypes.UPDATE,
      });
    } catch (error) {
      console.log("Error updating interview data:", error);
    }
  };

  const homepageInterviewListing = async () => {
    try {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      console.log(formattedDate);

      const query = `
      SELECT
      "i"."id" AS "interview_id",
      "s"."name" AS "student_name",
      "s"."email" AS "studentEmail",
      "s"."phone" AS "studentPhoneNumber",
      "s"."experience" AS "experience",
      "s"."skills" AS "skills",
      "s"."address" AS "address",
      "s"."education" AS "studentQualification",
      "i"."selectedTime" AS "interview_time",
      "i"."SelectedDate" AS "interview_date",
      "a"."jobRole" AS "jobRole",
      "i"."interviewToken" AS "interviewToken"
    FROM
      "interviews" AS i
    JOIN
      "studentcvs" AS s ON "i"."studentId" = "s"."id"
    JOIN
      "addrequests" AS a ON "s"."addRequestId" = "a"."id"
    
        WHERE "SelectedDate" = :formattedDate
      `;

      const interviews = await sequelize.query(query, {
        replacements: { formattedDate },
        type: QueryTypes.SELECT,
      });

      return interviews;
    } catch (error) {
      console.log(error);
    }
  };

  const allCompletedInterviews = async (interviewerId: string) => {
    try {
      const query = `
        SELECT
          "i"."id" AS "interview_id",
          "s"."name" AS "student_name",
          "s"."email" AS "studentEmail",
          "s"."phone" AS "studentPhoneNumber",
          "s"."experience" AS "experience",
          "s"."skills" AS "skills",
          "s"."address" AS "address",
          "s"."education" AS "studentQualification",
          "i"."selectedTime" AS "interview_time",
          "i"."SelectedDate" AS "interview_date",
          "a"."jobRole" AS "jobRole",
          "i"."interviewToken" AS "interviewToken",
          "i"."codingScore" AS "CodingScore",
          "i"."technicalScore" AS "TechnicalScore",
          "i"."communicationScore" AS "CommunicationScore",
          "i"."feedbackDescription" AS "FeedbackDescription",
          "i"."TotalInterviewScore" AS "TotalInterviewScore"
        FROM
          "interviews" AS "i"
        JOIN
          "studentcvs" AS "s" ON "i"."studentId" = "s"."id"
        JOIN
          "addrequests" AS "a" ON "s"."addRequestId" = "a"."id"
        WHERE
          "i"."interviewerId" = :interviewerId
          AND "i"."interviewStatus" = 'completed'`;

      const response = await sequelize.query(query, {
        replacements: { interviewerId },
        type: QueryTypes.SELECT,
      });

      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const interviewDetails = async (interviewerId: string) => {
    try {
      const query = `
      SELECT * FROM "interviewers" WHERE "id"=:interviewerId`;
      const result: any = await sequelize.query(query, {
        replacements: { interviewerId },
        type: QueryTypes.SELECT,
      });
      console.log(result);

      return result[0];
    } catch (error) {
      console.log(error);
    }
  };

  const profileEdit = async (
    userName: string,
    changedEmail: string,
    interviewerId: string
  ) => {
    try {
      const result = await sequelize.query(
        `UPDATE "interviewers" SET "name" = :newName,email=:newEmail WHERE "id" = :interviewerId`,
        {
          replacements: {
            newName: userName,
            interviewerId: interviewerId,
            newEmail: changedEmail,
          },
          type: QueryTypes.UPDATE,
        }
      );
      if (result) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addAvailableTimeSlot,
    getallAvailableTimeslots,
    scheduledInterviews,
    addFeedbacKDetails,
    homepageInterviewListing,
    allCompletedInterviews,
    interviewDetails,
    profileEdit,
  };
};

export type InterviweImplementation = typeof interviwerDbImplementation;
