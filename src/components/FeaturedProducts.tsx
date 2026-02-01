import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useAppContext } from "@/context/AppContext";

const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useAppContext();

  // Get only featured products (new or with discount)
  const featuredProducts = products.filter((p) => p.isNew || p.discount > 0).slice(0, 3);

  if (loading) {
    return (
      <section className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-light text-pink-deep mb-6 tracking-tight">
              Chargement...
            </h2>
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
            Essence d'Arabie
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-pink-deep mb-6 tracking-tight">
            Parfums Signature
          </h2>
          <div className="h-px w-16 bg-pink-deep/20 mx-auto mb-6" />
          <p className="text-muted-foreground font-light text-lg">
            Découvrez notre collection exclusive d'huiles d'Oud pures et de mélanges premium.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {featuredProducts.map((product) => {
            const badge = product.isNew ? "Nouveauté" : product.discount > 0 ? "Promo" : null;
            const badgeStyle = product.isNew ? "dark" : "light";
            const originalPrice = product.discount > 0 ? product.price : null;
            const finalPrice = product.discount > 0 
              ? Math.round(product.price * (1 - product.discount / 100))
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
                  
                  {badge && (
                    <div
                      className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase transition-all duration-300 ${
                        badgeStyle === "dark"
                          ? "bg-pink-deep/90 text-cream"
                          : "bg-white/90 text-pink-deep"
                      }`}
                    >
                      {badge}
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
                    {originalPrice && (
                      <span className="text-muted-foreground line-through text-sm font-light">
                        {originalPrice} DA
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

export default FeaturedProducts;
