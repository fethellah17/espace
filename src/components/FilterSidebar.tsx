import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  productCount: number;
}

export interface FilterState {
  priceRange: [number, number];
  notes: string[];
}

const FRAGRANCE_NOTES = [
  "Floral",
  "Agrumes",
  "Boisé",
  "Vanille",
  "Musc",
  "Oud",
  "Lavande",
  "Rose",
  "Ambre",
  "Santal",
];

export const FilterSidebar = ({ onFilterChange, productCount }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [1000, 50000],
    notes: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    notes: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (value: number, type: "min" | "max") => {
    const newRange: [number, number] = [...filters.priceRange];
    if (type === "min") {
      newRange[0] = Math.min(value, newRange[1]);
    } else {
      newRange[1] = Math.max(value, newRange[0]);
    }
    const updatedFilters = { ...filters, priceRange: newRange };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleNoteToggle = (note: string) => {
    const updatedNotes = filters.notes.includes(note)
      ? filters.notes.filter((n) => n !== note)
      : [...filters.notes, note];
    const updatedFilters = { ...filters, notes: updatedNotes };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      priceRange: [1000, 50000],
      notes: [],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters =
    filters.notes.length > 0 ||
    filters.priceRange[0] !== 1000 ||
    filters.priceRange[1] !== 50000;

  return (
    <div className="w-full rounded-2xl bg-white p-8 shadow-soft sticky top-28 h-fit">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between pb-6 border-b border-pink-soft/30">
        <h2 className="text-lg font-serif font-light text-pink-deep">Affiner</h2>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-muted-foreground hover:text-pink-deep transition-colors duration-300 uppercase tracking-wide"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8 pb-8 border-b border-pink-soft/30">
        <button
          onClick={() => toggleSection("price")}
          className="mb-4 flex w-full items-center justify-between font-serif font-light text-pink-deep"
        >
          <span className="text-base">Gamme de Prix</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${expandedSections.price ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections.price && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Prix Min</label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), "min")}
                className="w-full h-1 bg-pink-soft/30 rounded-full appearance-none cursor-pointer accent-pink-deep"
              />
              <div className="text-sm font-serif text-pink-deep">{filters.priceRange[0]} DA</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Prix Max</label>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(Number(e.target.value), "max")}
                className="w-full h-1 bg-pink-soft/30 rounded-full appearance-none cursor-pointer accent-pink-deep"
              />
              <div className="text-sm font-serif text-pink-deep">{filters.priceRange[1]} DA</div>
            </div>

            <div className="rounded-lg bg-pink-blush p-4 text-sm text-pink-deep font-light">
              {filters.priceRange[0]} — {filters.priceRange[1]} DA
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="space-y-3 pb-6 border-b border-pink-soft/30">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Filtres Actifs</p>
          <div className="flex flex-wrap gap-2">
            {filters.notes.map((note) => (
              <div
                key={note}
                className="flex items-center gap-2 rounded-full bg-pink-soft px-3 py-1.5 text-xs text-pink-deep font-light"
              >
                {note}
                <button
                  onClick={() => handleNoteToggle(note)}
                  className="hover:text-pink-medium transition-colors duration-300"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mt-6 text-center text-sm text-muted-foreground font-light">
        <span className="text-pink-deep font-medium">{productCount}</span> fragrance{productCount !== 1 ? "s" : ""} trouvée{productCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
};
