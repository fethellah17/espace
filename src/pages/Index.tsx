import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import Categories from "@/components/Categories";
import BrandLogos from "@/components/BrandLogos";
import AllProducts from "@/components/AllProducts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <Hero />
      <TrustIndicators />
      <Categories />
      <BrandLogos />
      <AllProducts />
      <Footer />
    </div>
  );
};

export default Index;
