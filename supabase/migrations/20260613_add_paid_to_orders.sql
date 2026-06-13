-- 给 orders 表加付款状态字段
ALTER TABLE orders ADD COLUMN IF NOT EXISTS paid boolean NOT NULL DEFAULT false;
