import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pink-deep text-cream py-20 border-t border-pink-dark">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="text-2xl font-serif font-light text-cream mb-6 tracking-tight">
              <span className="italic">Espace</span> Parfum
            </div>
            <p className="text-sm font-light leading-relaxed mb-8 text-cream/80">
              Redéfinir les fragrances arabes avec élégance et authenticité.
            </p>
            <div className="flex gap-5">
              <a href="#" className="text-cream/60 hover:text-rose-gold transition-colors duration-300 p-2">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-cream/60 hover:text-rose-gold transition-colors duration-300 p-2">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-cream/60 hover:text-rose-gold transition-colors duration-300 p-2">
                <Twitter size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-cream font-serif font-light text-base mb-6 tracking-wide">Boutique</h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Nouveautés
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Collection Oud
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Huiles Attar
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Mélanges Mukhallat
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Coffrets Cadeaux
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-cream font-serif font-light text-base mb-6 tracking-wide">Support</h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Suivi de Commande
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Politique d'Expédition
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Retours & Échanges
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Guide des Fragrances
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-rose-gold transition-colors duration-300">
                  Nous Contacter
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream font-serif font-light text-base mb-6 tracking-wide">Contact</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-rose-gold shrink-0" strokeWidth={1.5} />
                <span className="text-cream/70">
                  123 Avenue du Luxe
                  <br />
                  Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-rose-gold shrink-0" strokeWidth={1.5} />
                <span className="text-cream/70">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-rose-gold shrink-0" strokeWidth={1.5} />
                <span className="text-cream/70">contact@espaceparfum.fr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-cream/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-light text-cream/60">
          <p>© 2026 Espace Parfum. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-rose-gold transition-colors duration-300">
              Confidentialité
            </a>
            <a href="#" className="hover:text-rose-gold transition-colors duration-300">
              Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
