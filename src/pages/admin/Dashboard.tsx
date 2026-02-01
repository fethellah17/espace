import { useEffect, useState } from "react";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Order } from "@/lib/supabase";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    ordersCount: 0,
    productsCount: 0,
    customersCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch orders for statistics
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch products count
      const { count: productsCount, error: productsError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      if (productsError) throw productsError;

      // Calculate statistics
      const totalSales = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      const ordersCount = orders?.length || 0;
      
      // Count unique customers (by email)
      const uniqueCustomers = new Set(orders?.map((order) => order.customer_email) || []);
      const customersCount = uniqueCustomers.size;

      setStats({
        totalSales,
        ordersCount,
        productsCount: productsCount || 0,
        customersCount,
      });

      // Set recent orders (last 5)
      setRecentOrders(orders?.slice(0, 5) || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      label: "Total des ventes",
      value: loading ? "Chargement..." : `${stats.totalSales.toLocaleString()} DA`,
      change: "+12.5%",
      icon: TrendingUp,
      color: "pink",
    },
    {
      label: "Commandes",
      value: loading ? "Chargement..." : stats.ordersCount.toString(),
      change: "+8.2%",
      icon: ShoppingCart,
      color: "blue",
    },
    {
      label: "Produits",
      value: loading ? "Chargement..." : stats.productsCount.toString(),
      change: "+3",
      icon: Package,
      color: "green",
    },
    {
      label: "Clients",
      value: loading ? "Chargement..." : stats.customersCount.toString(),
      change: "+23",
      icon: Users,
      color: "purple",
    },
  ];

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "delivered":
        return "bg-green-50 text-green-700";
      case "in_transit":
        return "bg-blue-50 text-blue-700";
      case "pending":
        return "bg-yellow-50 text-yellow-700";
      case "cancelled":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case "delivered":
        return "Livrée";
      case "in_transit":
        return "En cours";
      case "pending":
        return "En attente";
      case "cancelled":
        return "Annulée";
      default:
        return statut;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-pink-deep mb-2">Tableau de bord</h1>
        <p className="text-muted-foreground">Aperçu de votre activité</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 shadow-soft border border-pink-soft/20 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-pink-blush">
                  <Icon size={24} className="text-pink-deep" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-soft border border-pink-soft/20">
        <div className="p-6 border-b border-pink-soft/20">
          <h2 className="text-xl font-serif text-pink-deep">Commandes récentes</h2>
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
                  Montant
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-soft/20">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Chargement des commandes...
                  </td>
                </tr>
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Aucune commande récente
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-pink-blush/10 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {order.order_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {order.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-medium">
                      {order.total_amount} DA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.statut)}`}>
                        {getStatusLabel(order.statut)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(order.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
