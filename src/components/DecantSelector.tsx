import { useState } from "react";

interface DecantSelectorProps {
  perfumeName: string;
  pricePerTenMl: number; // Price in DA for 10ml
  onDecantSelect?: (mlAmount: number, totalPrice: number) => void;
}

/**
 * DecantSelector Component
 * Allows users to select decant quantities in 10ml increments
 * Calculates and displays total price dynamically
 */
export const DecantSelector = ({
  perfumeName,
  pricePerTenMl,
  onDecantSelect,
}: DecantSelectorProps) => {
  // State for selected ml amount (minimum 10ml, increments of 10)
  const [selectedMl, setSelectedMl] = useState(10);

  // Predefined ml options for quick selection
  const mlOptions = [10, 20, 30, 40, 50, 75, 100];

  // Calculate total price based on selected ml
  const calculatePrice = (ml: number): number => {
    return (ml / 10) * pricePerTenMl;
  };

  const totalPrice = calculatePrice(selectedMl);

  // Handle ml selection change
  const handleMlChange = (ml: number) => {
    setSelectedMl(ml);
    onDecantSelect?.(ml, calculatePrice(ml));
  };

  // Handle custom input for ml
  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || 10;

    // Ensure minimum 10ml
    if (value < 10) value = 10;

    // Round to nearest 10ml increment
    value = Math.round(value / 10) * 10;

    handleMlChange(value);
  };

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
      {/* Header with decant label */}
      <div>
        <h3 className="mb-2 text-lg font-semibold">{perfumeName}</h3>
        <p className="text-sm text-muted-foreground">
          ✓ Original perfume – decanted from original bottle
        </p>
      </div>

      {/* Price per 10ml info */}
      <div className="rounded-md bg-muted p-3">
        <p className="text-sm text-muted-foreground">
          Price per 10ml: <span className="font-semibold text-foreground">{pricePerTenMl} DA</span>
        </p>
      </div>

      {/* Quick selection buttons */}
      <div>
        <label className="mb-3 block text-sm font-medium">Select Volume</label>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {mlOptions.map((ml) => (
            <button
              key={ml}
              onClick={() => handleMlChange(ml)}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                selectedMl === ml
                  ? "bg-primary text-primary-foreground"
                  : "border bg-background hover:bg-muted"
              }`}
            >
              {ml}ml
            </button>
          ))}
        </div>
      </div>

      {/* Custom ml input */}
      <div>
        <label className="mb-2 block text-sm font-medium">Custom Volume (ml)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={selectedMl}
            onChange={handleCustomInput}
            min="10"
            step="10"
            className="w-24 rounded-md border bg-background px-3 py-2 text-center"
          />
          <span className="text-sm text-muted-foreground">ml (minimum 10ml, increments of 10ml)</span>
        </div>
      </div>

      {/* Dynamic price display */}
      <div className="border-t pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Total Price:</span>
          <span className="text-3xl font-bold text-primary">{totalPrice.toFixed(2)} DA</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {selectedMl}ml ÷ 10 × {pricePerTenMl} DA = {totalPrice.toFixed(2)} DA
        </p>
      </div>

      {/* Add to cart button */}
      <button className="w-full rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
        Add {selectedMl}ml to Cart
      </button>
    </div>
  );
};
