import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    // Simulate login (replace with actual authentication)
    setTimeout(() => {
      if (formData.email === "admin@espaceparfum.fr" && formData.password === "admin123") {
        // Success - redirect to admin dashboard
        navigate("/admin/dashboard");
        setIsLoading(false);
      } else {
        setError("Email ou mot de passe incorrect");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-pink-deep via-pink-dark to-cream pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 p-4 bg-cream/10 backdrop-blur-sm rounded-full w-fit mx-auto">
              <Lock size={48} className="text-cream" strokeWidth={1.5} />
            </div>
            <h1 className="mb-6 text-6xl md:text-7xl font-serif font-light text-cream tracking-tight">
              Administration
            </h1>
            <p className="text-lg md:text-xl text-cream/80 font-light leading-relaxed">
              Connectez-vous pour accéder au panneau d'administration
            </p>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl bg-white p-12 shadow-soft">
            <h2 className="mb-2 text-3xl font-serif font-light text-pink-deep tracking-tight text-center">
              Connexion
            </h2>
            <p className="mb-10 text-muted-foreground font-light text-center">
              Entrez vos identifiants pour continuer
            </p>

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-600 font-light text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-pink-deep">
                  Email
                </label>
                <div className="relative">
                  <Mail 
                    size={18} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
                    strokeWidth={1.5} 
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@espaceparfum.fr"
                    required
                    className="w-full rounded-lg border border-pink-soft/40 bg-white pl-12 pr-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-pink-deep">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock 
                    size={18} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
                    strokeWidth={1.5} 
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-lg border border-pink-soft/40 bg-white pl-12 pr-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border border-pink-soft/40 accent-pink-deep cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground font-light">
                    Se souvenir de moi
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-pink-deep hover:text-pink-medium transition-colors duration-300 font-light"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-pink-deep text-cream px-6 py-3 font-medium text-sm hover:bg-pink-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-pink-soft/30">
              <p className="text-center text-sm text-muted-foreground font-light">
                Besoin d'aide ?{" "}
                <a 
                  href="/contact" 
                  className="text-pink-deep hover:text-pink-medium transition-colors duration-300"
                >
                  Contactez le support
                </a>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 rounded-xl bg-pink-blush border border-pink-soft/40 p-6">
            <div className="flex items-start gap-4">
              <Lock size={20} className="text-pink-deep mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-medium text-pink-deep mb-1 text-sm">Connexion Sécurisée</p>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Vos identifiants sont cryptés et protégés. Cette page est réservée aux administrateurs autorisés uniquement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
