import bcrypt from 'bcryptjs';
 import Jwt  from 'jsonwebtoken';
 import configKeys from '../../config';
import nodemailer, { Transporter } from "nodemailer";
import { QueryTypes } from "sequelize";
import { sequelize } from '../database/Postgres/Connection/connection';
export const  adminServiceImplementation=()=> {
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    console.log('hashed ');
    
    
    return hashedPassword;
  };

  
  const comparePassword=(password:string,hashedPassword:any)=>{
    
    return bcrypt.compare(password,hashedPassword)
 }


 const generateAcessesToken=(payload:any)=>{
  const acessesToken = Jwt.sign(payload, configKeys.JWT_SECRET, {
      expiresIn: "1d",
  });
  return acessesToken
}
const generateRefreshTokenToken=(payload:any)=>{
  const refreshToken = Jwt.sign(payload, configKeys.JWT_SECRET, {
      expiresIn: "7d",
  });
  return refreshToken
}


const sendEmailConfirmation = async (email: string) => {
  console.log(configKeys.EMAIL);
  console.log(configKeys.EMAIL_PASSWORD)
  console.log("my email credentials ");
  
  
  try {

    let emailId=email
    const countQuery = `
    SELECT "ValidationToken"
    FROM "demos"
    WHERE "emailId" = :emailId;
  `;
    const response:any = await sequelize.query(countQuery, {
      type: QueryTypes.SELECT,
      replacements: { emailId},
    });
  console.log(response);
   console.log('valdation token');
   
    // Create a transporter using SMTP
    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: configKeys.EMAIL, // Your email address
        pass: configKeys.EMAIL_PASSWORD, // Your email password
      },
    });

    // Create the email message
    const mailOptions = {
      from: configKeys.EMAIL, // Sender email address
      to: email, // Recipient email address
      subject: "Thank You for Your Interest in InterviewXperts", // Email subject
      html: `<p>Dear Customer,</p>
      <p>Thank you for your interest in InterviewXperts. We appreciate your time and consideration in requesting a demo. We are excited to have the opportunity to showcase our services and help you excel in your interviews.</p>
      <p>At InterviewXperts, we are committed to providing you with the best resources and support to enhance your interview skills and boost your confidence. We believe that our comprehensive platform can make a significant difference in your interview performance.</p>
      <p>To get started, please follow the link below to sign up for an account:</p>
      <p><a href="http://localhost:5173/signup/${response[0].ValidationToken}">Sign Up</a></p>
      <p>If you have any questions or need further assistance, feel free to reach out to us. We look forward to assisting you on your journey to interview success!</p>
      <p>Best regards,<br/>[Sujith S]<br/>InterviewXperts Team</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
        return info.response
      }
    });
  } catch (error) {
    console.log(error);
  }
};

  return{
    encryptPassword,
    comparePassword,
    generateAcessesToken,
    generateRefreshTokenToken,
    sendEmailConfirmation

  }
}


export type adminServicesImplementation = typeof adminServiceImplementation 
