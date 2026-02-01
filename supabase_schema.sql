-- =====================================================
-- ESPACE PARFUM – IMPROVED SUPABASE SCHEMA
-- (NO NEW TABLES ADDED)
-- =====================================================

-- =========================
-- EXTENSIONS
-- =========================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    discount NUMERIC(5,2) DEFAULT 0 CHECK (discount BETWEEN 0 AND 100),
    category VARCHAR(100) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image TEXT,
    description TEXT,
    is_new BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_new ON products(is_new);

-- =========================
-- COLLECTIONS
-- =========================
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT,
    product_count INTEGER DEFAULT 0 CHECK (product_count >= 0),
    is_exclusive BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_collections_exclusive ON collections(is_exclusive);

-- =========================
-- BRANDS
-- =========================
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    is_trusted BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- =========================
-- ORDERS
-- =========================
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    client VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    wilaya VARCHAR(100) NOT NULL,
    commune VARCHAR(100) NOT NULL,
    adresse TEXT NOT NULL,
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    statut VARCHAR(50) NOT NULL CHECK (
        statut IN ('En attente','En cours','Expédiée','Livrée','Annulée')
    ),
    livraison VARCHAR(50) NOT NULL CHECK (
        livraison IN ('Domicile','Bureau')
    ),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_statut ON orders(statut);
CREATE INDEX idx_orders_date ON orders(date DESC);
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_wilaya ON orders(wilaya);

-- =========================
-- ORDER ITEMS
-- =========================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL
        REFERENCES orders(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- =========================
-- ADMIN USERS
-- =========================
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT now(),
    last_login TIMESTAMPTZ
);

-- =========================
-- UPDATED_AT TRIGGER
-- =========================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_collections_updated
BEFORE UPDATE ON collections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_brands_updated
BEFORE UPDATE ON brands
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_orders_updated
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================
-- ROW LEVEL SECURITY
-- =========================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read products"
ON products FOR SELECT USING (true);

CREATE POLICY "Public read collections"
ON collections FOR SELECT USING (true);

CREATE POLICY "Public read brands"
ON brands FOR SELECT USING (true);

-- Admin full access (Supabase authenticated users)
CREATE POLICY "Admin manage products"
ON products FOR ALL
USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage collections"
ON collections FOR ALL
USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage brands"
ON brands FOR ALL
USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage orders"
ON orders FOR ALL
USING (auth.role() = 'authenticated');

CREATE POLICY "Admin manage order items"
ON order_items FOR ALL
USING (auth.role() = 'authenticated');

-- Public checkout
CREATE POLICY "Public create orders"
ON orders FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public create order items"
ON order_items FOR INSERT
WITH CHECK (true);

-- =========================
-- BUSINESS FUNCTIONS
-- =========================
CREATE OR REPLACE FUNCTION generate_order_id()
RETURNS VARCHAR(50) AS $$
DECLARE
    next_num INTEGER;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(id FROM 5) AS INTEGER)),0) + 1
    INTO next_num FROM orders;

    RETURN 'CMD-' || LPAD(next_num::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- =========================
-- CONTACT MESSAGES
-- =========================
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (
        status IN ('new', 'read', 'replied', 'archived')
    ),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

-- Trigger for contact messages updated_at
CREATE TRIGGER trg_contact_messages_updated
BEFORE UPDATE ON contact_messages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row level security for contact messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public can insert (send contact messages)
CREATE POLICY "Public create contact messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

-- Admin can manage all contact messages
CREATE POLICY "Admin manage contact messages"
ON contact_messages FOR ALL
USING (auth.role() = 'authenticated');

-- =========================
-- COMMENTS
-- =========================
COMMENT ON COLUMN products.discount IS 'Percentage discount (0–100)';
COMMENT ON COLUMN orders.livraison IS 'Domicile or Bureau';
COMMENT ON COLUMN products.is_new IS 'Homepage new arrivals';
