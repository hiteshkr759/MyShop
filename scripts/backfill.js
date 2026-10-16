// @generated-by Antigravity - Authorized AI: Antigravity Only

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function backfill() {
  try {
    const products = await prisma.product.findMany({
      where: { sellingPrice: 0 }
    });

    for (const p of products) {
      const price = p.price || 100;
      const costPrice = Number((price / 1.65).toFixed(2));
      const sellingPrice = Number((costPrice * 1.65).toFixed(2));

      await prisma.product.update({
        where: { id: p.id },
        data: {
          costPrice,
          sellingPrice
        }
      });
    }

    console.log(`Backfilled ${products.length} products with CP and SP (+65% markup).`);
  } catch (err) {
    console.error('Backfill error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

backfill();

