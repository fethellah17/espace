import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useAppContext();

  // Show only NEW products on homepage
  const displayProducts = products.filter(p => p.isNew);

  if (loading) {
    return (
      <section className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-serif font-light text-pink-deep">Chargement des produits...</h2>
          </div>
        </div>
      </section>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <section className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-serif font-light text-pink-deep mb-4">Aucun nouveau produit</h2>
            <p className="text-muted-foreground">Marquez vos produits comme "Nouveau" dans le panneau d'administration pour les voir ici.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-rose-gold text-xs font-medium tracking-widest uppercase block mb-4">
            Nouveautés
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-pink-deep mb-6 tracking-tight">
            Nos Nouveaux Parfums
          </h2>
          <div className="h-px w-16 bg-pink-deep/20 mx-auto mb-6" />
          <p className="text-muted-foreground font-light text-lg">
            Découvrez nos dernières fragrances, soigneusement sélectionnées pour leur qualité exceptionnelle et leur élégance unique.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {displayProducts.map((product) => {
            const hasDiscount = product.discount && product.discount > 0;
            const finalPrice = hasDiscount 
              ? Math.round(product.price * (1 - product.discount! / 100))
              : product.price;

            return (
              <div key={product.id} className="group">
                <div className="relative bg-pink-blush rounded-2xl overflow-hidden aspect-[4/5] mb-6 shadow-soft hover:shadow-elevated transition-all duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
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

                {/* Product Info */}
                <div className="text-center">
                  <h3 className="text-lg font-serif font-light text-pink-deep mb-1 group-hover:text-pink-medium transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 font-light">
                    {product.category}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-center gap-3">
                    {hasDiscount && (
                      <span className="text-muted-foreground line-through text-sm font-light">
                        {product.price} DA
                      </span>
                    )}
                    <span className="text-xl font-serif text-pink-deep font-light">
                      {finalPrice} DA
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-pink-deep transition-all duration-300 group"
          >
            Voir la Collection Complète
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
