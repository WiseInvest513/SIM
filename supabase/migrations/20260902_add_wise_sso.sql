-- 旧订单已全部完结：清空旧数据，不读取、不匹配旧 Supabase UID。
truncate table public.orders;

drop policy if exists "用户可以查看自己的订单" on public.orders;
drop policy if exists "用户可以创建订单" on public.orders;
drop policy if exists "管理员可以查看和更新所有订单" on public.orders;

-- Wise 用户资料不落库。仅在用户下单时，把稳定的 sub 写入订单。
alter table public.orders add column if not exists wise_subject text;
alter table public.orders drop column if exists user_id;
alter table public.orders alter column wise_subject set not null;
create index if not exists orders_wise_subject_idx on public.orders(wise_subject);
