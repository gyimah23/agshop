-- Disable RLS on products table since we're using service role for mutations
-- and anonymous read is allowed
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Sellers can insert their products" ON public.products;
DROP POLICY IF EXISTS "Sellers can update their products" ON public.products;
DROP POLICY IF EXISTS "Sellers can delete their products" ON public.products;
