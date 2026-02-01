import { ArrowRight, Sparkles } from "lucide-react";
import { useCollections } from "@/hooks/useCollections";

const Categories = () => {
  const { collections, loading } = useCollections();

  if (loading) {
    return (
      <section className="py-28 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-serif font-light text-pink-deep mb-3 tracking-tight">
              Chargement des Collections...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  // Get the first 4 collections to display
  const displayCollections = collections.slice(0, 4);

  return (
    <section className="py-28 max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex items-end justify-between mb-16">
        <div>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-pink-deep mb-3 tracking-tight">
            Collections Exclusives
          </h2>
          <p className="text-muted-foreground font-light text-lg">
            Explorez notre sélection de fragrances arabes authentiques.
          </p>
        </div>
        <a
          href="#"
          className="hidden md:flex items-center gap-2 text-sm text-pink-deep hover:text-pink-medium transition-colors duration-300 group"
        >
          Voir Tout
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        {displayCollections.map((collection, index) => {
          // First collection takes 2x2 grid, second takes 2x1, rest take 1x1
          const isLarge = index === 0;
          const isWide = index === 1;
          
          return (
            <div 
              key={collection.id}
              className={`group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 ${
                isLarge ? 'md:col-span-2 md:row-span-2 min-h-[300px]' : 
                isWide ? 'md:col-span-2 min-h-[200px]' : 
                'min-h-[200px]'
              } md:min-h-0`}
            >
              <img
                src={collection.image || "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 ${
                isLarge ? 'bg-gradient-to-t from-pink-deep/95 via-pink-deep/40 to-transparent' :
                'bg-pink-deep/40 group-hover:bg-pink-deep/30 transition-colors duration-500'
              }`} />
              <div className={`absolute bottom-0 left-0 ${isLarge ? 'p-8' : 'p-6'}`}>
                {collection.is_exclusive && (
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-rose-gold-light" />
                    <p className="text-rose-gold-light text-xs tracking-widest uppercase font-medium">
                      Exclusif
                    </p>
                  </div>
                )}
                <h3 className={`font-serif font-light text-cream tracking-tight ${
                  isLarge ? 'text-4xl mb-3' : 'text-2xl mb-1'
                }`}>
                  {collection.name}
                </h3>
                <p className="text-cream/80 text-sm font-light leading-relaxed">
                  {collection.description}
                </p>
                {isLarge && (
                  <button className="mt-4 text-cream text-sm font-medium border-b border-cream/40 pb-1 hover:border-cream transition-all duration-300">
                    Explorer la Collection
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
