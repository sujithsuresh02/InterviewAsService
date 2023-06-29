"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyServiceImplementation = void 0;
const pdf_1 = require("pdfjs-dist/legacy/build/pdf");
// import cohere = require("cohere-ai");
const openai_1 = require("openai");
const config_1 = __importDefault(require("../../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const appError_1 = __importDefault(require("../../utils/appError"));
const httpStatus_1 = require("../../types/httpStatus");
const checkout_server_sdk_1 = __importDefault(require("@paypal/checkout-server-sdk"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const companyServiceImplementation = () => {
    const extractData = async (path) => {
        try {
            const pdf = await (0, pdf_1.getDocument)(path).promise;
            const numPages = pdf.numPages;
            let fullText = "";
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((item) => item.str)
                    .join("");
                fullText += pageText;
            }
            console.log(fullText);
            return categorizeMixedData(fullText).then((result) => {
                console.log(result);
                return result;
            });
        }
        catch (error) {
            throw new appError_1.default(error, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return;
    };
    const configuration = new openai_1.Configuration({
        apiKey: config_1.default.OPEN_API_KEY,
    });
    const openai = new openai_1.OpenAIApi(configuration);
    const categorizeMixedData = async (data) => {
        try {
            const prompt = `Categorize the following text:\n${data}\n into following json format{
        "name": "",
        "email": "",
        "phone": "",
        "experience": "",
        "skills": "",
        "education": "",
        "projects": "",
        "address": "",
        "sex": "",
        "age": "",
        "certifications": ""
      } takes the project and skill field only the important values donote take full data
      `;
            return await openai
                .createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 1000,
            })
                .then((response) => {
                const jsonString = response.data.choices[0].text?.trim();
                console.log(jsonString);
                return jsonString;
            });
        }
        catch (error) {
            console.error("Error categorizing mixed data:", error);
        }
    };
    const environment = new checkout_server_sdk_1.default.core.SandboxEnvironment(config_1.default.PAYPAL_CLIENT_ID, config_1.default.PAYPAL_CLIENT_SECRET);
    const client = new checkout_server_sdk_1.default.core.PayPalHttpClient(environment);
    async function createSubscription({ planName, validity, companyId, planId, totalAmount, }) {
        try {
            const conversionRate = 0.014;
            console.log(totalAmount);
            const calculateUSDAmount = (totalAmount) => {
                const usdAmount = totalAmount * conversionRate;
                return parseInt(usdAmount.toFixed(2)); // Convert the result to a number
            };
            const usdAmount = calculateUSDAmount(totalAmount);
            console.log(usdAmount);
            console.log("calculated us amont");
            function calculateEndDate(startDate, validity) {
                const regex = /(\d+)\s*(\D+)/;
                const matchResult = regex.exec(validity);
                if (!matchResult) {
                    throw new Error("Invalid validity format");
                }
                const [, amountString, unit] = matchResult;
                const amount = parseInt(amountString.trim(), 10);
                if (isNaN(amount)) {
                    throw new Error("Invalid amount");
                }
                console.log(amount, "amount");
                console.log(unit, "unit");
                let endDate;
                if (unit.includes("year")) {
                    endDate = new Date(startDate.getFullYear() + amount, startDate.getMonth(), startDate.getDate());
                }
                else if (unit.includes("month")) {
                    endDate = new Date(startDate.getFullYear(), startDate.getMonth() + amount, startDate.getDate());
                }
                else if (unit.includes("days")) {
                    endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + amount);
                }
                else {
                    throw new Error("Invalid validity unit");
                }
                return endDate;
            }
            const startDate = new Date();
            console.log(startDate, "startDate");
            const endDate = calculateEndDate(startDate, validity);
            console.log(endDate, "enddate");
            const request = new checkout_server_sdk_1.default.orders.OrdersCreateRequest();
            request.prefer("return=representation");
            request.requestBody({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: usdAmount.toString(),
                        },
                    },
                ],
            });
            const order = await client.execute(request);
            const orderId = order.result.id;
            return { orderId, startDate, endDate };
        }
        catch (error) {
            console.log(error);
        }
    }
    const verifyPayment = async (orderId) => {
        try {
            const request = new checkout_server_sdk_1.default.orders.OrdersCaptureRequest(orderId);
            const capture = await client.execute(request);
            const paymentId = capture.result.purchase_units[0].payments.captures[0].id;
            const payerId = capture.result.payer.payer_id;
            console.log(paymentId);
            console.log("paymentid");
            console.log(payerId);
            console.log("payment completed successfully");
            return paymentId;
        }
        catch (error) {
            console.log(error);
        }
    };
    const resetPasswordEmailConfirmation = (email, name, Token) => {
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
            const mailOptions = {
                from: config_1.default.EMAIL,
                to: email,
                subject: " Interviewer Application Status - Rejection",
                html: `  <p>Dear ${name},</p>
        <p>We have received a request to reset your password for your InterviewXperts account. If you did not make this request, please ignore this email.</p>
        <p>To reset your password, please click on the following link:</p>
        <p><a href="https://interviewxperts.online/reset_password/${Token}">Reset Password</a></p>
        <p>If the link doesn't work, you can copy and paste the following URL into your web browser:</p>
        <p>Please note that this link is valid for a limited time. After that, you'll need to request a new password reset.</p>
        <p>If you have any questions or need further assistance, please contact our support team.</p>
        <p>Best regards,<br/>Sujith S<br/>InterviewXperts Team</p></p>
    `,
            };
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        reject(error);
                    }
                    else {
                        console.log("Email sent:", info.response);
                        resolve(true);
                    }
                });
            });
        }
        catch (error) { }
    };
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
    return {
        extractData,
        createSubscription,
        verifyPayment,
        resetPasswordEmailConfirmation,
        encryptPassword,
        comparePassword
    };
};
exports.companyServiceImplementation = companyServiceImplementation;
