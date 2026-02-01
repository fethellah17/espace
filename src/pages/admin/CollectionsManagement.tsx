import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Image as ImageIcon, Sparkles } from "lucide-react";
import { supabase, uploadImage, type Collection } from "../../lib/supabase";

const CollectionsManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCollectionId, setEditingCollectionId] = useState<number | null>(null);
  const [deleteConfirmCollection, setDeleteConfirmCollection] = useState<Collection | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    isExclusive: false,
  });

  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching collections:', error);
    } else {
      setCollections(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.image;

    if (selectedFile) {
      setUploading(true);
      const uploadedUrl = await uploadImage(selectedFile);
      setUploading(false);
      
      if (!uploadedUrl) {
        alert('Erreur lors du téléchargement de l\'image');
        setLoading(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    const collectionData = {
      name: formData.name,
      description: formData.description,
      image: imageUrl,
      is_exclusive: formData.isExclusive,
    };

    if (isEditing && editingCollectionId) {
      const { error } = await supabase
        .from('collections')
        .update(collectionData)
        .eq('id', editingCollectionId);

      if (error) {
        console.error('Error updating collection:', error);
        alert('Erreur lors de la mise à jour de la collection');
      } else {
        await fetchCollections();
      }
    } else {
      const { error } = await supabase
        .from('collections')
        .insert([collectionData]);

      if (error) {
        console.error('Error creating collection:', error);
        alert('Erreur lors de la création de la collection');
      } else {
        await fetchCollections();
      }
    }

    setLoading(false);
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setIsEditing(false);
    setEditingCollectionId(null);
    setImagePreview("");
    setSelectedFile(null);
    setFormData({ name: "", description: "", image: "", isExclusive: false });
  };

  const handleEdit = (collection: Collection) => {
    setIsEditing(true);
    setEditingCollectionId(collection.id);
    setFormData({
      name: collection.name,
      description: collection.description,
      image: collection.image,
      isExclusive: collection.is_exclusive,
    });
    setImagePreview(collection.image);
    setShowCreateForm(true);
  };

  const handleDelete = (collection: Collection) => {
    setDeleteConfirmCollection(collection);
  };

  const confirmDelete = async () => {
    if (deleteConfirmCollection) {
      setLoading(true);
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', deleteConfirmCollection.id);

      if (error) {
        console.error('Error deleting collection:', error);
        alert('Erreur lors de la suppression de la collection');
      } else {
        await fetchCollections();
      }
      setLoading(false);
      setDeleteConfirmCollection(null);
    }
  };

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-pink-deep mb-2">Collections Exclusives</h1>
          <p className="text-muted-foreground">Gérez vos collections de parfums</p>
        </div>
        <button
          onClick={() => {
            setIsEditing(false);
            setEditingCollectionId(null);
            setShowCreateForm(!showCreateForm);
          }}
          className="flex items-center gap-2 bg-pink-deep text-cream px-6 py-3 rounded-lg font-medium hover:bg-pink-medium transition-all duration-300"
        >
          <Plus size={20} />
          Nouvelle collection
        </button>
      </div>

      {/* Create/Edit Collection Form */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20 p-8 mb-8">
          <h2 className="text-xl font-serif text-pink-deep mb-6">
            {isEditing ? "Modifier la collection" : "Créer une nouvelle collection"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom de la collection
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="Ex: Collection Oud Prestige"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="Description de la collection..."
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Image de la collection
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-pink-blush file:text-pink-deep hover:file:bg-pink-soft/40"
                    required={!isEditing && !formData.image}
                  />
                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-pink-soft/40 bg-gray-50">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setSelectedFile(null);
                          setFormData({ ...formData, image: "" });
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                  {uploading && (
                    <div className="text-sm text-pink-deep font-medium">
                      Téléchargement de l'image...
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isExclusive}
                    onChange={(e) => setFormData({ ...formData, isExclusive: e.target.checked })}
                    className="w-5 h-5 text-pink-deep border-pink-soft/40 rounded focus:ring-pink-deep/30"
                  />
                  <span className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Sparkles size={18} className="text-pink-deep" />
                    Marquer comme collection exclusive
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-pink-deep text-cream px-6 py-3 rounded-lg font-medium hover:bg-pink-medium transition-all duration-300"
                disabled={loading || uploading}
              >
                {uploading ? "Téléchargement..." : loading ? "Chargement..." : isEditing ? "Enregistrer les modifications" : "Créer la collection"}
              </button>
              <button
                type="button"
                onClick={handleCloseForm}
                className="bg-gray-100 text-foreground px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                disabled={loading || uploading}
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
            placeholder="Rechercher une collection..."
            className="w-full pl-12 pr-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
          />
        </div>
      </div>

      {/* Collections Grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          Chargement des collections...
        </div>
      ) : filteredCollections.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune collection trouvée
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => (
          <div
            key={collection.id}
            className="bg-white rounded-2xl shadow-soft border border-pink-soft/20 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative h-48 bg-pink-blush">
              {collection.image ? (
                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={48} className="text-pink-deep/30" />
                </div>
              )}
              {collection.is_exclusive && (
                <div className="absolute top-3 right-3 bg-pink-deep text-cream px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Sparkles size={14} />
                  Exclusive
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-serif text-pink-deep mb-2">{collection.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{collection.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">
                  {collection.product_count} produit{collection.product_count > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(collection)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  disabled={loading}
                >
                  <Edit size={16} />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(collection)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Empty State */}
      {filteredCollections.length === 0 && (
        <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20 p-12 text-center">
          <Sparkles size={48} className="mx-auto text-pink-deep/30 mb-4" />
          <h3 className="text-xl font-serif text-pink-deep mb-2">Aucune collection trouvée</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? "Essayez une autre recherche" : "Créez votre première collection pour commencer"}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-pink-deep text-cream px-6 py-3 rounded-lg font-medium hover:bg-pink-medium transition-all duration-300"
            >
              Créer une collection
            </button>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmCollection && (
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
              Êtes-vous sûr de vouloir supprimer la collection{" "}
              <span className="font-semibold">"{deleteConfirmCollection.name}"</span> ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all duration-300"
              >
                Supprimer
              </button>
              <button
                onClick={() => setDeleteConfirmCollection(null)}
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

export default CollectionsManagement;
