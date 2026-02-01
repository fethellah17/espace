import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } = useAppContext();

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 50 ? 0 : 10;
  const total = cartTotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center">
          <div className="mb-8 p-6 bg-pink-blush rounded-full w-fit mx-auto">
            <ShoppingBag size={48} className="text-pink-deep" strokeWidth={1.5} />
          </div>
          <h1 className="mb-4 text-5xl font-serif font-light text-pink-deep">Votre panier est vide</h1>
          <p className="mb-8 text-muted-foreground font-light text-lg">
            Explorez notre collection de fragrances premium et trouvez votre parfum signature.
          </p>
          <Link
            to="/products"
            className="inline-block rounded-full bg-pink-deep text-cream px-10 py-4 font-medium text-sm hover:bg-pink-medium transition-all duration-300"
          >
            Continuer vos Achats
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
        <h1 className="mb-12 text-5xl md:text-6xl font-serif font-light text-pink-deep tracking-tight">Panier d'Achat</h1>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 rounded-2xl bg-white p-6 shadow-soft hover:shadow-elevated transition-all duration-300">
                  <div className="h-28 w-28 rounded-xl bg-pink-blush shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-serif font-light text-pink-deep text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground font-light mb-4">{item.price} DA</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="rounded-lg border border-pink-soft/40 px-3 py-2 hover:bg-pink-blush transition-colors duration-300 text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="rounded-lg border border-pink-soft/40 px-3 py-2 hover:bg-pink-blush transition-colors duration-300 text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-serif font-light text-pink-deep text-lg mb-4">{(item.price * item.quantity)} DA</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-pink-deep transition-colors duration-300 p-2"
                    >
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl bg-white p-8 shadow-soft h-fit sticky top-28">
            <h2 className="mb-8 text-2xl font-serif font-light text-pink-deep">Résumé de la Commande</h2>
            <div className="space-y-4 border-b border-pink-soft/30 pb-6">
              <div className="flex justify-between text-muted-foreground font-light">
                <span>Sous-total</span>
                <span>{cartTotal} DA</span>
              </div>
              <div className="flex justify-between text-muted-foreground font-light">
                <span>Livraison</span>
                <span>{shipping === 0 ? "Gratuit" : `${shipping} DA`}</span>
              </div>
              <div className="flex justify-between text-muted-foreground font-light">
                <span>Taxe</span>
                <span>{tax.toFixed(2)} DA</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between font-serif font-light text-pink-deep text-lg mb-8">
              <span>Total</span>
              <span>{total.toFixed(2)} DA</span>
            </div>
            <button className="w-full rounded-lg bg-pink-deep text-cream px-6 py-4 font-medium text-sm hover:bg-pink-medium transition-all duration-300 mb-3">
              <Link to="/checkout" className="block">
                Passer à la Caisse
              </Link>
            </button>
            <button
              onClick={clearCart}
              className="w-full rounded-lg border border-pink-soft/40 text-pink-deep px-6 py-4 font-medium text-sm hover:bg-pink-blush transition-all duration-300"
            >
              Vider le Panier
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
