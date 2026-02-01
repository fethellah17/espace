import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { supabase, uploadImage, type Product } from "../../lib/supabase";

const ProductsManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    falconPrice: "",
    price: "",
    discount: "",
    category: "",
    stock: "",
    image: "",
    description: "",
    isNew: false,
  });

  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.image;

    // Upload image if a new file is selected
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

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      falcon_price: formData.falconPrice ? parseFloat(formData.falconPrice) : null,
      discount: parseFloat(formData.discount) || 0,
      category: formData.category,
      stock: parseInt(formData.stock),
      image: imageUrl,
      description: formData.description,
      is_new: formData.isNew,
    };

    if (isEditing && editingProductId) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProductId);

      if (error) {
        console.error('Error updating product:', error);
        alert('Erreur lors de la mise à jour du produit');
      } else {
        await fetchProducts();
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([productData]);

      if (error) {
        console.error('Error creating product:', error);
        alert('Erreur lors de la création du produit');
      } else {
        await fetchProducts();
      }
    }

    setLoading(false);
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setIsEditing(false);
    setEditingProductId(null);
    setImagePreview("");
    setSelectedFile(null);
    setFormData({ name: "", falconPrice: "", price: "", discount: "", category: "", stock: "", image: "", description: "", isNew: false });
  };

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      falconPrice: product.falcon_price ? product.falcon_price.toString() : "",
      price: product.price.toString(),
      discount: product.discount.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image,
      description: product.description,
      isNew: product.is_new,
    });
    setImagePreview(product.image);
    setShowCreateForm(true);
  };

  const handleDelete = (product: Product) => {
    setDeleteConfirmProduct(product);
  };

  const confirmDelete = async () => {
    if (deleteConfirmProduct) {
      setLoading(true);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deleteConfirmProduct.id);

      if (error) {
        console.error('Error deleting product:', error);
        alert('Erreur lors de la suppression du produit');
      } else {
        await fetchProducts();
      }
      setLoading(false);
      setDeleteConfirmProduct(null);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateFinalPrice = (price: number, discount: number) => {
    if (discount > 0) {
      return Math.round(price * (1 - discount / 100));
    }
    return price;
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-pink-deep mb-2">Gestion des produits</h1>
          <p className="text-muted-foreground">Gérez votre catalogue de produits</p>
        </div>
        <button
          onClick={() => {
            setIsEditing(false);
            setEditingProductId(null);
            setShowCreateForm(!showCreateForm);
          }}
          className="flex items-center gap-2 bg-pink-deep text-cream px-6 py-3 rounded-lg font-medium hover:bg-pink-medium transition-all duration-300"
        >
          <Plus size={20} />
          Nouveau produit
        </button>
      </div>

      {/* Create Product Form */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20 p-8 mb-8">
          <h2 className="text-xl font-serif text-pink-deep mb-6">
            {isEditing ? "Modifier le produit" : "Créer un nouveau produit"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom du produit
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="Ex: Oud Royale"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Prix (DA)
                </label>
                <input
                  type="number"
                  value={formData.falconPrice}
                  onChange={(e) => setFormData({ ...formData, falconPrice: e.target.value })}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="15000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Prix / 10ml (DA)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="4500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Réduction (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="0"
                />
                {formData.price && formData.discount && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Prix final / 10ml: {Math.round(Number(formData.price) * (1 - Number(formData.discount) / 100)).toLocaleString()} DA
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="25"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Image du produit
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                  placeholder="Description du produit..."
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="w-5 h-5 text-pink-deep border-pink-soft/40 rounded focus:ring-pink-deep/30"
                  />
                  <span className="text-sm font-medium text-foreground">Marquer comme nouveau produit</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-pink-deep text-cream px-6 py-3 rounded-lg font-medium hover:bg-pink-medium transition-all duration-300"
                disabled={loading || uploading}
              >
                {uploading ? "Téléchargement..." : loading ? "Chargement..." : isEditing ? "Enregistrer les modifications" : "Ajouter le produit"}
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

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full pl-12 pr-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20">
        <div className="p-6 border-b border-pink-soft/20">
          <h2 className="text-xl font-serif text-pink-deep">Tous les produits ({filteredProducts.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-pink-blush/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Prix (DA)
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Prix / 10ml (DA)
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Stock
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
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    Chargement...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-pink-blush/10 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-16 h-16 rounded-lg bg-white border border-pink-soft/20 flex items-center justify-center p-2">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon size={24} className="text-pink-deep/30" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">
                      {product.falcon_price ? product.falcon_price.toLocaleString() : '-'} DA
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.discount > 0 ? (
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {calculateFinalPrice(product.price, product.discount).toLocaleString()} DA
                        </div>
                        <div className="text-xs text-muted-foreground line-through">
                          {product.price.toLocaleString()} DA
                        </div>
                        <div className="text-xs text-red-600">-{product.discount}%</div>
                      </div>
                    ) : (
                      <div className="text-sm font-medium text-foreground">
                        {product.price.toLocaleString()} DA
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                      {product.stock} unités
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.is_new && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        Nouveau
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        disabled={loading}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product)}
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

      {/* Delete Confirmation Dialog */}
      {deleteConfirmProduct && (
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
              Êtes-vous sûr de vouloir supprimer le produit{" "}
              <span className="font-semibold">"{deleteConfirmProduct.name}"</span> ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Suppression..." : "Supprimer"}
              </button>
              <button
                onClick={() => setDeleteConfirmProduct(null)}
                className="flex-1 bg-gray-100 text-foreground px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                disabled={loading}
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

export default ProductsManagement;
