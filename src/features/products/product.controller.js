// @generated-by Antigravity - Authorized AI: Antigravity Only

import { productService } from './product.service.js';
import { imageService } from './image.service.js';

export async function getProductsHandler(request, reply) {
  const result = await productService.getProducts(request.query);

  return reply.status(200).send({
    success: true,
    count: result.products.length,
    pagination: result.pagination,
    data: result.products
  });
}

export async function getProductByIdHandler(request, reply) {
  const { id } = request.params;
  const product = await productService.getProductById(id);

  if (!product) {
    return reply.status(404).send({
      success: false,
      error: { message: `Product with ID '${id}' not found` }
    });
  }

  return reply.status(200).send({
    success: true,
    data: product
  });
}

export async function createProductHandler(request, reply) {
  const {
    name,
    costPrice,
    sellingPrice,
    price,
    categoryId,
    stock,
    fabric,
    weave,
    color,
    blousePiece,
    imageUrl,
    images,
    variants,
    description,
    tags
  } = request.body;

  const created = await productService.createProduct({
    name,
    costPrice,
    sellingPrice,
    price,
    categoryId,
    stock,
    fabric,
    weave,
    color,
    blousePiece,
    imageUrl,
    images,
    variants,
    description,
    tags
  });

  return reply.status(201).send({
    success: true,
    message: 'Product created successfully',
    data: created
  });
}

export async function updateProductHandler(request, reply) {
  const { id } = request.params;
  const updated = await productService.updateProduct(id, request.body);

  if (!updated) {
    return reply.status(404).send({
      success: false,
      error: { message: `Product with ID '${id}' not found` }
    });
  }

  return reply.status(200).send({
    success: true,
    message: 'Product updated successfully',
    data: updated
  });
}

export async function archiveProductHandler(request, reply) {
  const { id } = request.params;
  const archived = await productService.archiveProduct(id);

  if (!archived) {
    return reply.status(404).send({
      success: false,
      error: { message: `Product with ID '${id}' not found` }
    });
  }

  return reply.status(200).send({
    success: true,
    message: 'Product archived successfully',
    data: archived
  });
}

export async function unarchiveProductHandler(request, reply) {
  const { id } = request.params;
  const unarchived = await productService.unarchiveProduct(id);

  if (!unarchived) {
    return reply.status(404).send({
      success: false,
      error: { message: `Product with ID '${id}' not found` }
    });
  }

  return reply.status(200).send({
    success: true,
    message: 'Product unarchived successfully',
    data: unarchived
  });
}

// ==========================================
// COLOR VARIANT HANDLERS
// ==========================================

export async function createVariantHandler(request, reply) {
  const { id } = request.params;
  try {
    const variant = await productService.addVariant(id, request.body);
    return reply.status(201).send({
      success: true,
      message: 'Color variant added successfully',
      data: variant
    });
  } catch (err) {
    return reply.status(400).send({
      success: false,
      error: { message: err.message }
    });
  }
}

export async function updateVariantHandler(request, reply) {
  const { id, variantId } = request.params;
  const updated = await productService.updateVariant(id, variantId, request.body);

  if (!updated) {
    return reply.status(404).send({
      success: false,
      error: { message: `Variant '${variantId}' not found on product '${id}'` }
    });
  }

  return reply.status(200).send({
    success: true,
    message: 'Color variant updated successfully',
    data: updated
  });
}

export async function archiveVariantHandler(request, reply) {
  const { id, variantId } = request.params;
  const archived = await productService.archiveVariant(id, variantId);

  if (!archived) {
    return reply.status(404).send({
      success: false,
      error: { message: `Variant '${variantId}' not found on product '${id}'` }
    });
  }

  return reply.status(200).send({
    success: true,
    message: 'Color variant archived successfully',
    data: archived
  });
}

export async function uploadVariantImagesHandler(request, reply) {
  const { id, variantId } = request.params;
  const setCover = request.query?.setCover === 'true' || request.query?.setCover === true;

  const product = await productService.getProductById(id);
  if (!product) {
    return reply.status(404).send({
      success: false,
      error: { message: `Product with ID '${id}' not found` }
    });
  }

  const existingVariant = product.variants?.find(v => v.id === variantId);
  if (!existingVariant) {
    return reply.status(404).send({
      success: false,
      error: { message: `Variant '${variantId}' not found on product '${id}'` }
    });
  }

  try {
    const uploadedUrls = [];

    if (request.isMultipart()) {
      // Support multiple file parts in single multipart request
      const parts = request.files();
      for await (const part of parts) {
        if (part.file) {
          const saved = await imageService.saveUploadedFile(part.file, part.filename, part.mimetype, {
            productId: id,
            colorName: existingVariant.colorName
          });
          uploadedUrls.push(saved.url);
        }
      }
    } else if (Array.isArray(request.body?.images)) {
      uploadedUrls.push(...request.body.images);
    } else if (request.body?.imageUrl) {
      uploadedUrls.push(request.body.imageUrl);
    } else if (request.body?.base64) {
      const saved = await imageService.saveBase64Image(request.body.base64, existingVariant.colorName, {
        productId: id,
        colorName: existingVariant.colorName
      });
      uploadedUrls.push(saved.url);
    } else {
      return reply.status(400).send({
        success: false,
        error: { message: 'Must provide either multipart image files, an array of imageUrls, or base64 strings' }
      });
    }

    if (uploadedUrls.length === 0) {
      return reply.status(400).send({
        success: false,
        error: { message: 'No images were provided or uploaded' }
      });
    }

    const updatedVariant = await productService.addVariantImages(id, variantId, uploadedUrls, setCover);

    return reply.status(200).send({
      success: true,
      message: `${uploadedUrls.length} photo(s) uploaded and linked to color variant '${existingVariant.colorName}'`,
      data: {
        uploadedUrls,
        variant: updatedVariant
      }
    });
  } catch (err) {
    return reply.status(400).send({
      success: false,
      error: { message: err.message }
    });
  }
}

/**
 * Handles image file upload for a specific product
 * Supports multipart/form-data or base64 JSON payload
 */
export async function uploadProductImageHandler(request, reply) {
  const { id } = request.params;
  const product = await productService.getProductById(id);

  if (!product) {
    return reply.status(404).send({
      success: false,
      error: { message: `Product with ID '${id}' not found` }
    });
  }

  try {
    let saved;
    const isCover = request.query?.isCover === 'true' || request.query?.isCover === true;

    // Check if multipart form upload
    if (request.isMultipart()) {
      const file = await request.file();
      if (!file) {
        return reply.status(400).send({
          success: false,
          error: { message: 'No file provided in multipart form request' }
        });
      }
      saved = await imageService.saveUploadedFile(file.file, file.filename, file.mimetype, {
        productId: id
      });
    } else if (request.body?.base64) {
      // Direct base64 image data payload
      saved = await imageService.saveBase64Image(request.body.base64, product.name, {
        productId: id
      });
    } else if (request.body?.imageUrl) {
      // Direct image URL linking
      saved = { url: request.body.imageUrl };
    } else {
      return reply.status(400).send({
        success: false,
        error: { message: 'Must provide either a multipart file, a base64 string, or an imageUrl' }
      });
    }

    const updated = await productService.addProductImage(id, saved.url, isCover);

    return reply.status(200).send({
      success: true,
      message: 'Saree image uploaded and linked successfully',
      data: {
        imageUrl: saved.url,
        product: updated
      }
    });
  } catch (err) {
    return reply.status(400).send({
      success: false,
      error: { message: err.message }
    });
  }
}

/**
 * Standalone image upload endpoint (e.g. upload before creating saree product)
 */
export async function uploadStandaloneImageHandler(request, reply) {
  try {
    let saved;

    if (request.isMultipart()) {
      const file = await request.file();
      if (!file) {
        return reply.status(400).send({
          success: false,
          error: { message: 'No file provided in multipart upload' }
        });
      }
      saved = await imageService.saveUploadedFile(file.file, file.filename, file.mimetype);
    } else if (request.body?.base64) {
      saved = await imageService.saveBase64Image(request.body.base64);
    } else {
      return reply.status(400).send({
        success: false,
        error: { message: 'Must provide either a multipart file or base64 image string' }
      });
    }

    return reply.status(201).send({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: saved.url,
        filename: saved.filename,
        storage: saved.storage
      }
    });
  } catch (err) {
    return reply.status(400).send({
      success: false,
      error: { message: err.message }
    });
  }
}
