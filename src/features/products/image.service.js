// @generated-by Antigravity - Authorized AI: Antigravity Only

import path from 'path';
import fs from 'fs';
import os from 'os';
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
    this.baseUploadDir = process.env.VERCEL
      ? path.join(os.tmpdir(), 'uploads', 'products')
      : path.resolve(process.cwd(), 'public', 'uploads', 'products');
    this.ensureDirectoryExists(this.baseUploadDir);
  }

  ensureDirectoryExists(dir) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    } catch {
      // Graceful fallback for read-only serverless platforms
      const fallback = path.join(os.tmpdir(), 'uploads', 'products');
      try {
        if (!fs.existsSync(fallback)) {
          fs.mkdirSync(fallback, { recursive: true });
        }
        this.baseUploadDir = fallback;
      } catch {
        // Suppress directory creation error on cold start
      }
    }
  }

  /**
   * Generates URL-friendly slug from text (e.g. "Crimson Red & Gold" -> "crimson-red-gold")
   */
  slugify(text) {
    if (!text) return 'default';
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'default';
  }

  /**
   * Generates secure unique filename for saree images
   */
  generateFilename(originalFilename, mimetype, prefix = 'saree') {
    const ext = MIME_TO_EXT[mimetype] || path.extname(originalFilename || '') || '.jpg';
    const timestamp = Date.now();
    const random = crypto.randomBytes(6).toString('hex');
    const safePrefix = this.slugify(prefix);
    return `${safePrefix}-${timestamp}-${random}${ext}`;
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
   * Handles multipart file stream upload with optional product and color scoping
   */
  async saveUploadedFile(fileStream, filename, mimetype, options = {}) {
    this.validateMimeType(mimetype);

    const { productId, colorName, prefix } = options;
    const colorSlug = colorName ? this.slugify(colorName) : null;
    const subPath = [productId, colorSlug].filter(Boolean).join('/');

    const targetDir = subPath
      ? path.join(this.baseUploadDir, ...subPath.split('/'))
      : this.baseUploadDir;

    this.ensureDirectoryExists(targetDir);

    const filenamePrefix = prefix || (colorSlug ? `saree-${colorSlug}` : 'saree');
    const safeFilename = this.generateFilename(filename, mimetype, filenamePrefix);
    const localFilePath = path.join(targetDir, safeFilename);

    // Save to local disk
    await pipeline(fileStream, fs.createWriteStream(localFilePath));

    const relativeUrl = subPath
      ? `/uploads/products/${subPath}/${safeFilename}`
      : `/uploads/products/${safeFilename}`;

    // Mirror to Supabase Storage if configured
    const supabase = getSupabaseAdmin() || getSupabase();
    if (supabase) {
      try {
        const fileBuffer = await fs.promises.readFile(localFilePath);
        const storagePath = subPath
          ? `sarees/${subPath}/${safeFilename}`
          : `sarees/${safeFilename}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(storagePath, fileBuffer, {
            contentType: mimetype,
            upsert: true
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('products')
            .getPublicUrl(storagePath);

          if (publicUrlData?.publicUrl) {
            return {
              filename: safeFilename,
              url: publicUrlData.publicUrl,
              storage: 'supabase',
              localUrl: relativeUrl
            };
          }
        }
      } catch (err) {
        console.warn('Supabase storage upload bypassed; serving from local static storage:', err.message);
      }
    }

    return {
      filename: safeFilename,
      url: relativeUrl,
      storage: 'local',
      localUrl: relativeUrl
    };
  }

  /**
   * Handles base64 data URL upload for saree images
   */
  async saveBase64Image(base64Data, filenameHint = 'saree', options = {}) {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 image data URL format.');
    }

    const mimetype = matches[1];
    const base64Content = matches[2];
    this.validateMimeType(mimetype);

    const { productId, colorName } = options;
    const colorSlug = colorName ? this.slugify(colorName) : null;
    const subPath = [productId, colorSlug].filter(Boolean).join('/');

    const targetDir = subPath
      ? path.join(this.baseUploadDir, ...subPath.split('/'))
      : this.baseUploadDir;

    this.ensureDirectoryExists(targetDir);

    const buffer = Buffer.from(base64Content, 'base64');
    const safeFilename = this.generateFilename(filenameHint, mimetype, colorSlug || 'saree');
    const localFilePath = path.join(targetDir, safeFilename);

    await fs.promises.writeFile(localFilePath, buffer);

    const relativeUrl = subPath
      ? `/uploads/products/${subPath}/${safeFilename}`
      : `/uploads/products/${safeFilename}`;

    return {
      filename: safeFilename,
      url: relativeUrl,
      storage: 'local',
      localUrl: relativeUrl
    };
  }
}

export const imageService = new ImageService();
