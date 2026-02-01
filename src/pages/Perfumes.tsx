import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DecantSelector } from "@/components/DecantSelector";
import { PRODUCTS } from "@/data/products";

const Perfumes = () => {
  // Filter only perfume products
  const perfumes = PRODUCTS.filter((p) => p.category === "Perfumes");

  // State to track selected decants for each perfume
  const [selectedDecants, setSelectedDecants] = useState<
    Record<number, { ml: number; price: number }>
  >({});

  // Handle decant selection
  const handleDecantSelect = (perfumeId: number, ml: number, price: number) => {
    setSelectedDecants((prev) => ({
      ...prev,
      [perfumeId]: { ml, price },
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Premium Perfume Decants</h1>
          <p className="text-lg text-muted-foreground">
            100% original perfumes, decanted from original bottles. Choose your preferred volume
            starting from 10ml.
          </p>
        </div>

        {/* Perfumes Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {perfumes.length > 0 ? (
            perfumes.map((perfume) => (
              <div key={perfume.id} className="space-y-4">
                {/* Perfume Image Placeholder */}
                <div className="h-64 rounded-lg bg-muted"></div>

                {/* Perfume Info */}
                <div>
                  <h2 className="text-xl font-bold">{perfume.name}</h2>
                  <p className="text-sm text-muted-foreground">{perfume.description}</p>
                </div>

                {/* Decant Selector Component */}
                <DecantSelector
                  perfumeName={perfume.name}
                  pricePerTenMl={perfume.price}
                  onDecantSelect={(ml, price) => handleDecantSelect(perfume.id, ml, price)}
                />

                {/* Display selected decant info */}
                {selectedDecants[perfume.id] && (
                  <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
                    ✓ Selected: {selectedDecants[perfume.id].ml}ml for{" "}
                    {selectedDecants[perfume.id].price.toFixed(2)} DA
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No perfumes found</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 font-semibold">100% Original</h3>
            <p className="text-sm text-muted-foreground">
              All perfumes are decanted from original bottles. Guaranteed authenticity.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 font-semibold">Flexible Quantities</h3>
            <p className="text-sm text-muted-foreground">
              Start from 10ml and increase in 10ml increments. Perfect for trying new scents.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 font-semibold">Competitive Pricing</h3>
            <p className="text-sm text-muted-foreground">
              Transparent pricing in DA. No hidden fees. Pay only for what you get.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Perfumes;
