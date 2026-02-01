import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const Favorites = () => {
  const { favorites, removeFromFavorites, addToCart } = useAppContext();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center">
          <div className="mb-8 p-6 bg-pink-blush rounded-full w-fit mx-auto">
            <Heart size={48} className="text-pink-deep" strokeWidth={1.5} />
          </div>
          <h1 className="mb-4 text-5xl font-serif font-light text-pink-deep">Vos favoris sont vides</h1>
          <p className="mb-8 text-muted-foreground font-light text-lg">
            Explorez notre collection et ajoutez vos fragrances préférées à vos favoris.
          </p>
          <Link
            to="/products"
            className="inline-block rounded-full bg-pink-deep text-cream px-10 py-4 font-medium text-sm hover:bg-pink-medium transition-all duration-300"
          >
            Découvrir les Produits
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-pink-deep mb-4 tracking-tight">
            Mes Favoris
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            {favorites.length} fragrance{favorites.length !== 1 ? "s" : ""} dans vos favoris
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-pink-blush rounded-2xl overflow-hidden aspect-[4/5] mb-6 shadow-soft hover:shadow-elevated transition-all duration-500">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                {/* Remove from Favorites Button */}
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full text-pink-deep hover:bg-pink-deep hover:text-cream transition-all duration-300 shadow-soft"
                >
                  <Heart size={18} strokeWidth={1.5} className="fill-current" />
                </button>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-serif font-light text-pink-deep mb-1 group-hover:text-pink-medium transition-colors duration-300">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mb-4 font-light">
                  {product.category}
                </p>
                
                {/* Price & Actions */}
                <div className="flex flex-col gap-3">
                  <span className="text-xl font-serif text-pink-deep font-light">
                    {product.price} DA
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full px-6 py-3 bg-pink-deep text-cream rounded-lg font-medium text-sm hover:bg-pink-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} strokeWidth={1.5} />
                    Ajouter au Panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
