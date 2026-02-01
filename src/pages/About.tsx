import { Heart, Droplet, Award, Truck, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const features = [
    {
      icon: Droplet,
      title: "100% Original",
      description: "Tous les parfums décantés à partir de flacons originaux authentiques avec pureté garantie",
    },
    {
      icon: Award,
      title: "Qualité Premium",
      description: "Fragrances soigneusement sélectionnées auprès de marques internationales renommées",
    },
    {
      icon: Truck,
      title: "Livraison Rapide",
      description: "Expédition rapide et fiable à travers l'Algérie avec emballage sécurisé",
    },
    {
      icon: Shield,
      title: "Authenticité Garantie",
      description: "Chaque produit est accompagné de notre garantie d'authenticité et d'assurance qualité",
    },
    {
      icon: Heart,
      title: "Client d'abord",
      description: "Équipe de support dédiée prête à vous aider pour toute question ou préoccupation",
    },
    {
      icon: Sparkles,
      title: "Options Flexibles",
      description: "Choisissez votre volume parfait à partir de 10ml par incréments de 10ml",
    },
  ];

  const stats = [
    { number: "500+", label: "Clients Satisfaits" },
    { number: "50+", label: "Fragrances Premium" },
    { number: "10ml", label: "Décantation Minimum" },
    { number: "100%", label: "Authentique" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-pink-deep via-pink-dark to-cream pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-6xl md:text-7xl font-serif font-light text-cream tracking-tight">
              À Propos d'<span className="italic">Espace</span> Parfum
            </h1>
            <p className="text-lg md:text-xl text-cream/80 font-light leading-relaxed">
              Découvrez l'art des fragrances raffinées. Nous rendons les parfums de luxe accessibles grâce à notre service de décantation premium.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-2xl bg-white p-8 text-center shadow-soft hover:shadow-elevated transition-all duration-300">
              <p className="text-4xl md:text-5xl font-serif font-light text-pink-deep mb-2">{stat.number}</p>
              <p className="text-sm text-muted-foreground font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Our Story */}
          <section className="grid gap-12 md:grid-cols-2 items-center">
            <div className="h-96 rounded-2xl bg-gradient-to-br from-pink-soft to-pink-blush shadow-soft"></div>
            <div>
              <h2 className="mb-6 text-5xl font-serif font-light text-pink-deep tracking-tight">Notre Histoire</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed font-light text-lg">
                Fondé avec une passion pour les fragrances raffinées, Espace Parfum a été créé pour combler le fossé entre les parfums de luxe et l'accessibilité. Nous croyons que tout le monde mérite de découvrir des senteurs premium sans se ruiner.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                Notre parcours a commencé avec une vision simple : rendre les parfums authentiques et de haute qualité accessibles à tous. Grâce à notre service de décantation innovant, les clients peuvent explorer différentes fragrances, trouver leur parfum idéal et profiter du luxe à leur propre rythme.
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 text-5xl font-serif font-light text-pink-deep tracking-tight">Notre Mission</h2>
              <p className="mb-8 text-muted-foreground leading-relaxed font-light text-lg">
                Nous nous engageons à vous proposer des parfums 100% originaux, soigneusement décantés à partir de flacons originaux. Notre mission est de rendre les fragrances premium accessibles à tous grâce à nos options de décantation flexibles.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-rose-gold font-light text-2xl mt-1">✓</span>
                  <span className="text-muted-foreground font-light">Fournir des fragrances authentiques et de haute qualité</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-rose-gold font-light text-2xl mt-1">✓</span>
                  <span className="text-muted-foreground font-light">Offrir des quantités flexibles pour tous les budgets</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-rose-gold font-light text-2xl mt-1">✓</span>
                  <span className="text-muted-foreground font-light">Maintenir la transparence dans les prix et le service</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-rose-gold font-light text-2xl mt-1">✓</span>
                  <span className="text-muted-foreground font-light">Offrir une expérience client exceptionnelle</span>
                </li>
              </ul>
            </div>
            <div className="h-96 rounded-2xl bg-gradient-to-br from-pink-soft to-pink-blush shadow-soft"></div>
          </section>

          {/* Our Commitment */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="mb-6 text-5xl font-serif font-light text-pink-deep tracking-tight">Notre Engagement envers Vous</h2>
              <p className="text-muted-foreground font-light text-lg">
                Chaque parfum de notre collection est garanti authentique et original. Nous travaillons directement avec des fournisseurs de confiance pour garantir les normes de qualité les plus élevées.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="rounded-2xl bg-white p-8 shadow-soft hover:shadow-elevated transition-all duration-300">
                    <div className="mb-4 p-3 bg-pink-blush rounded-full w-fit">
                      <Icon className="h-6 w-6 text-pink-deep" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-3 font-serif font-light text-pink-deep text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="rounded-2xl bg-white p-12 md:p-16 shadow-soft">
            <h2 className="mb-12 text-5xl font-serif font-light text-pink-deep tracking-tight">Pourquoi Choisir Espace Parfum ?</h2>
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-serif font-light text-pink-deep">Assurance Qualité</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Chaque fragrance subit des contrôles de qualité rigoureux. Nous nous approvisionnons directement auprès de distributeurs agréés et maintenons des conditions de stockage strictes pour préserver l'intégrité des fragrances.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-serif font-light text-pink-deep">Luxe Abordable</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Profitez de fragrances premium sans le prix premium. Notre service de décantation vous permet de profiter de parfums de luxe à une fraction du coût.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-serif font-light text-pink-deep">Quantités Flexibles</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Commencez avec seulement 10ml et augmentez par incréments de 10ml. Parfait pour essayer de nouveaux parfums ou entretenir vos favoris.
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-serif font-light text-pink-deep">Conseils d'Experts</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Notre équipe est passionnée par les fragrances et prête à vous aider à trouver votre parfum idéal.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-pink-deep via-pink-dark to-pink-deep py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="mb-6 text-5xl md:text-6xl font-serif font-light text-cream tracking-tight">Prêt à Découvrir Votre Parfum Signature ?</h2>
          <p className="mb-10 text-cream/80 max-w-2xl mx-auto font-light text-lg">
            Explorez notre collection de parfums premium et trouvez la fragrance qui vous parle.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/products"
              className="inline-block rounded-full bg-cream text-pink-deep px-10 py-4 font-medium text-sm hover:bg-white transition-all duration-300 shadow-glow"
            >
              Acheter Maintenant
            </Link>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-cream/30 text-cream px-10 py-4 font-medium text-sm hover:border-cream/60 hover:bg-cream/10 transition-all duration-300"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
