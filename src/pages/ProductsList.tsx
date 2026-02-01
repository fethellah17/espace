import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, TrendingUp, Star, DollarSign } from "lucide-react";

const ProductsList = () => {
  const { products, loading } = useProducts();
  const [stats, setStats] = useState({
    total: 0,
    newProducts: 0,
    categories: 0,
    avgPrice: 0
  });

  useEffect(() => {
    if (products.length > 0) {
      const newCount = products.filter(p => p.isNew).length;
      const uniqueCategories = new Set(products.map(p => p.category)).size;
      const avgPrice = Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length);
      
      setStats({
        total: products.length,
        newProducts: newCount,
        categories: uniqueCategories,
        avgPrice
      });
    }
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-deep mx-auto mb-4"></div>
          <p className="text-xl font-serif text-pink-deep">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-pink-deep mb-4 tracking-tight">
            Vue d'Ensemble des Produits
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            Statistiques et liste complète de vos produits
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-pink-blush">
                <Package className="text-pink-deep" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-light">Total Produits</p>
                <p className="text-3xl font-serif font-light text-pink-deep">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <Star className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-light">Nouveaux</p>
                <p className="text-3xl font-serif font-light text-pink-deep">{stats.newProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-light">Catégories</p>
                <p className="text-3xl font-serif font-light text-pink-deep">{stats.categories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <DollarSign className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-light">Prix Moyen</p>
                <p className="text-3xl font-serif font-light text-pink-deep">{stats.avgPrice} DA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="p-6 border-b border-pink-soft/30">
            <h2 className="text-2xl font-serif font-light text-pink-deep">Tous les Produits</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-pink-blush/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-pink-deep">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-pink-deep">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-pink-deep">Catégorie</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-pink-deep">Prix</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-pink-deep">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-soft/20">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-pink-blush/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-pink-blush">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-pink-deep">{product.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-pink-blush text-pink-deep text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-serif text-pink-deep">{product.price} DA</p>
                    </td>
                    <td className="px-6 py-4">
                      {product.isNew ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          Nouveau
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                          Standard
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="p-12 text-center">
              <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground text-lg font-light mb-2">
                Aucun produit trouvé
              </p>
              <p className="text-sm text-muted-foreground">
                Ajoutez des produits depuis le panneau d'administration
              </p>
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        {products.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-soft p-8">
            <h2 className="text-2xl font-serif font-light text-pink-deep mb-6">
              Répartition par Catégorie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from(new Set(products.map(p => p.category))).map(category => {
                const count = products.filter(p => p.category === category).length;
                const percentage = Math.round((count / products.length) * 100);
                
                return (
                  <div key={category} className="p-4 rounded-xl border border-pink-soft/30 hover:bg-pink-blush/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-pink-deep">{category}</p>
                      <p className="text-sm text-muted-foreground">{count} produits</p>
                    </div>
                    <div className="w-full bg-pink-soft/30 rounded-full h-2">
                      <div 
                        className="bg-pink-deep h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{percentage}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsList;
