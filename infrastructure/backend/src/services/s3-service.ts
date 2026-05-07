import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'ai-eng-curriculum-content';

// Folder structure: modules/, assets/, certificates/, exports/

export async function uploadToS3(key: string, body: Buffer | string, contentType?: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
    ServerSideEncryption: 'AES256',
  });
  await s3Client.send(command);
  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function getSignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(s3Client, command, { expiresIn });
}

export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  await s3Client.send(command);
}

export async function listS3Objects(prefix: string): Promise<string[]> {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: prefix,
  });
  const response = await s3Client.send(command);
  return response.Contents?.map(obj => obj.Key!) || [];
}

// Specific helpers for curriculum content
export async function uploadModuleContent(moduleId: string, fileName: string, content: Buffer): Promise<string> {
  const key = `modules/${moduleId}/${fileName}`;
  return await uploadToS3(key, content, 'application/octet-stream');
}

export async function uploadAsset(fileName: string, content: Buffer, contentType: string): Promise<string> {
  const key = `assets/${fileName}`;
  return await uploadToS3(key, content, contentType);
}

export async function uploadCertificate(userId: string, certificatePdf: Buffer): Promise<string> {
  const key = `certificates/${userId}/${Date.now()}.pdf`;
  return await uploadToS3(key, certificatePdf, 'application/pdf');
}

export async function uploadExport(userId: string, fileName: string, content: Buffer, format: 'pdf' | 'html' | 'json'): Promise<string> {
  const contentType = format === 'pdf' ? 'application/pdf' : format === 'html' ? 'text/html' : 'application/json';
  const key = `exports/${userId}/${fileName}`;
  return await uploadToS3(key, content, contentType);
}