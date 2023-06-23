import { sequelize } from "../../Connection/connection";
import { initAdminModel } from "../../models/admins";
import {
  Plans,
  adminFormValues,
  editPlans,
  interviewData,
} from "../../../../../types/adminInterfaceType";
import { QueryTypes } from "sequelize";
import { initSubscriptionPlans } from "../../models/admins";
import AppError from "../../../../../utils/appError";
import { HttpStatus } from "../../../../../types/httpStatus";
import { initInterviewModel } from "../../models/assignInterviewer";
import { query } from "express";
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export const adminRepositoryImplementation = () => {
  const admins = initAdminModel(sequelize);
  const adminSignup = async ({ name, email, password }: adminFormValues) => {
    try {
      const result = await admins.create({
        name,
        email,
        password,
      });
      console.log(result);

      console.log("siguped successfully!");
      return result;
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const getCompanyByEmail = async (email: string) => {
    try {
      const query = `
        SELECT *FROM "admins" WHERE email = :email
      `;

      const result = await sequelize.query(query, {
        replacements: { email },
        type: QueryTypes.SELECT,
      });

      console.log(result);

      return result;
    } catch (error) {
      console.error("Error retrieving user by email:", error);
      throw error;
    }
  };
  const getFullRequest = async () => {
    try {
      const query = `
  SELECT "companies"."name" AS companyName, "companies"."id" AS companyId,"addrequests"."id", "addrequests"."jobRole", "addrequests"."numberOfVacancy", "addrequests"."TotalStudentsCount", DATE("addrequests"."createdAt") AS requestedDate
  FROM "addrequests"
  JOIN "companies" ON "addrequests"."companyId" = "companies"."id"
`;

      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      console.log(result);
      console.log("jobrolessssssssssssssss");

      return result;
    } catch (error) {}
  };

  const getStudentDetails = async (id: string) => {
    try {
      const query = ` SELECT * FROM  "studentcvs" WHERE "studentcvs"."addRequestId"=:id
      `;
      const result = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {}
  };

  const getDemoRequest = async () => {
    try {
      const query = ` SELECT "fullName" ,"company","role","emailId","contactNumber","learnAboutUs",DATE("createdAt" )  AS Date FROM  "demos";
      `;
      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const plans = initSubscriptionPlans(sequelize);
  const addSubscriptionPlans = async ({
    features,
    interviews,
    planName,
    price,
    validity,
  }: Plans) => {
    try {
      const datas = {
        features,
        interviews,
        planName,
        price,
        validity,
      };
      console.log(datas, "from imple");

      const response = await plans.create(datas);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw new AppError("Already Added This Plan ", HttpStatus.BAD_REQUEST);
    }
  };
  const getAllPlans = async () => {
    const query = `
    
   SELECT "id", "features","interviews","planName","price", "validity",DATE("createdAt" )  AS CreatedDate FROM "plans"
    `;

    const result = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    console.log(result, "get plans");

    return result;
  };

  const deletePlans = async (id: string) => {
    try {
      const query = `
      DELETE FROM "plans"
      WHERE id = :id
    `;

      const result = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.DELETE,
      });

      console.log(result, "deleted result ");

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const editPlans = async (editedData: editPlans) => {
    try {
      const query = `
        UPDATE plans
        SET "planName" = $1, "price" = $2, "validity" = $3, "interviews" = $4, "features" = $5
        WHERE id = $6;
      `;
      const values = [
        editedData.planName,
        editedData.price,
        editedData.validity,
        editedData.interviews,
        editedData.features,
        editedData.planId,
      ];

      await sequelize.query(query, { bind: values });
      console.log("Plan updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  const interviewerAssign = async (id: string) => {
    try {
      const query = `SELECT * FROM "studentcvs" WHERE "id"=:id`;

      const result = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getFullTimeslotDetails = async () => {
    try {
      const query = `SELECT
      "t"."id" AS "Times_id",
      "t"."timeSlot",
      "t"."status",
      "t"."timeslotId",
      "t"."createdAt" AS "Times_created_at",
      "it"."id" AS "timeslot_id",
      "it"."date",
      "it"."dayOfWeek",
      it."interviewerId",
      "it"."createdAt" AS "timeslot_created_at",
      "i"."id" AS "interviewer_id",
      "i"."name",
      "i"."email",
      "i"."createdAt" AS "interviewer_created_at"
    FROM
      "Times" AS "t"
    JOIN
      "timeslots" AS "it" ON "t"."timeslotId" = "it"."id"
    JOIN
      "interviewers" AS "i" ON "it"."interviewerId" = "i"."id";`;

      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const interviewExpertsRequest = async () => {
    const query = `SELECT * ,DATE("createdAt")AS "Date" FROM "becominterviewexperts" ORDER BY "createdAt" DESC `;
    const result = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    console.log(result);
    return result;
  };

  const getInterviewerToken = async (email: string) => {
    console.log("entered");

    try {
      const query = `SELECT "Token","fullName" FROM "becominterviewexperts" WHERE "email" =:email`;

      const result: any = await sequelize.query(query, {
        replacements: { email },
        type: QueryTypes.SELECT,
      });
      console.log(result);
      const Token = result[0].Token;
      const name = result[0].fullName;
      return { Token, name };
    } catch (error) {}
  };

  const interviewerDeleteRequest = async (id: string) => {
    try {
      const deleteQuery = `
      DELETE FROM "becominterviewexperts"
      WHERE "id" = :id
    `;
      const result = sequelize.query(deleteQuery, {
        replacements: { id },
      });
      return id;
    } catch (error) {}
  };

  const interviews = initInterviewModel(sequelize);

  const assignInterviewer = async ({
    interviewerId,
    studentId,
    selectedTime,
    SelectedDate,
    TimeslotId,
  }: interviewData) => {
    try {
      const Data = {
        interviewerId,
        studentId,
        selectedTime,
        SelectedDate,
      };
      const result: any = await interviews.create(Data, { returning: true });
      const interviewToken = result.dataValues.interviewToken;

      const selectedTimeStatus = `
     UPDATE "Times"
     SET "status" = 'assigned'
     WHERE "id" = :TimeslotId;`;

      await sequelize.query(selectedTimeStatus, {
        replacements: { TimeslotId },
        type: QueryTypes.UPDATE,
      });


      const changeInteviewStatus = `
      UPDATE "interviews"
      SET "interviewStatus" = 'scheduled'
      WHERE "interviewToken" = :interviewToken;`;

      await sequelize.query(changeInteviewStatus, {
        replacements: { interviewToken },
        type: QueryTypes.UPDATE,
      });

      return interviewToken;
    } catch (error) {
      console.log(error);
    }
  };

  const getFullScheduledInterviews = async () => {
    try {
      const query = `
  SELECT
  "i"."id" AS "interview_id",
  "s"."name" AS "student_name",
  "c"."name" AS "company_name",
  "iv"."name" AS "interviewer_name",
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
JOIN
  "companies" AS c ON "a"."companyId" = "c"."id"
JOIN
  "interviewers" AS iv ON "i"."interviewerId" = "iv"."id"
WHERE
  "i"."interviewStatus" = 'scheduled'

`;

      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const interviewCancellation = async (interviewId: string) => {
    try {
      console.log(interviewId);

      const query = `UPDATE "interviews" SET "interviewStatus" = 'cancelled' WHERE "id" = :interviewId`;
      return await sequelize.query(query, {
        replacements: { interviewId: interviewId },
        type: QueryTypes.UPDATE,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const intereviewsCancelled = async () => {
    try {
      const query = `
      SELECT
      "i"."id" AS "interview_id",
      "s"."name" AS "student_name",
      "c"."name" AS "company_name",
      "iv"."name" AS "interviewer_name",
      "i"."selectedTime" AS "interview_time",
      "i"."SelectedDate" AS "interview_date",
      "a"."jobRole" AS "jobRole",
      "i"."interviewToken" AS "interviewToken",
      "i"."interviewStatus" AS "interviewStatus"
    FROM
      "interviews" AS i
    JOIN
      "studentcvs" AS s ON "i"."studentId" = "s"."id"
    JOIN
      "addrequests" AS a ON "s"."addRequestId" = "a"."id"
    JOIN
      "companies" AS c ON "a"."companyId" = "c"."id"
    JOIN
      "interviewers" AS iv ON "i"."interviewerId" = "iv"."id"
    WHERE
      "i"."interviewStatus" = 'cancelled'
    
    `;

      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const subscriptionCount = async () => {
    try {
      const query = ` SELECT all_days.subscription_day, COUNT(subscriptions.subscription_day) AS subscriptions_count
      FROM (
        SELECT 'Sunday' AS subscription_day
        UNION ALL
        SELECT 'Monday'
        UNION ALL
        SELECT 'Tuesday'
        UNION ALL
        SELECT 'Wednesday'
        UNION ALL
        SELECT 'Thursday'
        UNION ALL
        SELECT 'Friday'
        UNION ALL
        SELECT 'Saturday'
      ) all_days
      LEFT JOIN (
        SELECT TO_CHAR("startDate", 'Day') AS subscription_day
        FROM "subscriptions"   WHERE "startDate" >= DATE_TRUNC('week', CURRENT_DATE)
      ) subscriptions ON TRIM(UPPER(all_days.subscription_day)) = TRIM(UPPER(subscriptions.subscription_day))
      GROUP BY all_days.subscription_day
      ORDER BY all_days.subscription_day;
      `;

      type SubscriptionData = {
        subscription_day: string;
        subscriptions_count: string;
      };
      const result: SubscriptionData[] = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });

      const convertedResult = result.map((item) => ({
        subscription_day: item.subscription_day.trim(),
        subscriptions_count: parseInt(item.subscriptions_count),
      }));

      return convertedResult;
    } catch (error) {
      console.log(error);
    }
  };

  const monthwiseSubscriptionCount = async () => {
    try {
      const query = `
      SELECT
        TO_CHAR(dates.month, 'Month') AS subscriptionMonth,
        COALESCE(sub.count, 0) AS subscriptionCount
      FROM
        (
          SELECT generate_series(
            DATE_TRUNC('YEAR', CURRENT_DATE),
            DATE_TRUNC('YEAR', CURRENT_DATE) + INTERVAL '1 YEAR' - INTERVAL '1 DAY',
            INTERVAL '1 MONTH'
          ) AS month
        ) AS dates
        LEFT JOIN (
          SELECT
            DATE_TRUNC('MONTH', "startDate") AS month,
            COUNT(*) AS count
          FROM
            "subscriptions"
          WHERE
            EXTRACT(YEAR FROM "startDate") = EXTRACT(YEAR FROM CURRENT_DATE)
          GROUP BY
            month
        ) AS sub ON dates.month = sub.month
      ORDER BY
        dates.month;
    `;

      type SubscriptionData = {
        subscriptionmonth: string;
        subscriptioncount: string;
      };
      const result: SubscriptionData[] = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      console.log(result);

      const convertedResult = result.map((item) => ({
        subscription_month: item.subscriptionmonth?.trim(),
        subscriptions_count: parseInt(item.subscriptioncount),
      }));
      console.log(convertedResult);

      return convertedResult;
    } catch (error) {
      console.log(error);
    }
  };

  const totalClientsAndInterviewCount = async () => {
    try {
      const clientQuery = `SELECT COUNT(*) AS clientsCount  FROM "companies" ;`;
      const clientsCount: any = await sequelize.query(clientQuery, {
        type: QueryTypes.SELECT,
      });
      const clientCounts = clientsCount[0].clientscount;

      const interviewerQuery = `
       SELECT COUNT(*)  AS interviewerCount  FROM "interviewers"`;

      const interviewerCount: any = await sequelize.query(interviewerQuery, {
        type: QueryTypes.SELECT,
      });
      console.log(interviewerCount, "interviewerCount");

      const interviewersCount = interviewerCount[0].interviewercount;

      const completinterviewsQuery = `
       SELECT COUNT(*) AS completedInterviewsCount  FROM "interviews" WHERE "interviewStatus"='completed'`;

      const completedInterviewsCount: any = await sequelize.query(
        completinterviewsQuery,
        {
          type: QueryTypes.SELECT,
        }
      );

      const completedInterviews =
        completedInterviewsCount[0].completedinterviewscount;
      const cancelledInterviewQuery = `
       SELECT COUNT(*) AS cancelledInterviewsCount  FROM "interviews" WHERE "interviewStatus"='cancelled'`;

      const cancelledInterviewsCount: any = await sequelize.query(
        cancelledInterviewQuery,
        {
          type: QueryTypes.SELECT,
        }
      );
      console.log(cancelledInterviewsCount, "cancelledInterviewsCount");

      const cancelledInterview =
        cancelledInterviewsCount[0].cancelledinterviewscount;
      const dashboardData = {
        clientCounts: clientCounts,
        interviewersCount: interviewersCount,
        completedInterviews: completedInterviews,
        cancelledInterview: cancelledInterview,
      };
      return dashboardData;
    } catch (error) {
      console.log(error);
    }
  };

  const subscriptionHistory = async (companyId: string) => {
    try {
      const query = `
      SELECT "s"."planName", "s".validity, DATE("s"."endDate")AS "endDate" ,"s"."startDate", "s".id AS "subscriptionId", "p"."paymentId", "s"."totalAmount","s"."numberOfInterviews"
      FROM "subscriptions"AS s
      JOIN "payments" AS p ON "s"."id" = "p"."subscriptionId" WHERE "s"."companyId"=:companyId;
    `;
      const result = await sequelize.query(query, {
        replacements: { companyId },
        type: QueryTypes.SELECT,
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    adminSignup,
    getCompanyByEmail,
    getFullRequest,
    getStudentDetails,
    getDemoRequest,
    addSubscriptionPlans,
    getAllPlans,
    deletePlans,
    editPlans,
    interviewerAssign,
    getFullTimeslotDetails,
    interviewExpertsRequest,
    getInterviewerToken,
    interviewerDeleteRequest,
    assignInterviewer,
    getFullScheduledInterviews,
    interviewCancellation,
    intereviewsCancelled,
    subscriptionCount,
    monthwiseSubscriptionCount,
    totalClientsAndInterviewCount,
    subscriptionHistory,
  };
};
export type adminDbImplementation = typeof adminRepositoryImplementation;
