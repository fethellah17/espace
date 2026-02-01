import { useState } from "react";
import { User, Package, MapPin, Settings, LogOut } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        <h1 className="mb-12 text-5xl md:text-6xl font-serif font-light text-pink-deep tracking-tight">My Account</h1>
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-soft sticky top-28 h-fit">
              <div className="space-y-2 mb-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-pink-deep text-cream"
                          : "text-muted-foreground hover:bg-pink-blush hover:text-pink-deep"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                      <span className="font-medium text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="border-t border-pink-soft/30 pt-4">
                <button className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left text-muted-foreground hover:bg-pink-blush hover:text-pink-deep transition-all duration-300">
                  <LogOut size={18} strokeWidth={1.5} />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="rounded-2xl bg-white p-8 shadow-soft">
                <h2 className="mb-8 text-3xl font-serif font-light text-pink-deep">Profile Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                      className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-pink-deep">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="w-full rounded-lg border border-pink-soft/40 bg-white px-5 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-deep/30 focus:border-transparent transition-all duration-300 font-light"
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="rounded-lg bg-pink-deep text-cream px-8 py-3 font-medium text-sm hover:bg-pink-medium transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="rounded-2xl bg-white p-8 shadow-soft">
                <h2 className="mb-8 text-3xl font-serif font-light text-pink-deep">Order History</h2>
                <div className="space-y-4">
                  {[1, 2].map((order) => (
                    <div key={order} className="rounded-lg border border-pink-soft/30 p-6 hover:shadow-soft transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-serif font-light text-pink-deep text-lg mb-1">Order #{1000 + order}</p>
                          <p className="text-sm text-muted-foreground font-light">Jan {order}, 2026</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif font-light text-pink-deep text-lg mb-1">{(100 * order)} DA</p>
                          <p className="text-sm text-rose-gold font-medium">Delivered</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="rounded-2xl bg-white p-8 shadow-soft">
                <h2 className="mb-8 text-3xl font-serif font-light text-pink-deep">Saved Addresses</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border border-pink-soft/30 p-6">
                    <p className="font-serif font-light text-pink-deep text-lg mb-2">Home</p>
                    <p className="text-sm text-muted-foreground font-light">123 Main St, City, State 12345</p>
                  </div>
                  <button className="rounded-lg border border-pink-soft/40 text-pink-deep px-6 py-3 font-medium text-sm hover:bg-pink-blush transition-all duration-300">
                    + Add New Address
                  </button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="rounded-2xl bg-white p-8 shadow-soft">
                <h2 className="mb-8 text-3xl font-serif font-light text-pink-deep">Settings</h2>
                <div className="space-y-6">
                  {[
                    { label: "Email Notifications", defaultChecked: true },
                    { label: "SMS Notifications", defaultChecked: false },
                    { label: "Newsletter", defaultChecked: true },
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between pb-6 border-b border-pink-soft/30 last:border-b-0 last:pb-0">
                      <span className="text-muted-foreground font-light">{setting.label}</span>
                      <input type="checkbox" defaultChecked={setting.defaultChecked} className="h-5 w-5 accent-pink-deep cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
