import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Product {
  id: number;
  name: string;
  price: number;
  falcon_price?: number | null;
  discount: number;
  category: string;
  stock: number;
  image: string;
  description: string;
  is_new: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  product_count: number;
  is_exclusive: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Brand {
  id: number;
  name: string;
  description: string;
  is_trusted: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id?: number;
  order_id: string;
  product_name: string;
  quantity: number;
  price: number;
  created_at?: string;
}

export interface Order {
  id: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  wilaya: string;
  commune: string;
  delivery_method: string;
  shipping_cost: number;
  total_amount: number;
  statut: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at?: string;
}

// Helper function to upload image to Supabase Storage
export const uploadImage = async (file: File, bucket: string = 'parfum_images'): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
};
