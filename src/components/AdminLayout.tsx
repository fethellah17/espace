import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, LogOut, Sparkles, Award } from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();

  const navLinks = [
    { label: "Tableau de bord", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Produits", href: "/admin/products", icon: Package },
    { label: "Collections", href: "/admin/collections", icon: Sparkles },
    { label: "Marques", href: "/admin/brands", icon: Award },
    { label: "Commandes", href: "/admin/orders", icon: ShoppingCart },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-cream">
      {/* Admin Header */}
      <header className="bg-white border-b border-pink-soft/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link
            to="/admin/dashboard"
            className="text-xl font-serif font-light tracking-widest text-pink-deep"
          >
            <span className="italic">Espace</span> <span>Parfum</span> <span className="text-sm ml-2 text-muted-foreground">Admin</span>
          </Link>
          
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-deep transition-colors duration-300"
          >
            <LogOut size={18} />
            <span>Retour au site</span>
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-pink-soft/40 min-h-[calc(100vh-4rem)] p-6">
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-pink-deep text-cream"
                      : "text-muted-foreground hover:bg-pink-blush hover:text-pink-deep"
                  }`}
                >
                  <Icon size={20} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
