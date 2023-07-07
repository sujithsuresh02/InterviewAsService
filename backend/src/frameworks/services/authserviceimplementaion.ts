import bcrypt, { compare } from "bcryptjs";
import Jwt from "jsonwebtoken";
import configKeys from "../../config";
import { sequelize } from "../database/Postgres/Connection/connection";
import { QueryTypes } from "sequelize";
import nodemailer, { Transporter } from "nodemailer";
import { log } from "console";

export const authServiceImplementation = () => {
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  const comparePassword = (password: string, hashedPassword: any) => {
    return bcrypt.compare(password, hashedPassword);
  };

  const generateAcessesToken = (payload: any) => {
    const acessesToken = Jwt.sign(payload, configKeys.JWT_SECRET, {
      expiresIn: "7d",
    });
    return acessesToken;
  };
  const generateRefreshTokenToken = (payload: any) => {
    const refreshToken = Jwt.sign(payload, configKeys.JWT_SECRET, {
      expiresIn: "7d",
    });
    return refreshToken;
  };

  const verifyAccessToken = (token: any) => {
    try {
      console.log("hlo access");
      return Jwt.verify(token, configKeys.JWT_SECRET);
    } catch (error) {
      console.log(error, "error in database ");
    }
  };
  const verifyRefreshToken = (token: any) => {
    try {
      return Jwt.verify(token, configKeys.JWT_SECRET);
    } catch (error) {
      console.log(error);
    }
  };
  const emailverificationofForgotPassword = async (
    name: string,
    email: string,
    id: string
  ) => {
    try {
      console.log(name, email, id);

      const transporter: Transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: configKeys.EMAIL,
          pass: configKeys.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: configKeys.EMAIL,
        to: email,
        subject: "Change Password Instructions",
        html: `
      <p>Dear ${name},</p>
      <p>We have received a request to change your password for your InterviewXperts account. If you did not make this request, please ignore this email.</p>
      <p>To change your password, please click on the following link:</p>
      <p><a href="https://interviewxperts.online/change_password/${id}">Change Password</a></p>
      <p>If the link doesn't work, you can copy and paste the following URL into your web browser:</p>
      <p>https://interviewxperts.online/change_password/${id}</p>
      <p>Please note that this link is valid for a limited time. After that, you'll need to request a new password change.</p>
      <p>If you have any questions or need further assistance, please contact our support team.</p>
      <p>Best regards,<br/>Sujith S<br/>InterviewXperts Team</p>
    `,
      };

      const info = await transporter.sendMail(mailOptions);
      if (info) {
        console.log("Email sent:", info.response);
        console.log(info.resposne);

        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    encryptPassword,
    comparePassword,
    generateAcessesToken,
    generateRefreshTokenToken,
    verifyAccessToken,
    verifyRefreshToken,
    emailverificationofForgotPassword,
  };
};

export type AuthService = typeof authServiceImplementation;

export type AuthServiceImple = ReturnType<AuthService>;
