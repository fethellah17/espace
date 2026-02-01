import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Truck, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { algeriaDivisions } from "@/data/algeriaDivisions";
import { supabase } from "@/lib/supabase";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    municipality: "",
    deliveryMethod: "home",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedState = algeriaDivisions.find((s) => s.id === formData.state);
  const baseShipping = selectedState?.deliveryPrice || 0;
  const homeDeliverySurcharge = formData.deliveryMethod === "home" ? 200 : 0;
  const shipping = baseShipping + homeDeliverySurcharge;
  const total = cartTotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Generate unique order ID
      const orderId = `CMD-${Date.now().toString().slice(-8)}`;

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_id: orderId,
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone,
          wilaya: selectedState?.name || "",
          commune: formData.municipality,
          delivery_method: formData.deliveryMethod,
          shipping_cost: shipping,
          total_amount: total,
          statut: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear the cart
      clearCart();

      // Show success message
      alert(`Commande ${orderId} passée avec succès! Vous recevrez une confirmation par email.`);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Une erreur s'est produite lors de la création de votre commande. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center">
          <h1 className="mb-4 text-5xl font-serif font-light text-pink-deep">Votre panier est vide</h1>
          <p className="mb-8 text-muted-foreground font-light text-lg">
            Ajoutez des fragrances à votre panier avant de passer à la caisse.
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
        {/* Back Button */}
        <Link
          to="/cart"
          className="mb-12 flex items-center gap-2 font-medium text-muted-foreground hover:text-pink-deep transition-colors duration-300"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          Retour au Panier
        </Link>

        {/* Page Title */}
        <h1 className="mb-12 text-5xl md:text-6xl font-serif font-light text-pink-deep tracking-tight">
          Paiement
        </h1>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="rounded-2xl bg-white p-8 shadow-soft">
                <h2 className="mb-6 text-2xl font-serif font-light text-pink-deep">Informations de Livraison</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                      placeholder="john@exemple.com"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Wilaya</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                    >
                      <option value="">Sélectionner Wilaya</option>
                      {algeriaDivisions.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name} ({state.deliveryPrice} DA)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Commune</label>
                    <select
                      name="municipality"
                      value={formData.municipality}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.state}
                      className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Sélectionner Commune</option>
                      {selectedState?.municipalities.map((municipality) => (
                        <option key={municipality} value={municipality}>
                          {municipality}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Coût de Livraison</label>
                    <div className="w-full rounded-lg border border-pink-soft/40 bg-pink-blush px-5 py-3 text-foreground font-light">
                      {shipping > 0 ? `${shipping} DA` : "Sélectionner wilaya"}
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="mt-6">
                  <label className="mb-3 block text-sm font-medium text-pink-deep">Mode de Livraison</label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className={`flex items-start gap-3 cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 ${
                      formData.deliveryMethod === "home"
                        ? "border-pink-deep bg-pink-blush"
                        : "border-pink-soft/40 bg-white hover:border-pink-soft"
                    }`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="home"
                        checked={formData.deliveryMethod === "home"}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-pink-deep border-pink-soft/40 focus:ring-pink-deep/30"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-pink-deep">Livraison à Domicile</p>
                        <p className="text-sm text-muted-foreground mt-1">Livraison directe à votre porte (+200 DA)</p>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 ${
                      formData.deliveryMethod === "office"
                        ? "border-pink-deep bg-pink-blush"
                        : "border-pink-soft/40 bg-white hover:border-pink-soft"
                    }`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="office"
                        checked={formData.deliveryMethod === "office"}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-pink-deep border-pink-soft/40 focus:ring-pink-deep/30"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-pink-deep">Livraison au Bureau</p>
                        <p className="text-sm text-muted-foreground mt-1">Retrait au bureau de poste</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-2xl bg-white p-8 shadow-soft">
                <h2 className="mb-6 text-2xl font-serif font-light text-pink-deep">Méthode de Paiement</h2>
                <div className="rounded-lg border border-pink-soft/30 p-6 bg-pink-blush">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-pink-deep text-lg">Paiement à la Livraison</p>
                      <p className="text-sm text-muted-foreground font-light mt-2">
                        Payez lorsque votre commande arrive à votre porte en Algérie. Nous livrons dans toutes les wilayas et communes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="rounded-2xl bg-pink-blush border border-pink-soft/40 p-6 flex items-start gap-4">
                <Lock size={20} className="text-pink-deep mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-medium text-pink-deep mb-1">Paiement Sécurisé</p>
                  <p className="text-sm text-muted-foreground font-light">
                    Vos informations de paiement sont cryptées et sécurisées. Nous ne stockons jamais les détails de votre carte bancaire.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-lg bg-pink-deep text-cream px-6 py-4 font-medium text-sm hover:bg-pink-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Traitement..." : "Finaliser l'Achat"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-8 shadow-soft sticky top-28 h-fit">
              <h2 className="mb-8 text-2xl font-serif font-light text-pink-deep">Résumé de la Commande</h2>

              {/* Cart Items */}
              <div className="space-y-4 border-b border-pink-soft/30 pb-6 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-serif font-light text-pink-deep">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-light">Qté : {item.quantity}</p>
                    </div>
                    <p className="font-serif font-light text-pink-deep">{item.price * item.quantity} DA</p>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-4 border-b border-pink-soft/30 pb-6 mb-6">
                <div className="flex justify-between text-muted-foreground font-light">
                  <span>Sous-total</span>
                  <span>{cartTotal} DA</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-light">
                  <span>Livraison</span>
                  <span>{shipping > 0 ? `${shipping} DA` : "Sélectionner wilaya"}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between font-serif font-light text-pink-deep text-lg mb-8">
                <span>Total</span>
                <span>{total.toFixed(2)} DA</span>
              </div>

              {/* Shipping Info */}
              <div className="rounded-lg bg-pink-blush border border-pink-soft/40 p-4 flex items-start gap-3">
                <Truck size={18} className="text-pink-deep mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-pink-deep mb-1">Paiement à la Livraison</p>
                  <p className="text-xs text-muted-foreground font-light">
                    {formData.state && formData.municipality 
                      ? `Livraison à ${formData.municipality}, ${selectedState?.name}` 
                      : "Sélectionnez votre emplacement pour la livraison"}
                  </p>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 rounded-lg bg-pink-blush border border-pink-soft/40 p-4 flex items-start gap-3">
                <Shield size={18} className="text-pink-deep mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-pink-deep mb-1">100% Sécurisé</p>
                  <p className="text-xs text-muted-foreground font-light">Paiement crypté SSL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
