import { useState, useEffect } from 'react';
import { supabase, type Product as SupabaseProduct } from '../lib/supabase';
import { Product } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert Supabase product format to App product format
      const formattedProducts: Product[] = (data || []).map((p: SupabaseProduct) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.image,
        category: p.category,
        isNew: p.is_new,
        discount: p.discount,
      }));

      // If no products from Supabase, use static products
      if (formattedProducts.length === 0) {
        console.log('No products in Supabase, using static products');
        setProducts(PRODUCTS);
      } else {
        setProducts(formattedProducts);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching products, using static products:', err);
      // Fallback to static products on error
      setProducts(PRODUCTS);
      setError(null); // Don't show error to user, just use fallback
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
}
