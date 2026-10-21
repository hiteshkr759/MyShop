// @generated-by Antigravity - Authorized AI: Antigravity Only

import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { pipeline } from 'stream/promises';
import { getSupabaseAdmin, getSupabase } from '../../bootstrap/supabase.js';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
]);

const MIME_TO_EXT = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif'
};

export class ImageService {
  constructor() {
    this.uploadDir = path.resolve(process.cwd(), 'public', 'uploads', 'products');
    this.ensureDirectoryExists(this.uploadDir);
  }

  ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Generates secure unique filename for saree images
   */
  generateFilename(originalFilename, mimetype) {
    const ext = MIME_TO_EXT[mimetype] || path.extname(originalFilename || '') || '.jpg';
    const timestamp = Date.now();
    const random = crypto.randomBytes(6).toString('hex');
    return `saree-${timestamp}-${random}${ext}`;
  }

  /**
   * Validates file mimetype
   */
  validateMimeType(mimetype) {
    if (!mimetype || !ALLOWED_MIME_TYPES.has(mimetype.toLowerCase())) {
      throw new Error(`Invalid file type '${mimetype}'. Allowed image formats: JPEG, PNG, WebP, GIF.`);
    }
  }

  /**
   * Handles multipart file stream upload
   * Saves to local static directory, and mirrors to Supabase Storage if configured
   */
  async saveUploadedFile(fileStream, filename, mimetype) {
    this.validateMimeType(mimetype);
    this.ensureDirectoryExists(this.uploadDir);

    const safeFilename = this.generateFilename(filename, mimetype);
    const localFilePath = path.join(this.uploadDir, safeFilename);

    // Save to local public/uploads/products/
    await pipeline(fileStream, fs.createWriteStream(localFilePath));

    const localRelativeUrl = `/uploads/products/${safeFilename}`;

    // Optional: Sync to Supabase Storage bucket if credentials and bucket exist
    const supabase = getSupabaseAdmin() || getSupabase();
    if (supabase) {
      try {
        const fileBuffer = await fs.promises.readFile(localFilePath);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(`sarees/${safeFilename}`, fileBuffer, {
            contentType: mimetype,
            upsert: true
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('products')
            .getPublicUrl(`sarees/${safeFilename}`);

          if (publicUrlData?.publicUrl) {
            return {
              filename: safeFilename,
              url: publicUrlData.publicUrl,
              storage: 'supabase',
              localUrl: localRelativeUrl
            };
          }
        }
      } catch (err) {
        // Fall back gracefully to local storage if Supabase bucket is unconfigured
        console.warn('Supabase storage upload bypassed; serving from local static storage:', err.message);
      }
    }

    return {
      filename: safeFilename,
      url: localRelativeUrl,
      storage: 'local',
      localUrl: localRelativeUrl
    };
  }

  /**
   * Handles base64 data URL upload for saree images
   */
  async saveBase64Image(base64Data, filenameHint = 'saree') {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 image data URL format.');
    }

    const mimetype = matches[1];
    const base64Content = matches[2];
    this.validateMimeType(mimetype);

    const buffer = Buffer.from(base64Content, 'base64');
    const safeFilename = this.generateFilename(filenameHint, mimetype);
    const localFilePath = path.join(this.uploadDir, safeFilename);

    await fs.promises.writeFile(localFilePath, buffer);
    return {
      filename: safeFilename,
      url: `/uploads/products/${safeFilename}`,
      storage: 'local'
    };
  }
}

export const imageService = new ImageService();

