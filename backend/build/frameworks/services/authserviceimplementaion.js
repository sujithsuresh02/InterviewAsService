"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceImplementation = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const authServiceImplementation = () => {
    const encryptPassword = async (password) => {
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        return hashedPassword;
    };
    const comparePassword = (password, hashedPassword) => {
        return bcryptjs_1.default.compare(password, hashedPassword);
    };
    const generateAcessesToken = (payload) => {
        const acessesToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, {
            expiresIn: "7d",
        });
        return acessesToken;
    };
    const generateRefreshTokenToken = (payload) => {
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, {
            expiresIn: "7d",
        });
        return refreshToken;
    };
    const verifyAccessToken = (token) => {
        try {
            console.log("hlo access");
            return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        }
        catch (error) {
            console.log(error, "error in database ");
        }
    };
    const verifyRefreshToken = (token) => {
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    };
    const emailverificationofForgotPassword = async (name, email, id) => {
        try {
            console.log(name, email, id);
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: config_1.default.EMAIL,
                    pass: config_1.default.EMAIL_PASSWORD,
                },
            });
            const mailOptions = {
                from: config_1.default.EMAIL,
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
        verifyAccessToken,
        verifyRefreshToken,
        emailverificationofForgotPassword,
    };
};
exports.authServiceImplementation = authServiceImplementation;
