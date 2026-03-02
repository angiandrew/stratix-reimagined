

## Problem

All RLS policies across `calls`, `profiles`, and `user_roles` tables are created as **RESTRICTIVE** (`Permissive: No`). PostgreSQL requires at least one PERMISSIVE policy to grant access — RESTRICTIVE policies can only narrow it down. With no PERMISSIVE policies, every query returns empty results for everyone.

## Fix

Drop and recreate all RLS policies as **PERMISSIVE** (the default) with the same logic:

### 1. `calls` table (3 policies)
- **Users can view their own calls** — `SELECT` where `auth.uid() = user_id` (PERMISSIVE)
- **Admins can view all calls** — `SELECT` where `has_role(auth.uid(), 'admin')` (PERMISSIVE)
- **System can insert calls** — `INSERT` with check `true` (PERMISSIVE)

### 2. `profiles` table (5 policies)
- **Users can view their own profile** — `SELECT` where `auth.uid() = id` (PERMISSIVE)
- **Admins can view all profiles** — `SELECT` where `has_role(auth.uid(), 'admin')` (PERMISSIVE)
- **Users can update their own profile** — `UPDATE` where `auth.uid() = id` (PERMISSIVE)
- **Admins can update all profiles** — `UPDATE` where `has_role(auth.uid(), 'admin')` (PERMISSIVE)
- **Service role can insert profiles** — `INSERT` with check `true` (PERMISSIVE)

### 3. `user_roles` table (1 policy)
- **Users can view their own roles** — `SELECT` where `auth.uid() = user_id` (PERMISSIVE)

All policies keep the exact same access logic — only the RESTRICTIVE → PERMISSIVE change is needed. This is a single database migration with DROP + CREATE for each policy.

