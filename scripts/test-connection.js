// @generated-by Antigravity - Authorized AI: Antigravity Only

import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function checkConnection() {
  const startTime = Date.now();
  try {
    const rawResult = await prisma.$queryRaw`SELECT 1 as connected, current_database() as db_name, version() as pg_version, now() as server_time`;
    const latency = Date.now() - startTime;

    const categoriesCount = await prisma.category.count();
    const productsCount = await prisma.product.count();
    const ordersCount = await prisma.order.count();

    console.log('--- SUPABASE DATABASE CONNECTION STATUS ---');
    console.log('✅ Connection: SUCCESSFUL');
    console.log(`⏱️  Round-trip Latency: ${latency}ms`);
    console.log(`📦 Database: ${rawResult[0].db_name}`);
    console.log(`🐘 Engine: ${rawResult[0].pg_version.split(' on ')[0]}`);
    console.log(`🕒 Database Clock: ${rawResult[0].server_time.toISOString()}`);
    console.log('📊 Synchronized Table Records:');
    console.log(`   - Categories: ${categoriesCount}`);
    console.log(`   - Products:   ${productsCount}`);
    console.log(`   - Orders:     ${ordersCount}`);
    console.log('-------------------------------------------');
  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
