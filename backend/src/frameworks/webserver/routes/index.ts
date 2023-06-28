import { Application } from "express";
import authRouter from "./auth";
import companyRouter from "./company";
import adminAuthRouter from "./adminAuthRoute";
import adminRouter from "./admin";
import LandingRouter from "./Landing";
import interviwerRouter from "./Interviewer";
import { authenticateToken } from "../middlewares/companyinterviewerMiddleware";
import { adminauthenticateToken } from "../middlewares/adminMiddleware";
import interviewexpertLandingRouter from "./interviewExpertLanding";
import chatRouter from "./ChatRoute";
import messageRouter from "./message";
const routes = (app: Application) => {
  app.use("/api/auth", authRouter());
  app.use("/api/company", authenticateToken, companyRouter());
  app.use("/api/admin/auth", adminAuthRouter());
  app.use("/api/admin", adminauthenticateToken, adminRouter());
  app.use("/api", LandingRouter());
  app.use("/api", interviewexpertLandingRouter());
  app.use("/api/interviewer", authenticateToken, interviwerRouter());
  app.use("/api/company/chat", chatRouter());
  app.use("/api/message", messageRouter());
};

export default routes;
