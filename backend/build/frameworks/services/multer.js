"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interviewExpertUpload = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage
});
const interviewerStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.interviewExpertUpload = (0, multer_1.default)({
    storage: interviewerStorage
});
// import multer from 'multer';
// import cloudinary from 'cloudinary';
// import { v2 as cloudinaryV2 } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import { v4 as uuidv4 } from 'uuid';
// import configKeys from '../../config'
// // Configure Cloudinary
// cloudinaryV2.config({ 
//     cloud_name: configKeys.cloud_name,
//     api_key: configKeys.api_key,
//     api_secret: configKeys.api_secret 
//   });
// // Configure multer storage using Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinaryV2,
//   params: {
//     folder: (req: any, file: any) => 'uploads', // Specify the folder in Cloudinary where you want to store the files
//     resource_type: (req: any, file: any) => {
//       // Determine the resource type based on the file mimetype
//       if (file.mimetype.startsWith('video/')) {
//         return 'video';
//       }
//       return 'auto';
//     },
//     public_id: (req: Express.Request, file: Express.Multer.File) => {
//       const fileName = `${uuidv4()}-${file.originalname}`;
//       return fileName;
//     }
//   } as any
// });
// // Create multer instance with Cloudinary storage
// const upload = multer({ storage });
// export { upload };
