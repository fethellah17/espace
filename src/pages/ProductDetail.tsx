import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft, Heart, Share2, Facebook, Twitter, ChevronLeft, ChevronRight, ZoomIn, Package, Truck, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { useAppContext } from "@/context/AppContext";
import { DecantSelector } from "@/components/DecantSelector";

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface FragranceNote {
  type: "top" | "heart" | "base";
  notes: string[];
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products: allProducts, loading } = useProducts();
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [decantMl, setDecantMl] = useState(10);
  const [selectedDecant, setSelectedDecant] = useState<{ ml: number; price: number } | null>(null);
  const [purchaseType, setPurchaseType] = useState<"full" | "decant">("full");
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "notes">("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: "", rating: 5, text: "" });

  const productId = id ?? "";
  const numericProductId = Number(productId);

  // Combine all available products (static + fetched) and de-duplicate by id
  const allAvailableProducts = [...PRODUCTS, ...allProducts].filter(
    (p, index, self) => index === self.findIndex((t) => String(t.id) === String(p.id))
  );

  // Robust lookup: handle numeric and string ids
  const product = allAvailableProducts.find((p) => {
    if (String(p.id) === String(productId)) return true;
    if (!Number.isNaN(numericProductId) && Number(p.id) === numericProductId) return true;
    return false;
  });

  const isWishlisted = product ? isFavorite(product.id) : false;
  
  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Single image (one picture only)
  const productImages = product ? [product.image] : [];

  // Fragrance notes data
  const fragranceNotes: FragranceNote[] = [
    { type: "top", notes: ["Bergamote", "Citron", "Lavande"] },
    { type: "heart", notes: ["Rose", "Jasmin", "Géranium"] },
    { type: "base", notes: ["Bois de santal", "Musc", "Ambre"] }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      text: "Absolutely love this fragrance! Long-lasting and smells amazing.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      author: "Ahmed K.",
      rating: 4,
      text: "Great quality, very satisfied with my purchase.",
      date: "1 month ago",
    },
    {
      id: 3,
      author: "Fatima B.",
      rating: 5,
      text: "Perfect! Exactly as described. Will definitely order again.",
      date: "1 month ago",
    },
  ];

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  // Don't show "not found" while still loading
  if (loading && !product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Header />
        <div className="text-center pt-32">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-deep mx-auto mb-4"></div>
          <p className="text-xl font-serif text-pink-deep">Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center">
          <h1 className="mb-4 text-5xl font-serif font-light text-pink-deep">Produit non trouvé</h1>
          <button
            onClick={() => navigate("/products")}
            className="rounded-full bg-pink-deep text-cream px-8 py-3 font-medium text-sm hover:bg-pink-medium transition-all duration-300"
          >
            Retour aux Produits
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const pricePerTenMl = product.price; // Price per 10ml for decants
  const fullBottlePrice = product.falconPrice || product.price; // Full bottle price, fallback to price if not set

  const handleAddToCart = () => {
    if (purchaseType === "full") {
      addToCart({ ...product, price: fullBottlePrice }, quantity);
      setQuantity(1);
    } else if (purchaseType === "decant") {
      const totalDecantPrice = (decantMl / 10) * pricePerTenMl;
      addToCart(
        { ...product, price: totalDecantPrice },
        1,
        `${decantMl}ml Decant`
      );
    }
  };

  const relatedProducts = allAvailableProducts
    .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
    .slice(0, 4);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out ${product.name}!`;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setShowShareMenu(false);
        break;
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would submit to backend
    reviews.push({
      id: reviews.length + 1,
      author: newReview.author,
      rating: newReview.rating,
      text: newReview.text,
      date: "Just now"
    });
    setNewReview({ author: "", rating: 5, text: "" });
    setShowReviewForm(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate("/")} className="hover:text-pink-deep transition-colors">Accueil</button>
          <span>/</span>
          <button onClick={() => navigate("/products")} className="hover:text-pink-deep transition-colors">Produits</button>
          <span>/</span>
          <span className="text-pink-deep">{product.name}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate("/products")}
          className="mb-12 flex items-center gap-2 font-medium text-muted-foreground hover:text-pink-deep transition-colors duration-300"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          Retour aux Produits
        </button>

        {/* Product Section */}
        <div className="grid gap-12 lg:grid-cols-2 mb-20">
          {/* Product Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image with Navigation */}
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl bg-pink-blush shadow-soft group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300"
              />
              
              {/* Image Navigation */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft size={20} className="text-pink-deep" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight size={20} className="text-pink-deep" />
                  </button>

                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                    {selectedImage + 1} / {productImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-3">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-24 w-24 rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImage === i
                        ? "ring-2 ring-pink-deep shadow-md"
                        : "hover:shadow-soft opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              {product.isNew && (
                <span className="inline-block mb-3 px-4 py-1 rounded-full bg-rose-gold/20 text-rose-gold text-sm font-medium">
                  Nouveau
                </span>
              )}
              <h1 className="mb-3 text-5xl font-serif font-light text-pink-deep tracking-tight">{product.name}</h1>
              <p className="text-muted-foreground font-light text-lg">{product.category}</p>
            </div>

            {/* Rating */}
            <div className="mb-6 flex items-center gap-4 pb-6 border-b border-pink-soft/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.round(Number(averageRating)) ? "fill-rose-gold text-rose-gold" : "text-pink-soft"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="font-serif font-light text-pink-deep text-lg">{averageRating}</span>
              </div>
              <p className="text-sm text-muted-foreground font-light">({reviews.length} avis)</p>
            </div>

            {/* Stock Status & Trust Indicators */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                <Package size={20} className="text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">En Stock</p>
                  <p className="text-xs text-green-600">Disponible</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
                <Truck size={20} className="text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Livraison</p>
                  <p className="text-xs text-blue-600">2-5 jours</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 border border-purple-200">
                <Shield size={20} className="text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-800">100% Original</p>
                  <p className="text-xs text-purple-600">Garanti</p>
                </div>
              </div>
            </div>

            {/* Purchase Type Selector */}
            <div className="mb-6">
              <label className="mb-4 block text-sm font-medium text-pink-deep">Sélectionnez le Type d'Achat</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="purchaseType"
                    value="full"
                    checked={purchaseType === "full"}
                    onChange={() => setPurchaseType("full")}
                    className="w-4 h-4 accent-pink-deep"
                  />
                  <span className="text-sm font-medium text-muted-foreground">Flacon Complet</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="purchaseType"
                    value="decant"
                    checked={purchaseType === "decant"}
                    onChange={() => setPurchaseType("decant")}
                    className="w-4 h-4 accent-pink-deep"
                  />
                  <span className="text-sm font-medium text-muted-foreground">Décantations (10ml+)</span>
                </label>
              </div>
            </div>

            {/* Full Bottle Section */}
            {purchaseType === "full" && (
              <div className="mb-8 space-y-6 rounded-2xl bg-white p-8 shadow-soft border-2 border-pink-deep/10">
                <div>
                  <p className="mb-2 text-sm text-muted-foreground font-light">Prix</p>
                  <p className="text-4xl font-serif font-light text-pink-deep">{fullBottlePrice.toLocaleString()} DA</p>
                </div>

                <div>
                  <label className="mb-4 block text-sm font-medium text-pink-deep">Quantité</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-lg border border-pink-soft/40 px-4 py-3 hover:bg-pink-blush transition-colors duration-300 text-sm font-medium"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 rounded-lg border border-pink-soft/40 bg-white px-4 py-3 text-center font-medium focus:outline-none focus:ring-2 focus:ring-pink-deep/30"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-lg border border-pink-soft/40 px-4 py-3 hover:bg-pink-blush transition-colors duration-300 text-sm font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-lg bg-pink-deep text-cream px-6 py-4 font-medium text-sm hover:bg-pink-medium transition-all duration-300"
                >
                  Ajouter {quantity} Flacon{quantity > 1 ? "s" : ""} au Panier
                </button>
              </div>
            )}

            {/* Decant Section */}
            {purchaseType === "decant" && (
              <div className="mb-8 space-y-6 rounded-2xl bg-white p-8 shadow-soft border-2 border-pink-deep/10">
                {/* Info note */}
                <p className="text-sm text-muted-foreground font-light italic">
                  ✓ Parfum 100% original – décanté du flacon original
                </p>

                {/* Price per 10ml */}
                <div className="pb-4 border-b border-pink-soft/30">
                  <p className="mb-1 text-sm text-muted-foreground font-light">Prix / 10ml</p>
                  <p className="text-2xl font-serif font-light text-pink-deep">{pricePerTenMl.toLocaleString()} DA</p>
                </div>

                {/* ML Selection */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-pink-deep">Choisissez la quantité (ml)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 30, 50, 75, 100].map((ml) => (
                      <button
                        key={ml}
                        onClick={() => setDecantMl(ml)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                          decantMl === ml
                            ? "bg-pink-deep text-cream shadow-md"
                            : "border border-pink-soft/40 hover:bg-pink-blush"
                        }`}
                      >
                        {ml}ml
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom input */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-pink-deep">Ou entrez une quantité personnalisée</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={decantMl}
                      onChange={(e) => {
                        let value = parseInt(e.target.value) || 10;
                        if (value < 10) value = 10;
                        value = Math.round(value / 10) * 10;
                        setDecantMl(value);
                      }}
                      min="10"
                      step="10"
                      className="w-24 rounded-lg border border-pink-soft/40 bg-white px-4 py-3 text-center font-medium focus:outline-none focus:ring-2 focus:ring-pink-deep/30"
                    />
                    <span className="text-sm text-muted-foreground">ml (minimum 10ml, par 10ml)</span>
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="rounded-lg bg-pink-blush/50 p-4 border border-pink-deep/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pink-deep">Total pour {decantMl}ml</span>
                    <span className="text-2xl font-serif font-light text-pink-deep">
                      {((decantMl / 10) * pricePerTenMl).toLocaleString()} DA
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-lg bg-pink-deep text-cream px-6 py-4 font-medium text-sm hover:bg-pink-medium transition-all duration-300"
                >
                  Ajouter {decantMl}ml au Panier
                </button>
              </div>
            )}

            {/* Wishlist & Share */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (product) {
                    if (isWishlisted) {
                      removeFromFavorites(product.id);
                    } else {
                      addToFavorites(product);
                    }
                  }
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isWishlisted
                    ? "bg-pink-blush text-pink-deep"
                    : "border border-pink-soft/40 text-muted-foreground hover:bg-pink-blush hover:text-pink-deep"
                }`}
              >
                <Heart size={18} strokeWidth={1.5} className={isWishlisted ? "fill-current" : ""} />
                {isWishlisted ? "En Favoris" : "Favoris"}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="px-6 py-3 rounded-lg border border-pink-soft/40 text-muted-foreground hover:bg-pink-blush hover:text-pink-deep transition-all duration-300"
                >
                  <Share2 size={18} strokeWidth={1.5} />
                </button>
                
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-elevated border border-pink-soft/20 overflow-hidden z-10">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-pink-blush transition-colors text-left"
                    >
                      <Facebook size={16} className="text-blue-600" />
                      <span className="text-sm">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-pink-blush transition-colors text-left"
                    >
                      <Twitter size={16} className="text-blue-400" />
                      <span className="text-sm">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-pink-blush transition-colors text-left"
                    >
                      <Share2 size={16} className="text-pink-deep" />
                      <span className="text-sm">Copier le lien</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-pink-soft/30 pt-12">
          <div className="mb-8 flex gap-8 border-b border-pink-soft/30">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 font-medium transition-colors duration-300 ${
                activeTab === "description"
                  ? "border-b-2 border-pink-deep text-pink-deep"
                  : "text-muted-foreground hover:text-pink-deep"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`pb-4 font-medium transition-colors duration-300 ${
                activeTab === "notes"
                  ? "border-b-2 border-pink-deep text-pink-deep"
                  : "text-muted-foreground hover:text-pink-deep"
              }`}
            >
              Notes Olfactives
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 font-medium transition-colors duration-300 ${
                activeTab === "reviews"
                  ? "border-b-2 border-pink-deep text-pink-deep"
                  : "text-muted-foreground hover:text-pink-deep"
              }`}
            >
              Avis ({reviews.length})
            </button>
          </div>

          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="space-y-12">
              <div>
                <h3 className="mb-4 text-2xl font-serif font-light text-pink-deep">Description du Produit</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{product.description}</p>
                <p className="mt-4 text-muted-foreground font-light leading-relaxed">
                  Ce parfum exquis incarne l'élégance et la sophistication. Créé pour ceux qui apprécient les fragrances de qualité, 
                  il offre une expérience olfactive unique qui perdure tout au long de la journée. Chaque note a été soigneusement 
                  sélectionnée pour créer une harmonie parfaite entre fraîcheur et profondeur.
                </p>
              </div>

              <div>
                <h3 className="mb-6 text-2xl font-serif font-light text-pink-deep">Spécifications</h3>
                <div className="space-y-4">
                  {[
                    { label: "Type", value: "Eau de Parfum" },
                    { label: "Concentration", value: "15-20%" },
                    { label: "Longévité", value: "8-12 heures" },
                    { label: "Sillage", value: "Modéré à Fort" },
                    { label: "Saison", value: "Toutes saisons" },
                    { label: "Occasion", value: "Jour & Soir" },
                  ].map((spec, index) => (
                    <div key={index} className="flex justify-between pb-4 border-b border-pink-soft/30 last:border-b-0">
                      <span className="text-muted-foreground font-light">{spec.label}</span>
                      <span className="font-medium text-pink-deep">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-pink-blush/50 p-8 border border-pink-soft/30">
                <h3 className="mb-4 text-xl font-serif font-light text-pink-deep">Conseils d'Application</h3>
                <ul className="space-y-3 text-muted-foreground font-light">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-gold mt-1">•</span>
                    <span>Appliquez sur les points de pulsation (poignets, cou, derrière les oreilles)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-gold mt-1">•</span>
                    <span>Ne frottez pas vos poignets ensemble après l'application</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-gold mt-1">•</span>
                    <span>Conservez à l'abri de la lumière directe et de la chaleur</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-gold mt-1">•</span>
                    <span>Hydratez votre peau avant l'application pour une meilleure tenue</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Fragrance Notes Tab */}
          {activeTab === "notes" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-serif font-light text-pink-deep mb-4">Pyramide Olfactive</h3>
                <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                  Découvrez la composition harmonieuse de ce parfum, révélant ses notes au fil du temps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Top Notes */}
                <div className="text-center">
                  <div className="mb-6 mx-auto w-32 h-32 rounded-full bg-gradient-to-b from-pink-blush to-pink-soft/30 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white shadow-soft flex items-center justify-center">
                      <span className="text-3xl">🌸</span>
                    </div>
                  </div>
                  <h4 className="mb-4 text-xl font-serif font-light text-pink-deep">Notes de Tête</h4>
                  <p className="text-sm text-muted-foreground font-light mb-4">Les premières impressions, légères et fraîches</p>
                  <div className="space-y-2">
                    {fragranceNotes[0].notes.map((note, idx) => (
                      <div key={idx} className="px-4 py-2 rounded-lg bg-pink-blush/50 text-sm text-pink-deep">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Heart Notes */}
                <div className="text-center">
                  <div className="mb-6 mx-auto w-32 h-32 rounded-full bg-gradient-to-b from-pink-soft/50 to-rose-gold/30 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white shadow-soft flex items-center justify-center">
                      <span className="text-3xl">🌹</span>
                    </div>
                  </div>
                  <h4 className="mb-4 text-xl font-serif font-light text-pink-deep">Notes de Cœur</h4>
                  <p className="text-sm text-muted-foreground font-light mb-4">Le cœur du parfum, riche et captivant</p>
                  <div className="space-y-2">
                    {fragranceNotes[1].notes.map((note, idx) => (
                      <div key={idx} className="px-4 py-2 rounded-lg bg-rose-gold/20 text-sm text-pink-deep">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Base Notes */}
                <div className="text-center">
                  <div className="mb-6 mx-auto w-32 h-32 rounded-full bg-gradient-to-b from-rose-gold/40 to-pink-deep/20 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white shadow-soft flex items-center justify-center">
                      <span className="text-3xl">🌰</span>
                    </div>
                  </div>
                  <h4 className="mb-4 text-xl font-serif font-light text-pink-deep">Notes de Fond</h4>
                  <p className="text-sm text-muted-foreground font-light mb-4">La signature durable et profonde</p>
                  <div className="space-y-2">
                    {fragranceNotes[2].notes.map((note, idx) => (
                      <div key={idx} className="px-4 py-2 rounded-lg bg-pink-deep/10 text-sm text-pink-deep">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-2xl bg-white p-8 shadow-soft">
                <h4 className="mb-4 text-xl font-serif font-light text-pink-deep">Évolution du Parfum</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 text-sm text-muted-foreground">0-15 min</div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-pink-blush mb-2"></div>
                      <p className="text-sm text-muted-foreground font-light">Les notes de tête se révèlent, apportant fraîcheur et vivacité</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 text-sm text-muted-foreground">15 min-4h</div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-rose-gold/40 mb-2"></div>
                      <p className="text-sm text-muted-foreground font-light">Les notes de cœur s'épanouissent, définissant le caractère du parfum</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 text-sm text-muted-foreground">4-12h</div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-pink-deep/30 mb-2"></div>
                      <p className="text-sm text-muted-foreground font-light">Les notes de fond persistent, créant une impression durable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div className="rounded-2xl bg-white p-8 shadow-soft">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-5xl font-serif font-light text-pink-deep">{averageRating}</div>
                      <div className="flex gap-1 text-rose-gold mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} className="fill-current" strokeWidth={1.5} />
                        ))}
                      </div>
                    </div>
                    <div className="text-muted-foreground font-light">
                      Basé sur {reviews.length} avis clients
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-6 py-3 rounded-lg bg-pink-deep text-cream hover:bg-pink-medium transition-colors font-medium text-sm"
                  >
                    Écrire un Avis
                  </button>
                </div>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="rounded-2xl bg-white p-8 shadow-soft">
                  <h4 className="mb-6 text-xl font-serif font-light text-pink-deep">Partagez votre expérience</h4>
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-pink-deep">Votre nom</label>
                      <input
                        type="text"
                        value={newReview.author}
                        onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-pink-soft/40 focus:outline-none focus:ring-2 focus:ring-pink-deep/30"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium text-pink-deep">Note</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating})}
                            className="p-2 hover:scale-110 transition-transform"
                          >
                            <Star
                              size={24}
                              className={rating <= newReview.rating ? "fill-rose-gold text-rose-gold" : "text-pink-soft"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-pink-deep">Votre avis</label>
                      <textarea
                        value={newReview.text}
                        onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-pink-soft/40 focus:outline-none focus:ring-2 focus:ring-pink-deep/30"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 rounded-lg bg-pink-deep text-cream hover:bg-pink-medium transition-colors font-medium text-sm"
                      >
                        Publier l'Avis
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-6 py-3 rounded-lg border border-pink-soft/40 text-muted-foreground hover:bg-pink-blush transition-colors font-medium text-sm"
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-xl bg-white p-6 shadow-soft hover:shadow-elevated transition-shadow">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="font-serif font-light text-pink-deep">{review.author}</div>
                      <div className="flex gap-1 text-rose-gold">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-current" strokeWidth={1.5} />
                        ))}
                      </div>
                    </div>
                    <p className="mb-3 text-muted-foreground font-light leading-relaxed">{review.text}</p>
                    <p className="text-xs text-muted-foreground font-light">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-4xl font-serif font-light text-pink-deep tracking-tight">Produits Similaires</h2>
              <button
                onClick={() => navigate("/products")}
                className="text-sm font-medium text-pink-deep hover:text-pink-medium transition-colors flex items-center gap-2"
              >
                Voir Tout
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relProduct) => (
                <div
                  key={relProduct.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    navigate(`/products/${relProduct.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="rounded-2xl bg-white overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300">
                    <div className="relative h-64 bg-pink-blush overflow-hidden">
                      {relProduct.isNew && (
                        <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-rose-gold text-white text-xs font-medium">
                          Nouveau
                        </span>
                      )}
                      <img
                        src={relProduct.image}
                        alt={relProduct.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <p className="mb-2 text-xs text-muted-foreground font-light">{relProduct.category}</p>
                      <h3 className="mb-3 font-serif font-light text-pink-deep line-clamp-2 text-lg">{relProduct.name}</h3>
                      <div className="mb-4 flex items-center justify-between">
                        <p className="font-serif font-light text-pink-deep text-xl">{relProduct.price} DA</p>
                        {relProduct.discount && (
                          <span className="text-xs text-rose-gold font-medium">-{relProduct.discount}%</span>
                        )}
                      </div>
                      <button className="w-full rounded-lg border border-pink-soft/40 text-pink-deep px-4 py-3 text-sm font-medium hover:bg-pink-blush transition-all duration-300">
                        Voir Détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
