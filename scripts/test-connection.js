// @generated-by Antigravity - Authorized AI: Antigravity Only

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Support explicit target flags (--cloud / --supabase vs --local)
const args = process.argv.slice(2);
const forceCloud = args.includes('--cloud') || args.includes('--supabase') || process.env.TARGET_ENV === 'cloud';
const forceLocal = args.includes('--local') || process.env.TARGET_ENV === 'local';

if (forceCloud) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
} else {
  dotenv.config();
  const envLocalPath = path.resolve(process.cwd(), '.env.local');
  const isLocalEnv = fs.existsSync(envLocalPath);
  if (isLocalEnv || forceLocal) {
    dotenv.config({ path: envLocalPath, override: true });
  }
}

const { PrismaClient } = await import('@prisma/client');
const prisma = new PrismaClient();

async function checkConnection() {
  const startTime = Date.now();
  try {
    const rawResult = await prisma.$queryRaw`SELECT 1 as connected, current_database() as db_name, version() as pg_version, now() as server_time`;
    const latency = Date.now() - startTime;

    const categoriesCount = await prisma.category.count();
    const productsCount = await prisma.product.count();
    const ordersCount = await prisma.order.count();
    const customersCount = await prisma.customer.count();

    const isLocalhost = (process.env.DATABASE_URL || '').includes('localhost') || (process.env.DATABASE_URL || '').includes('127.0.0.1');
    const targetLabel = isLocalhost ? 'LOCAL POSTGRESQL' : 'SUPABASE CLOUD';

    console.log(`--- ${targetLabel} DATABASE CONNECTION STATUS ---`);
    console.log(`✅ Connection: SUCCESSFUL`);
    console.log(`🌍 Target: ${isLocalhost ? 'Local Development DB' : 'Remote Cloud DB'}`);
    console.log(`⏱️  Round-trip Latency: ${latency}ms`);
    console.log(`📦 Database: ${rawResult[0].db_name}`);
    console.log(`🐘 Engine: ${rawResult[0].pg_version.split(' on ')[0]}`);
    console.log(`🕒 Database Clock: ${rawResult[0].server_time.toISOString()}`);
    console.log('📊 Synchronized Table Records:');
    console.log(`   - Customers:  ${customersCount}`);
    console.log(`   - Categories: ${categoriesCount}`);
    console.log(`   - Products:   ${productsCount}`);
    console.log(`   - Orders:     ${ordersCount}`);
    console.log('--------------------------------------------------');
  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
