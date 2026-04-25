"use server";

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function getStorageStats(userId: string) {
  try {
    // 🚀 Dynamic Prefix based on environment
    const isProd = process.env.NODE_ENV === "production";
    const prefix = isProd ? `uploads/${userId}/` : `dev-uploads/${userId}/`;

    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: prefix,
    });

    const response = await s3.send(command);
    
    const totalSizeBytes = response.Contents?.reduce((acc, obj) => acc + (obj.Size || 0), 0) || 0;
    const fileCount = response.Contents?.length || 0;
    
    const totalSizeMB = Number((totalSizeBytes / (1024 * 1024)).toFixed(2));
    
    return {
      usedMB: totalSizeMB,
      fileCount,
      limitMB: 50,
      files: response.Contents?.slice(0, 4).map(file => ({
        key: file.Key,
        // Make sure assets.withink.me is configured to serve both prefixes
        url: `https://assets.withink.me/${file.Key}`
      })) || []
    };
  } catch (error) {
    console.error("R2 Fetch Error:", error);
    return { usedMB: 0, fileCount: 0, limitMB: 50, files: [] };
  }
}