import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FilterSidebar, FilterState } from "@/components/FilterSidebar";
import { useProducts } from "@/hooks/useProducts";
import { useAppContext } from "@/context/AppContext";

type SortOption = "name" | "price-low" | "price-high" | "newest";

const Products = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useAppContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [1000, 50000],
    notes: [],
  });

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    // Filter by price range
    result = result.filter(
      (p) => {
        const finalPrice = p.discount && p.discount > 0 
          ? Math.round(p.price * (1 - p.discount / 100))
          : p.price;
        return finalPrice >= filters.priceRange[0] && finalPrice <= filters.priceRange[1];
      }
    );

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    const sorted = [...result];
    switch (sortBy) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        sorted.sort((a, b) => {
          const priceA = a.discount ? Math.round(a.price * (1 - a.discount / 100)) : a.price;
          const priceB = b.discount ? Math.round(b.price * (1 - b.discount / 100)) : b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        sorted.sort((a, b) => {
          const priceA = a.discount ? Math.round(a.price * (1 - a.discount / 100)) : a.price;
          const priceB = b.discount ? Math.round(b.price * (1 - b.discount / 100)) : b.price;
          return priceB - priceA;
        });
        break;
      case "newest":
      default:
        // Keep original order (already sorted by created_at DESC in hook)
        break;
    }

    return sorted;
  }, [products, filters, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-pink-deep mb-4 tracking-tight">
            Notre Collection
          </h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
            Découvrez notre sélection soignée de fragrances premium, chacune conçue avec élégance et sophistication
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-2xl font-serif text-pink-deep">Chargement des produits...</p>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-12">
              <input
                type="text"
                placeholder="Rechercher des fragrances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-pink-soft/40 px-6 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 rounded-lg transition-all duration-300 shadow-soft"
              />
            </div>

        {/* Main Layout with Sidebar */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-72">
            <FilterSidebar
              onFilterChange={setFilters}
              productCount={filteredAndSortedProducts.length}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort */}
            <div className="mb-8 flex items-center justify-between pb-6 border-b border-pink-soft/30">
              <div className="text-sm text-muted-foreground font-light">
                Affichage de <span className="text-pink-deep font-medium">{filteredAndSortedProducts.length}</span> fragrance{filteredAndSortedProducts.length !== 1 ? "s" : ""}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-pink-soft/40 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-deep/30 rounded-lg transition-all duration-300"
              >
                <option value="newest">Plus Récent</option>
                <option value="name">Nom (A-Z)</option>
                <option value="price-low">Prix (Bas à Élevé)</option>
                <option value="price-high">Prix (Élevé à Bas)</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product) => {
                  const hasDiscount = product.discount && product.discount > 0;
                  const finalPrice = hasDiscount 
                    ? Math.round(product.price * (1 - product.discount! / 100))
                    : product.price;

                  return (
                    <div key={product.id} className="group">
                      <div 
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="cursor-pointer"
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500">
                          {/* Image Container */}
                          <div className="relative h-64 md:h-72 overflow-hidden bg-pink-blush">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-pink-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Badges */}
                            {product.isNew && (
                              <div className="absolute top-4 left-4 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase bg-pink-deep/90 text-cream">
                                Nouveau
                              </div>
                            )}
                            {hasDiscount && (
                              <div className="absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase bg-white/90 text-pink-deep">
                                -{product.discount}%
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-lg font-serif font-light text-pink-deep mb-2 group-hover:text-pink-medium transition-colors duration-300">
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground font-light line-clamp-2 mb-4">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {hasDiscount && (
                                  <span className="text-sm text-muted-foreground line-through font-light">
                                    {product.price} DA
                                  </span>
                                )}
                                <p className="text-xl font-serif text-pink-deep font-light">
                                  {finalPrice} <span className="text-sm">DA</span>
                                </p>
                              </div>
                              <span className="text-xs font-medium text-pink-deep uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Voir →
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="mt-4 w-full py-3 border border-pink-deep/30 text-pink-deep text-xs font-medium uppercase tracking-widest rounded-lg hover:bg-pink-deep hover:text-cream hover:border-pink-deep transition-all duration-300"
                      >
                        Ajouter au Panier
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-16 text-center shadow-soft">
                <p className="text-muted-foreground text-lg font-light mb-6">
                  {products.length === 0 
                    ? "Aucun produit disponible. Ajoutez des produits dans le panneau d'administration."
                    : "Aucune fragrance trouvée correspondant à vos filtres."}
                </p>
                {products.length > 0 && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({
                        priceRange: [1000, 50000],
                        notes: [],
                      });
                    }}
                    className="px-8 py-3 bg-pink-deep text-cream rounded-full font-medium text-sm hover:bg-pink-medium transition-all duration-300"
                  >
                    Effacer les Filtres
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </>
    )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
