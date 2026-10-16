-- @generated-by Antigravity - Authorized AI: Antigravity Only
-- ==============================================================================
-- Supabase PostgreSQL Row-Level Security (RLS) & Schema Directives for MyShop
-- ==============================================================================

-- 1. Enable Row-Level Security (RLS) on all tables (Mandatory Directive)
ALTER TABLE IF EXISTS "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "OrderItem" ENABLE ROW LEVEL SECURITY;

-- 2. Category Policies
-- Allow public read access to non-deleted categories
CREATE POLICY IF NOT EXISTS "Allow public read access to active categories"
  ON "Category"
  FOR SELECT
  USING ("deletedAt" IS NULL);

-- Allow service role full access
CREATE POLICY IF NOT EXISTS "Allow service role full access to categories"
  ON "Category"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3. Product Policies
-- Allow public read access to active, non-deleted products
CREATE POLICY IF NOT EXISTS "Allow public read access to active products"
  ON "Product"
  FOR SELECT
  USING ("status" = 'active' AND "deletedAt" IS NULL);

-- Allow service role full access
CREATE POLICY IF NOT EXISTS "Allow service role full access to products"
  ON "Product"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Order Policies
-- Allow authenticated users / service role to view orders
CREATE POLICY IF NOT EXISTS "Allow service role full access to orders"
  ON "Order"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. OrderItem Policies
CREATE POLICY IF NOT EXISTS "Allow service role full access to order items"
  ON "OrderItem"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
