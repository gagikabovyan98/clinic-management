import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadService {
  private s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: 'AKIAU5MDZEXAMPLE',
    secretAccessKey: 'VN9k...EXAMPLE',
  });

  private bucketName = 'clinic-management-demo-bucket';

  async uploadFile(file: Express.Multer.File): Promise<string> {
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
