"use strict";
// import multer from 'multer';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadCv = void 0;
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
//  export const upload = multer({
//   storage: storage 
// });
// const interviewerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
//  export const  interviewExpertUpload= multer({
//   storage: interviewerStorage 
// });
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const config_1 = __importDefault(require("../../config"));
// Cloudinary configuration
console.log(config_1.default.api_key, config_1.default.cloud_name, config_1.default.api_secret);
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloud_name,
    api_key: config_1.default.api_key,
    api_secret: config_1.default.api_secret
});
// Multer configuration
const storageOptions = {
    cloudinary: cloudinary_1.v2,
    params: {
        resource_type: 'raw',
        allowed_formats: ['pdf'],
        public_id: (req, file) => {
            const fileName = file.originalname.split('.').slice(0, -1).join('.');
            return fileName;
        },
    },
};
const storage = new multer_storage_cloudinary_1.CloudinaryStorage(storageOptions);
exports.uploadCv = (0, multer_1.default)({ storage: storage }).single('cv');
exports.upload = (0, multer_1.default)({ storage: storage }).single('cvFile');
