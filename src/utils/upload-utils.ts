import { S3 } from 'aws-sdk';
import { InputMaybe, Scalars } from '../__generated__/schema-types';

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadToS3 = async (file: InputMaybe<Scalars['Upload']['input']>) => {
  if (!file) return null;

  try {
    const { createReadStream, filename, mimetype } = await file;
    const uniqueFilename = `${new Date().toISOString()}-${filename}`;

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: `uploads/${uniqueFilename}`,
      Body: createReadStream(),
      ContentType: mimetype,
    };
    const { Location } = await s3.upload(uploadParams).promise();

    return Location;
  } catch (error) {
    throw new Error(error);
  }
};