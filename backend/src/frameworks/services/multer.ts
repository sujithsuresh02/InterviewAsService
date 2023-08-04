// import multer from 'multer';

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


import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import multer from 'multer';
import { Request, RequestHandler } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import configKeys from '../../config';
interface CloudinaryStorageOptions {
  cloudinary: any; // Adjust the type as needed for the cloudinary object
  params: {
    resource_type: string;
    allowed_formats: string[];
    public_id: (req: Request, file: Express.Multer.File) => string;
  };
}

// Cloudinary configuration
console.log(configKeys.api_key,configKeys.cloud_name,configKeys.api_secret);

cloudinary.config({
  cloud_name:configKeys.cloud_name,
  api_key:configKeys.api_key,
  api_secret: configKeys.api_secret
});

// Multer configuration
const storageOptions: CloudinaryStorageOptions = {
  cloudinary: cloudinary,
  params: {
    resource_type: 'raw',
    allowed_formats: ['pdf'],
    public_id: (req: Request, file: Express.Multer.File): string => {
      const fileName = file.originalname.split('.').slice(0, -1).join('.');
      return fileName;
    },
  },
};

const storage = new CloudinaryStorage(storageOptions);
export const uploadCv: RequestHandler = multer({ storage: storage }).single(
  'cv'
);
 export const upload: RequestHandler = multer({ storage: storage }).single('cvFile');








