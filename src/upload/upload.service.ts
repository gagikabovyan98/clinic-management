import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadService {
  private s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'FAKE_KEY',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'FAKE_SECRET',
  });

  private bucketName = 'clinic-management-demo-bucket';

  async uploadFile(file: Express.Multer.File): Promise<string> {
    // Если FAKE_KEY, то просто возвращаем заглушку
    if (process.env.AWS_ACCESS_KEY_ID === 'FAKE_KEY') {
      const fakeUrl = `https://example.com/fake-s3/${uuid()}-${file.originalname}`;
      console.log('FAKE UPLOAD:', fakeUrl);
      return fakeUrl;
    }

    const key = `uploads/${uuid()}-${file.originalname}`;

    await this.s3
      .putObject({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}
