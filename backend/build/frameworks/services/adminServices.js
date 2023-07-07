"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServiceImplementation = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/Postgres/Connection/connection");
const adminServiceImplementation = () => {
    const encryptPassword = async (password) => {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        console.log(hashedPassword);
        console.log("hashed ");
        return hashedPassword;
    };
    const comparePassword = (password, hashedPassword) => {
        return bcryptjs_1.default.compare(password, hashedPassword);
    };
    const generateAcessesToken = (payload) => {
        const acessesToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, {
            expiresIn: "1d",
        });
        return acessesToken;
    };
    const generateRefreshTokenToken = (payload) => {
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, {
            expiresIn: "7d",
        });
        return refreshToken;
    };
    const sendEmailConfirmation = async (email) => {
        console.log(config_1.default.EMAIL);
        console.log(config_1.default.EMAIL_PASSWORD);
        console.log("my email credentials ");
        try {
            let emailId = email;
            const countQuery = `
    SELECT "ValidationToken"
    FROM "demos"
    WHERE "emailId" = :emailId;
  `;
            const response = await connection_1.sequelize.query(countQuery, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: { emailId },
            });
            console.log(response);
            console.log("valdation token");
            // Create a transporter using SMTP
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: config_1.default.EMAIL,
                    pass: config_1.default.EMAIL_PASSWORD, // Your email password
                },
            });
            // Create the email message
            const mailOptions = {
                from: config_1.default.EMAIL,
                to: email,
                subject: "Thank You for Your Interest in InterviewXperts",
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
                }
                else {
                    console.log("Email sent:", info.response);
                    return info.response;
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const interviewerConfirmationEmail = async (Token, email, name) => {
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: config_1.default.EMAIL,
                    pass: config_1.default.EMAIL_PASSWORD, // Your email password
                },
            });
            // Create the email message
            const mailOptions = {
                from: config_1.default.EMAIL,
                to: email,
                subject: " You have been selected as an InterviewXperts Interviewer",
                html: `<p>Dear ${name},</p>
    <p>Thank you for expressing your interest in becoming an Interviewer at InterviewXperts. We are pleased to inform you that your request has been approved, and you have been selected to join our team of interview experts.</p>
    <p>To get started, please follow the link below to sign up and create your InterviewXperts Interviewer account:</p>
    <p><a href="https://interviewxperts.online/signup/${Token}">Sign Up</a></p>
    <p>At InterviewXperts, we provide a comprehensive platform that empowers interviewers like you to enhance the interview experience for our users and help them succeed in their interviews.</p>
    <p>If you have any questions or need further assistance, feel free to reach out to our support team. We are here to support you in your journey as an InterviewXperts Interviewer.</p>
    <p>Best regards,<br/>Sujith S<br/>InterviewXperts Team</p>
    `,
            };
            // Send the email
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        reject(error); // Reject the promise with the error
                    }
                    else {
                        console.log("Email sent:", info.response);
                        resolve(true); // Resolve the promise with the desired value
                    }
                });
            });
        }
        catch (error) { }
    };
    const rejectionEmail = (email) => {
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: config_1.default.EMAIL,
                    pass: config_1.default.EMAIL_PASSWORD, // Your email password
                },
            });
            // Create the email message
            const mailOptions = {
                from: config_1.default.EMAIL,
                to: email,
                subject: " Interviewer Application Status - Rejection",
                html: `  <p>Dear Interviewer,</p>
        <p>We regret to inform you that your application to become an Interviewer at InterviewXperts has been rejected. We appreciate your interest and the time you invested in the application process.</p>
        <p>While we received many qualified applications, we had to make difficult decisions based on our current needs and requirements. We encourage you to continue pursuing your passion for interviews and wish you the best in your future endeavors.</p>
        <p>Thank you for considering InterviewXperts, and we appreciate your understanding.</p>
        <p>Best regards,<br/>Sujith S<br/>InterviewXperts Team</p>
      
    `,
            };
            // Send the email
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        reject(error); // Reject the promise with the error
                    }
                    else {
                        console.log("Email sent:", info.response);
                        resolve(true); // Resolve the promise with the desired value
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const InterviewConfirmationMail = (interviewerEmail, studentEmail, Date, Time, interviewToken) => {
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: config_1.default.EMAIL,
                    pass: config_1.default.EMAIL_PASSWORD,
                },
            });
            const recipients = [
                {
                    email: interviewerEmail,
                    subject: "Invitation to Participate in an Interview at InterviewXperts",
                    html: `
          <p>Dear Interviewer,</p>
          <p>We are excited to invite you to participate in an interview at InterviewXperts. Your expertise and insights are highly valued, and we believe you would be a great addition to our team.</p>
          <p>Interview Details:</p>
          <p>- Date: ${Date}</p>
          <p>- Time: ${Time}</p>
          <p>- Meeting Link: <a href="https://interviewxperts.online/meeting/${interviewToken}">Join Interview Meeting</a></p>
          <p>Please make sure to be available at the designated time and click on the meeting link provided above to join the interview.</p>
          <p>Thank you for considering InterviewXperts, and we appreciate your time and contribution to the interview process. We look forward to speaking with you and learning more about your qualifications.</p>
          <p>Best regards,<br/>Sujith S<br/>InterviewXperts Team</p>
          `
                },
                {
                    email: studentEmail,
                    subject: "Invitation for Interview at InterviewXperts",
                    html: `
          <p>Dear Student,</p>
          <p>We are pleased to invite you for an interview at InterviewXperts. Your application has been shortlisted, and we would like to discuss your qualifications and suitability for the position.</p>
          <p>Interview Details:</p>
          <p>- Date: ${Date}</p>
          <p>- Time: ${Time}</p>
          <p>- Meeting Link: <a href="https://interviewxperts.online/meeting/${interviewToken}">Join Interview Meeting</a></p>
          <p>Please make sure to be available at the designated time and click on the meeting link above to join the interview.</p>
          <p>Thank you for your interest in InterviewXperts. We look forward to speaking with you.</p>
          <p>Best regards,<br/>Sujith S<br/>InterviewXperts Team</p>
          `,
                },
            ];
            // Send email to each recipient
            recipients.forEach((recipient) => {
                const mailOptions = {
                    from: config_1.default.EMAIL,
                    to: recipient.email,
                    subject: recipient.subject,
                    html: recipient.html,
                };
                return transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(`Error sending email to ${recipient.email}:`, error);
                    }
                    else {
                        console.log(`Email sent successfully to ${recipient.email}:`);
                    }
                });
                return true;
            });
            return true;
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        encryptPassword,
        comparePassword,
        generateAcessesToken,
        generateRefreshTokenToken,
        sendEmailConfirmation,
        interviewerConfirmationEmail,
        rejectionEmail,
        InterviewConfirmationMail,
    };
};
exports.adminServiceImplementation = adminServiceImplementation;
