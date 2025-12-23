import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrders, Order } from "@/contexts/OrderContext";
import { toast } from "sonner";

interface SellerOrdersManagerProps {
  sellerId: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  shipped: Truck,
  delivered: Package,
  cancelled: AlertCircle,
};

export const SellerOrdersManager = ({ sellerId }: SellerOrdersManagerProps) => {
  const { getSellerOrders, updateOrderStatus, addTrackingEvent } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);
  const [trackingForm, setTrackingForm] = useState({
    status: "",
    location: "",
    notes: "",
  });

  const orders = getSellerOrders(sellerId);

  const handleStatusUpdate = async (order: Order, newStatus: Order["status"]) => {
    try {
      await updateOrderStatus(order.id, newStatus);
      setSelectedOrder(null);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAddTrackingEvent = async () => {
    if (!selectedOrder || !trackingForm.status || !trackingForm.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addTrackingEvent(selectedOrder.id, {
        status: trackingForm.status,
        location: trackingForm.location,
        notes: trackingForm.notes || undefined,
        timestamp: new Date().toISOString(),
      });

      setTrackingForm({ status: "", location: "", notes: "" });
      setTrackingDialogOpen(false);
      toast.success("Tracking event added! Customer will be notified.");
    } catch (error) {
      console.error("Error adding tracking event:", error);
    }
  };

  const getStatusStats = () => {
    return {
      pending: orders.filter((o) => o.status === "pending").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Pending", count: stats.pending, color: "text-yellow-600" },
          { label: "Confirmed", count: stats.confirmed, color: "text-blue-600" },
          { label: "Shipped", count: stats.shipped, color: "text-purple-600" },
          { label: "Delivered", count: stats.delivered, color: "text-green-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Customer Orders</h2>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground">
                When customers place orders, they will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const StatusIcon = statusIcons[order.status];
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-semibold text-foreground">
                              Order {order.orderNumber}
                            </h3>
                            <Badge className={statusColors[order.status]}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <p className="text-muted-foreground">Customer</p>
                              <p className="font-medium">
                                {order.shippingAddress.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Total</p>
                              <p className="font-medium">
                                ₹{order.totalPrice.toLocaleString("en-IN")}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Items</p>
                              <p className="font-medium">
                                {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Ordered</p>
                              <p className="font-medium">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {/* Items Preview */}
                          <div className="bg-muted/50 rounded p-3 mb-4">
                            <p className="text-sm font-medium mb-2">Items:</p>
                            <div className="space-y-1">
                              {order.items.map((item) => (
                                <p key={item.id} className="text-sm text-muted-foreground">
                                  {item.name} x {item.quantity} - ₹
                                  {(item.price * item.quantity).toLocaleString("en-IN")}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Shipping Address */}
                          <div className="bg-muted/50 rounded p-3 mb-4">
                            <p className="text-sm font-medium mb-2">Shipping Address:</p>
                            <p className="text-sm text-muted-foreground">
                              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                              {order.shippingAddress.pincode}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Phone: {order.shippingAddress.phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 sm:flex-col">
                          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Details
                              </Button>
                            </DialogTrigger>
                            {selectedOrder?.id === order.id && (
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Order {order.orderNumber}</DialogTitle>
                                </DialogHeader>

                                <div className="space-y-6">
                                  {/* Update Status */}
                                  <div className="space-y-2">
                                    <Label>Update Order Status</Label>
                                    <div className="flex gap-2">
                                      <Select
                                        defaultValue={order.status}
                                        onValueChange={(value) => {
                                          handleStatusUpdate(
                                            order,
                                            value as Order["status"]
                                          );
                                        }}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="confirmed">Confirmed</SelectItem>
                                          <SelectItem value="shipped">Shipped</SelectItem>
                                          <SelectItem value="delivered">Delivered</SelectItem>
                                          <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  {/* Tracking History */}
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <Label>Tracking History</Label>
                                      <Dialog
                                        open={trackingDialogOpen}
                                        onOpenChange={setTrackingDialogOpen}
                                      >
                                        <DialogTrigger asChild>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setSelectedOrder(order)}
                                          >
                                            <Plus className="h-3 w-3 mr-1" />
                                            Add Update
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Add Tracking Update</DialogTitle>
                                          </DialogHeader>
                                          <div className="space-y-4">
                                            <div className="space-y-2">
                                              <Label htmlFor="status">Status *</Label>
                                              <Input
                                                id="status"
                                                placeholder="e.g., Out for Delivery"
                                                value={trackingForm.status}
                                                onChange={(e) =>
                                                  setTrackingForm((prev) => ({
                                                    ...prev,
                                                    status: e.target.value,
                                                  }))
                                                }
                                              />
                                            </div>

                                            <div className="space-y-2">
                                              <Label htmlFor="location">Location *</Label>
                                              <Input
                                                id="location"
                                                placeholder="e.g., Mumbai Distribution Center"
                                                value={trackingForm.location}
                                                onChange={(e) =>
                                                  setTrackingForm((prev) => ({
                                                    ...prev,
                                                    location: e.target.value,
                                                  }))
                                                }
                                              />
                                            </div>

                                            <div className="space-y-2">
                                              <Label htmlFor="notes">Notes</Label>
                                              <Textarea
                                                id="notes"
                                                placeholder="Optional notes about this update..."
                                                rows={3}
                                                value={trackingForm.notes}
                                                onChange={(e) =>
                                                  setTrackingForm((prev) => ({
                                                    ...prev,
                                                    notes: e.target.value,
                                                  }))
                                                }
                                              />
                                            </div>

                                            <Button
                                              onClick={handleAddTrackingEvent}
                                              className="w-full"
                                            >
                                              Add Update
                                            </Button>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </div>

                                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                      {order.trackingEvents.map((event, idx) => (
                                        <div
                                          key={event.id}
                                          className="border-l-2 border-primary pl-3 pb-3"
                                        >
                                          <p className="font-medium text-sm">
                                            {event.status}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {event.location}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {new Date(event.timestamp).toLocaleString()}
                                          </p>
                                          {event.notes && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                              {event.notes}
                                            </p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            )}
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrdersManager;
