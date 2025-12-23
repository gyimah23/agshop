import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Package, MapPin, User, Plus, Trash2, Edit2, Loader2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Address {
  id: string;
  label: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  items: unknown[];
  created_at: string;
}

const AccountPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchData();
    }
  }, [isSignedIn, user]);

  const fetchData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [addressesRes, ordersRes] = await Promise.all([
        supabase.from("addresses").select("*").eq("user_id", user.id).order("is_default", { ascending: false }),
        supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      ]);

      if (addressesRes.data) setAddresses(addressesRes.data);
      if (ordersRes.data) {
        setOrders(ordersRes.data.map(o => ({
          ...o,
          items: Array.isArray(o.items) ? o.items : []
        })));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const addressData = {
      user_id: user.id,
      label: formData.get("label") as string,
      full_name: formData.get("full_name") as string,
      phone: formData.get("phone") as string,
      address_line1: formData.get("address_line1") as string,
      address_line2: formData.get("address_line2") as string || null,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postal_code: formData.get("postal_code") as string,
      country: "India",
      is_default: addresses.length === 0
    };

    try {
      if (editingAddress) {
        await supabase.from("addresses").update(addressData).eq("id", editingAddress.id);
        toast.success("Address updated");
      } else {
        await supabase.from("addresses").insert(addressData);
        toast.success("Address added");
      }
      setAddressDialogOpen(false);
      setEditingAddress(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to save address");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await supabase.from("addresses").delete().eq("id", id);
      toast.success("Address deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered": return "bg-green-500/10 text-green-500";
      case "shipped": return "bg-blue-500/10 text-blue-500";
      case "processing": return "bg-yellow-500/10 text-yellow-500";
      case "cancelled": return "bg-red-500/10 text-red-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-8">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-16 w-16"
                  }
                }}
              />
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="orders" className="gap-2">
                  <Package className="h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="addresses" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Order History</h2>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : orders.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                      <Button asChild>
                        <Link to="/">Browse Products</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Order #{order.order_number}</CardTitle>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              {(order.items as any[])?.length || 0} items
                            </span>
                            <span className="text-lg font-bold text-primary">
                              ₹{order.total_amount.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Saved Addresses</h2>
                  <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingAddress(null)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {editingAddress ? "Edit Address" : "Add New Address"}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSaveAddress} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="label">Label</Label>
                            <Input 
                              id="label" 
                              name="label" 
                              placeholder="Home, Office..." 
                              defaultValue={editingAddress?.label}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input 
                              id="full_name" 
                              name="full_name" 
                              defaultValue={editingAddress?.full_name}
                              required 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            type="tel" 
                            defaultValue={editingAddress?.phone}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address_line1">Address Line 1</Label>
                          <Input 
                            id="address_line1" 
                            name="address_line1" 
                            defaultValue={editingAddress?.address_line1}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address_line2">Address Line 2</Label>
                          <Input 
                            id="address_line2" 
                            name="address_line2" 
                            defaultValue={editingAddress?.address_line2 || ""}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              name="city" 
                              defaultValue={editingAddress?.city}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input 
                              id="state" 
                              name="state" 
                              defaultValue={editingAddress?.state}
                              required 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postal_code">Postal Code</Label>
                          <Input 
                            id="postal_code" 
                            name="postal_code" 
                            defaultValue={editingAddress?.postal_code}
                            required 
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          {editingAddress ? "Update Address" : "Save Address"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : addresses.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No saved addresses</h3>
                      <p className="text-muted-foreground">Add an address for faster checkout</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {addresses.map((address) => (
                      <Card key={address.id} className={address.is_default ? "border-primary" : ""}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                              {address.label}
                              {address.is_default && (
                                <Badge variant="secondary" className="text-xs">Default</Badge>
                              )}
                            </CardTitle>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => {
                                  setEditingAddress(address);
                                  setAddressDialogOpen(true);
                                }}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          <p className="font-medium text-foreground">{address.full_name}</p>
                          <p>{address.phone}</p>
                          <p>{address.address_line1}</p>
                          {address.address_line2 && <p>{address.address_line2}</p>}
                          <p>{address.city}, {address.state} {address.postal_code}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "h-20 w-20"
                          }
                        }}
                      />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Click on your avatar to manage your profile, security settings, and more.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountPage;
