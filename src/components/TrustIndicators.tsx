import { CheckCircle, ShieldCheck, Globe } from "lucide-react";

const indicators = [
  {
    icon: CheckCircle,
    title: "100% Original",
    subtitle: "Marques Arabes Authentiques",
  },
  {
    icon: ShieldCheck,
    title: "Qualité Premium",
    subtitle: "Oud & Huiles Essentielles",
  },
  {
    icon: Globe,
    title: "Livraison 69 Wilaya",
    subtitle: "Expédition Express",
  },
];

const TrustIndicators = () => {
  return (
    <div className="border-b border-pink-soft/30 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-pink-soft/20">
          {indicators.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center md:justify-start gap-4 py-6 md:py-0 md:pl-12 first:md:pl-0"
            >
              <div className="p-3 bg-pink-blush rounded-full text-pink-deep shrink-0">
                <item.icon size={22} strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm font-medium text-pink-deep">{item.title}</p>
                <p className="text-xs text-muted-foreground font-light">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
