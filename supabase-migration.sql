-- ============================================================
-- Wise 出海助手 - Supabase 数据库初始化脚本
-- 在 Supabase Dashboard > SQL Editor 中执行
-- ============================================================

-- 用户扩展信息表
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now() not null
);

-- 商品表
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  price integer not null check (price > 0),  -- 单位：分
  stock integer not null default 0 check (stock >= 0),
  category text not null,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz default now() not null
);

-- 订单表
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete restrict not null,
  quantity integer not null default 1 check (quantity > 0),
  recipient_name text not null,
  recipient_phone text not null,
  address text not null,
  remark text,
  status text not null default 'pending' check (status in ('pending', 'shipped', 'completed', 'cancelled')),
  tracking_number text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================================
-- Row Level Security (RLS) 策略
-- ============================================================

-- 启用 RLS
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- profiles 策略
create policy "用户可以查看自己的 profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "用户可以更新自己的 profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "管理员可以查看所有 profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- products 策略（所有人可以查看上架商品，管理员可以增删改）
create policy "所有人可以查看上架商品"
  on public.products for select
  using (is_active = true or exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ));

create policy "管理员可以管理商品"
  on public.products for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- orders 策略
create policy "用户可以查看自己的订单"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "用户可以创建订单"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "管理员可以查看和更新所有订单"
  on public.orders for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- 触发器：新用户注册时自动创建 profile
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'user')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 示例数据：giffgaff 手机卡
-- ============================================================

insert into public.products (name, slug, description, price, stock, category, is_active)
values (
  'giffgaff 英国手机卡',
  'giffgaff',
  E'英国 O2 旗下虚拟运营商，免月租长期保号，国内即可激活使用。\n\n【主要特点】\n• 永久免月租，只需保持账户余额\n• 英国真实号码（+44 开头），可接收短信\n• 支持接收 PayPal、Amazon、WhatsApp 等验证码\n• 国内激活，无需出境\n• 支持全球漫游接收短信\n\n【适用场景】\n• 注册海外 App Store / Google Play\n• 注册 PayPal、Wise 等海外支付\n• 注册 Telegram、WhatsApp\n• 海外旅行备用号码\n\n【购买包含】\n• giffgaff SIM 卡一张（Nano/Micro/Standard 可选）\n• 详细激活教程\n• 全程微信技术支持',
  6900,   -- ¥69.00（单位：分）
  100,
  '手机卡',
  true
)
on conflict (slug) do nothing;

insert into public.products (name, slug, description, price, stock, category, is_active)
values (
  'giffgaff 英国手机卡（含 £10 余额）',
  'giffgaff-plus',
  E'英国 O2 旗下虚拟运营商，永久免月租，含首充 £10 余额，开卡即可漫游上网。\n\n【主要特点】\n• 永久免月租，只需保持账户余额\n• 含 £10 首充，可立即使用漫游流量\n• 英国真实号码（+44 开头），可接收短信\n• 支持接收 PayPal、Amazon、WhatsApp 等验证码\n\n【购买包含】\n• giffgaff SIM 卡一张\n• £10 账户余额\n• 详细激活教程\n• 全程微信技术支持',
  11900,
  50,
  '英国手机卡',
  true
)
on conflict (slug) do nothing;

insert into public.products (name, slug, description, price, stock, category, is_active)
values (
  'Ultra Mobile 美国手机卡',
  'ultra-mobile',
  E'美国 T-Mobile 网络，月租低，可保号，适合注册美区账户、接收美国验证码。\n\n【主要特点】\n• 美国真实号码（+1 开头）\n• T-Mobile 网络覆盖\n• 低月租套餐可选\n• 支持接收美国短信验证码\n\n【适用场景】\n• 注册美区 Apple ID / Google Play\n• 注册美国银行、券商账户\n• 接收美国平台验证码\n\n【购买包含】\n• Ultra Mobile SIM 卡一张\n• 详细激活教程\n• 全程微信技术支持',
  9900,
  30,
  '美国手机卡',
  true
)
on conflict (slug) do nothing;
