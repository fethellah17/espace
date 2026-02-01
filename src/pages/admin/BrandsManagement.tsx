import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Image as ImageIcon, Award } from "lucide-react";
import { supabase, type Brand } from "../../lib/supabase";

const BrandsManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<number | null>(null);
  const [deleteConfirmBrand, setDeleteConfirmBrand] = useState<Brand | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isTrusted: true,
  });

  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching brands:', error);
    } else {
      setBrands(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const brandData = {
      name: formData.name,
      description: formData.description,
      is_trusted: formData.isTrusted,
    };

    if (isEditing && editingBrandId) {
      const { error } = await supabase
        .from('brands')
        .update(brandData)
        .eq('id', editingBrandId);

      if (error) {
        console.error('Error updating brand:', error);
        alert('Erreur lors de la mise à jour de la marque');
      } else {
        await fetchBrands();
      }
    } else {
      const { error } = await supabase
        .from('brands')
        .insert([brandData]);

      if (error) {
        console.error('Error creating brand:', error);
        alert('Erreur lors de la création de la marque');
      } else {
        await fetchBrands();
      }
    }

    setLoading(false);
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setIsEditing(false);
    setEditingBrandId(null);
    setFormData({ name: "", description: "", isTrusted: true });
  };

  const handleEdit = (brand: Brand) => {
    setIsEditing(true);
    setEditingBrandId(brand.id);
    setFormData({
      name: brand.name,
      description: brand.description,
      isTrusted: brand.is_trusted,
    });
    setShowCreateForm(true);
  };

  const handleDelete = (brand: Brand) => {
    setDeleteConfirmBrand(brand);
  };

  const confirmDelete = async () => {
    if (deleteConfirmBrand) {
      setLoading(true);
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', deleteConfirmBrand.id);

      if (error) {
        console.error('Error deleting brand:', error);
        alert('Erreur lors de la suppression de la marque');
      } else {
        await fetchBrands();
      }
      setLoading(false);
      setDeleteConfirmBrand(null);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-pink-deep mb-2">Marques de Confiance</h1>
          <p className="text-muted-foreground">Gérez les marques partenaires</p>
        </div>
        <button
          onClick={() => {
            setIsEditing(false);
            setEditingBrandId(null);
            setShowCreateForm(!showCreateForm);
          }}
          className="flex items-center gap-2 bg-pink-deep text-cream px-6 py-3 rounded-lg font-medium hover:bg-pink-medium transition-all duration-300"
        >
          <Plus size={20} />
          Nouvelle marque
        </button>
      </div>

      {/* Create/Edit Brand Form */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20 p-8 mb-8">
          <h2 className="text-xl font-serif text-pink-deep mb-6">
            {isEditing ? "Modifier la marque" : "Ajouter une nouvelle marque"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom de la marque
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="Ex: Dior"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="Ex: Maison de luxe française"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTrusted}
                    onChange={(e) => setFormData({ ...formData, isTrusted: e.target.checked })}
                    className="w-5 h-5 text-pink-deep border-pink-soft/40 rounded focus:ring-pink-deep/30"
                  />
                  <span className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Award size={18} className="text-pink-deep" />
                    Marque de confiance certifiée
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-pink-deep text-cream px-6 py-3 rounded-lg font-medium hover:bg-pink-medium transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Chargement..." : isEditing ? "Enregistrer les modifications" : "Ajouter la marque"}
              </button>
              <button
                type="button"
                onClick={handleCloseForm}
                className="bg-gray-100 text-foreground px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                disabled={loading}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une marque..."
            className="w-full pl-12 pr-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
          />
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20">
        <div className="p-6 border-b border-pink-soft/20">
          <h2 className="text-xl font-serif text-pink-deep">Toutes les marques ({filteredBrands.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-pink-blush/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-soft/20">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    Chargement des marques...
                  </td>
                </tr>
              ) : filteredBrands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    Aucune marque trouvée
                  </td>
                </tr>
              ) : (
                filteredBrands.map((brand) => (
                <tr key={brand.id} className="hover:bg-pink-blush/10 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {brand.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {brand.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {brand.is_trusted && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 w-fit">
                        <Award size={14} />
                        Certifiée
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(brand)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        disabled={loading}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(brand)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        disabled={loading}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20 p-12 text-center mt-6">
          <Award size={48} className="mx-auto text-pink-deep/30 mb-4" />
          <h3 className="text-xl font-serif text-pink-deep mb-2">Aucune marque trouvée</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? "Essayez une autre recherche" : "Ajoutez votre première marque de confiance"}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-pink-deep text-cream px-6 py-3 rounded-lg font-medium hover:bg-pink-medium transition-all duration-300"
            >
              Ajouter une marque
            </button>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmBrand && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-red-50">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-pink-deep">Confirmer la suppression</h2>
                <p className="text-sm text-muted-foreground mt-1">Cette action est irréversible</p>
              </div>
            </div>
            <p className="text-foreground mb-6">
              Êtes-vous sûr de vouloir supprimer la marque{" "}
              <span className="font-semibold">"{deleteConfirmBrand.name}"</span> ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all duration-300"
              >
                Supprimer
              </button>
              <button
                onClick={() => setDeleteConfirmBrand(null)}
                className="flex-1 bg-gray-100 text-foreground px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsManagement;
