import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, favorites } = useAppContext();
  const location = useLocation();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Produits", href: "/products" },
    { label: "À Propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream/98 backdrop-blur-xl border-b border-pink-soft/40 shadow-soft"
          : "bg-cream/95 backdrop-blur-lg border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-pink-deep transition-colors duration-300"
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-serif font-light tracking-widest text-pink-deep hover:text-pink-medium transition-colors duration-300 flex-1 md:flex-none text-center md:text-left"
        >
          <span className="italic font-light">Espace</span> <span className="font-light">Parfum</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12 text-xs font-medium text-muted-foreground tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`transition-all duration-300 relative group ${
                isActive(link.href)
                  ? "text-pink-deep"
                  : "hover:text-pink-deep"
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 h-px bg-pink-deep transition-all duration-300 ${
                isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3 md:gap-6 text-muted-foreground">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hover:text-pink-deep transition-colors duration-300 p-2"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link
            to="/favorites"
            className="hover:text-pink-deep transition-colors duration-300 relative p-2"
          >
            <Heart size={20} strokeWidth={1.5} />
            {favoritesCount > 0 && (
              <span className="absolute top-0 right-0 bg-pink-deep text-cream text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                {favoritesCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="hover:text-pink-deep transition-colors duration-300 relative p-2"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-pink-deep text-cream text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/admin"
            className="inline-flex items-center ml-1 md:ml-2 rounded-lg bg-pink-deep text-cream px-2 md:px-3 py-2 text-xs font-medium hover:bg-pink-medium transition-all duration-300 whitespace-nowrap"
          >
            Admin
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-pink-soft/30 bg-cream/50 backdrop-blur-md px-4 md:px-8 py-4 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <input
              type="text"
              placeholder="Rechercher des parfums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/50 border border-pink-soft/40 px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 rounded-lg transition-all duration-300"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-pink-soft/30 bg-cream/98 backdrop-blur-md animate-fade-in">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium tracking-wide ${
                  isActive(link.href)
                    ? "bg-pink-soft text-pink-deep"
                    : "text-muted-foreground hover:bg-pink-blush hover:text-pink-deep"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/account"
              className="px-4 py-3 rounded-lg text-sm font-medium tracking-wide text-muted-foreground hover:bg-pink-blush hover:text-pink-deep transition-all duration-300"
            >
              Compte
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
