import { useState, useEffect } from "react";
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { supabase, type Order as SupabaseOrder, type OrderItem } from "../../lib/supabase";

interface Order {
  id: string;
  client: string;
  email: string;
  phone: string;
  wilaya: string;
  commune: string;
  adresse: string;
  produits: { name: string; quantity: number; price: number }[];
  total: number;
  statut: "En attente" | "En cours" | "Expédiée" | "Livrée" | "Annulée";
  date: string;
  livraison: string;
}

const OrdersManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Error fetching orders:', ordersError);
      setLoading(false);
      return;
    }

    const ordersWithItems = await Promise.all(
      (ordersData || []).map(async (order) => {
        const { data: items } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);

        return {
          id: order.id,
          client: order.client,
          email: order.email,
          phone: order.phone,
          wilaya: order.wilaya,
          commune: order.commune,
          adresse: order.adresse,
          total: order.total,
          statut: order.statut as Order['statut'],
          date: new Date(order.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
          livraison: order.livraison,
          produits: (items || []).map(item => ({
            name: item.product_name,
            quantity: item.quantity,
            price: item.price
          }))
        };
      })
    );

    setOrders(ordersWithItems);
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['statut']) => {
    const { error } = await supabase
      .from('orders')
      .update({ statut: newStatus })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order:', error);
      alert('Erreur lors de la mise à jour de la commande');
    } else {
      await fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, statut: newStatus });
      }
    }
  };

  const sampleOrders: Order[] = [
    {
      id: "CMD-001",
      client: "Ahmed Benali",
      email: "ahmed.benali@email.com",
      phone: "0555 123 456",
      wilaya: "Alger",
      commune: "Bab Ezzouar",
      adresse: "Résidence Les Palmiers, Bât A, Appt 12",
      produits: [
        { name: "Oud Royale", quantity: 1, price: 4500 },
      ],
      total: 4500,
      statut: "En cours",
      date: "30 Jan 2026",
      livraison: "Domicile",
    },
    {
      id: "CMD-002",
      client: "Fatima Zohra",
      email: "fatima.z@email.com",
      phone: "0666 789 012",
      wilaya: "Oran",
      commune: "Oran Centre",
      adresse: "12 Rue Larbi Ben M'hidi",
      produits: [
        { name: "Rose de Nuit", quantity: 2, price: 3800 },
        { name: "Jasmin Noir", quantity: 1, price: 4200 },
      ],
      total: 11800,
      statut: "Livrée",
      date: "29 Jan 2026",
      livraison: "Domicile",
    },
    {
      id: "CMD-003",
      client: "Karim Mansouri",
      email: "karim.m@email.com",
      phone: "0777 345 678",
      wilaya: "Constantine",
      commune: "Constantine Centre",
      adresse: "45 Avenue Aouati Mostefa",
      produits: [
        { name: "Musk Imperial", quantity: 1, price: 5200 },
      ],
      total: 5200,
      statut: "En attente",
      date: "29 Jan 2026",
      livraison: "Bureau",
    },
    {
      id: "CMD-004",
      client: "Samira Boudjelal",
      email: "samira.b@email.com",
      phone: "0555 987 654",
      wilaya: "Alger",
      commune: "Hydra",
      adresse: "Villa 23, Lotissement Les Jasmins",
      produits: [
        { name: "Oud Royale", quantity: 1, price: 4500 },
        { name: "Rose de Nuit", quantity: 1, price: 3800 },
      ],
      total: 8300,
      statut: "Expédiée",
      date: "28 Jan 2026",
      livraison: "Domicile",
    },
    {
      id: "CMD-005",
      client: "Yacine Hamdi",
      email: "yacine.h@email.com",
      phone: "0666 234 567",
      wilaya: "Blida",
      commune: "Blida Centre",
      adresse: "18 Rue des Roses",
      produits: [
        { name: "Jasmin Noir", quantity: 1, price: 4200 },
      ],
      total: 4200,
      statut: "Annulée",
      date: "28 Jan 2026",
      livraison: "Domicile",
    },
  ];

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "Livrée":
        return <CheckCircle size={18} className="text-green-600" />;
      case "En cours":
        return <Package size={18} className="text-blue-600" />;
      case "Expédiée":
        return <Truck size={18} className="text-purple-600" />;
      case "En attente":
        return <Clock size={18} className="text-yellow-600" />;
      case "Annulée":
        return <XCircle size={18} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Livrée":
        return "bg-green-50 text-green-700";
      case "En cours":
        return "bg-blue-50 text-blue-700";
      case "Expédiée":
        return "bg-purple-50 text-purple-700";
      case "En attente":
        return "bg-yellow-50 text-yellow-700";
      case "Annulée":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "Tous" || order.statut === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const statusOptions = ["Tous", "En attente", "En cours", "Expédiée", "Livrée", "Annulée"];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-pink-deep mb-2">Gestion des commandes</h1>
        <p className="text-muted-foreground">Suivez et gérez toutes vos commandes</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par N°, client, email..."
              className="w-full pl-12 pr-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === "Tous" ? "Tous les statuts" : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20">
        <div className="p-6 border-b border-pink-soft/20">
          <h2 className="text-xl font-serif text-pink-deep">Toutes les commandes ({filteredOrders.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-pink-blush/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  N° Commande
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Wilaya
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Commune
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Livraison
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-soft/20">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-muted-foreground">
                    Chargement des commandes...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-muted-foreground">
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-pink-blush/10 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{order.client}</div>
                      <div className="text-xs text-muted-foreground">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {order.wilaya}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {order.commune}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {order.total.toLocaleString()} DA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {order.livraison}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.statut)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.statut)}`}>
                        {order.statut}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 text-pink-deep hover:bg-pink-blush px-3 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Eye size={18} />
                      Voir
                    </button>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-pink-soft/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif text-pink-deep">Détails de la commande</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-muted-foreground hover:text-pink-deep transition-colors duration-200"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Informations commande</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">N° Commande</p>
                    <p className="font-medium">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Statut</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.statut)}`}>
                      {selectedOrder.statut}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Mode de livraison</p>
                    <p className="font-medium">{selectedOrder.livraison}</p>
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Informations client</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Nom</p>
                    <p className="font-medium">{selectedOrder.client}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Adresse</p>
                    <p className="font-medium">{selectedOrder.adresse}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.commune}, {selectedOrder.wilaya}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Produits</h3>
                <div className="space-y-3">
                  {selectedOrder.produits.map((produit, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-pink-blush/20 rounded-lg">
                      <div>
                        <p className="font-medium">{produit.name}</p>
                        <p className="text-sm text-muted-foreground">Quantité: {produit.quantity}</p>
                      </div>
                      <p className="font-medium">{(produit.price * produit.quantity).toLocaleString()} DA</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-pink-soft/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-serif text-pink-deep">Total</span>
                  <span className="text-2xl font-bold text-pink-deep">{selectedOrder.total.toLocaleString()} DA</span>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Modifier le statut
                </label>
                <select
                  value={selectedOrder.statut}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as Order['statut'])}
                  className="w-full px-4 py-3 border border-pink-soft/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-deep/30 transition-all duration-300"
                >
                  <option value="En attente">En attente</option>
                  <option value="En cours">En cours</option>
                  <option value="Expédiée">Expédiée</option>
                  <option value="Livrée">Livrée</option>
                  <option value="Annulée">Annulée</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-foreground rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
