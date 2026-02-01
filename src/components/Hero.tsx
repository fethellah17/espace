import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 bg-gradient-to-br from-pink-deep via-pink-dark to-pink-deep overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating orb decorations */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rose-gold/15 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-rose-gold/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cream/5 rounded-full blur-2xl animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 text-center z-10">
        {/* Badge */}
        <div className="inline-block py-2 px-5 rounded-full border border-rose-gold/30 text-rose-gold-light text-xs tracking-widest uppercase mb-8 bg-rose-gold/10 backdrop-blur-sm animate-fade-in font-medium">
          Nouvelle Collection 2026
        </div>
        
        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light text-cream leading-[1.05] tracking-tight mb-8 animate-fade-in-up">
          <span className="italic font-light">Espace</span> <span className="font-light">Parfum</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-cream/80 max-w-2xl mx-auto text-lg md:text-xl font-light mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Découvrez l'essence de l'élégance. Huiles d'Oud authentiques et fragrances arabes d'exception pour les connaisseurs avertis.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Link
            to="/products"
            className="group px-10 py-4 bg-cream text-pink-deep rounded-full font-medium text-sm hover:bg-white transition-all duration-300 shadow-glow flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Explorer la Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <button className="group px-10 py-4 border border-cream/30 text-cream rounded-full font-medium text-sm hover:border-cream/60 hover:bg-cream/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto">
            <MessageCircle size={16} />
            Commander sur WhatsApp
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border border-cream/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-cream/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
