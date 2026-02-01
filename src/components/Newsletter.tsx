const Newsletter = () => {
  return (
    <section className="py-28 bg-gradient-to-br from-pink-deep via-pink-dark to-pink-deep text-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-dark rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-40" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-cream/5 rounded-full blur-2xl" />

      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-6">
          Rejoignez Notre Communauté
        </h2>
        <p className="text-cream/80 mb-10 font-light text-lg max-w-xl mx-auto">
          Inscrivez-vous pour recevoir les dernières nouveautés, offres exclusives et événements privés.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Adresse email"
            className="flex-1 px-5 py-4 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-lg text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30 transition-all duration-300 font-light"
          />
          <button
            type="button"
            className="px-8 py-4 bg-rose-gold text-pink-deep text-sm font-medium rounded-lg hover:bg-rose-gold-light transition-all duration-300 whitespace-nowrap"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-xs text-cream/50 mt-6 font-light">
          Nous respectons votre vie privée. Désinscription facile à tout moment.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
