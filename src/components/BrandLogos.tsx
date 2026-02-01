import { useBrands } from "@/hooks/useBrands";
import { Award } from "lucide-react";

const BrandLogos = () => {
  const { brands, loading } = useBrands();

  if (loading) {
    return (
      <section className="py-16 border-t border-b border-pink-soft/30 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-10 font-medium">
            Chargement...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 border-t border-b border-pink-soft/30 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-hidden">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-10 font-medium">
          Marques de Confiance
        </p>
        <div className="flex justify-between items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 overflow-x-auto no-scrollbar pb-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center gap-2 shrink-0">
              <span className="text-base md:text-lg font-serif font-light text-pink-deep/60 tracking-wide">
                {brand.name}
              </span>
              {brand.is_trusted && (
                <Award size={16} className="text-rose-gold" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
