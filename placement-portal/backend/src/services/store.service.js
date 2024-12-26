// src/services/storage.service.js
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

class StorageService {
  constructor() {
    this.s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
    });

    this.upload = multer({
      storage: multerS3({
        s3: this.s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^(application|image|text)/)) {
          cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
      },
    });
  }

  async deleteFile(fileUrl) {
    const key = fileUrl.split('/').pop();
    await this.s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    }).promise();
  }
}

export const storageService = new StorageService();

