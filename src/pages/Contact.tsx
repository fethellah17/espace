import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@espaceparfum.fr",
      description: "Nous répondons dans les 24 heures",
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      description: "Lundi au Vendredi, 9h-18h",
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "123 Avenue du Luxe, Paris, France",
      description: "Visitez notre boutique",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-pink-deep via-pink-dark to-cream pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6 text-6xl md:text-7xl font-serif font-light text-cream tracking-tight">
              Contactez-nous
            </h1>
            <p className="text-lg md:text-xl text-cream/80 font-light leading-relaxed">
              Des questions sur nos fragrances ? Nous serions ravis de vous entendre. Contactez-nous et commençons une conversation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid gap-16 lg:grid-cols-3 mb-20">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="rounded-2xl bg-white p-8 shadow-soft hover:shadow-elevated transition-all duration-300">
                <div className="mb-6 p-4 bg-pink-blush rounded-full w-fit">
                  <Icon className="h-6 w-6 text-pink-deep" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-xl font-serif font-light text-pink-deep">{info.title}</h3>
                <p className="mb-2 text-lg font-medium text-pink-deep">{info.value}</p>
                <p className="text-sm text-muted-foreground font-light">{info.description}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form Section */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-white p-12 shadow-soft">
            <h2 className="mb-2 text-4xl font-serif font-light text-pink-deep tracking-tight">Envoyez-nous un Message</h2>
            <p className="mb-10 text-muted-foreground font-light">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
            </p>

            {submitted && (
              <div className="mb-8 rounded-xl bg-pink-blush border border-pink-soft/50 p-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-pink-deep rounded-full mt-1">
                    <Send className="h-5 w-5 text-cream" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-medium text-pink-deep mb-1">Message Envoyé avec Succès !</p>
                    <p className="text-sm text-muted-foreground font-light">
                      Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-medium text-pink-deep">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-pink-deep">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-pink-deep">Sujet</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="De quoi s'agit-il ?"
                  required
                  className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-pink-deep">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  rows={6}
                  required
                  className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-pink-deep text-cream px-6 py-4 font-medium text-sm hover:bg-pink-medium transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Send size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                Envoyer le Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-pink-blush/30 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-12 text-5xl font-serif font-light text-pink-deep text-center tracking-tight">
              Questions Fréquemment Posées
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Combien de temps prend la livraison ?",
                  a: "Nous proposons une livraison express sous 24-48 heures pour les commandes passées avant 14h. La livraison standard prend 3-5 jours ouvrables.",
                },
                {
                  q: "Vos fragrances sont-elles authentiques ?",
                  a: "Oui, 100% authentiques. Toutes nos fragrances proviennent directement de distributeurs agréés et sont accompagnées de garanties d'authenticité.",
                },
                {
                  q: "Puis-je retourner ou échanger une fragrance ?",
                  a: "Absolument. Nous offrons une politique de retour de 30 jours si vous n'êtes pas entièrement satisfait de votre achat.",
                },
                {
                  q: "Proposez-vous des échantillons ?",
                  a: "Oui ! Nous proposons des échantillons de 3ml de la plupart des fragrances afin que vous puissiez essayer avant de vous engager sur une taille plus grande.",
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-xl bg-white p-6 shadow-soft">
                  <h3 className="mb-3 font-serif font-light text-pink-deep text-lg">{faq.q}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
