import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async uploadImage(imagePath: string, publicId?: string): Promise<UploadApiResponse> {
        return await cloudinary.uploader.upload(imagePath, {
            public_id: publicId,
        });
    }

    getOptimizedImageUrl(publicId: string): string {
        return cloudinary.url(publicId, {
            fetch_format: 'auto',
            quality: 'auto',
        });
    }

    getAutoCroppedImageUrl(publicId: string, width = 500, height = 500): string {
        return cloudinary.url(publicId, {
            crop: 'auto',
            gravity: 'auto',
            width,
            height,
        });
    }
}
