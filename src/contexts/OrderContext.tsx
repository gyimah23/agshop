import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export interface OrderTrackingEvent {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  sellerId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  totalPrice: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  trackingNumber?: string;
  trackingEvents: OrderTrackingEvent[];
  createdAt: string;
  estimatedDelivery?: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Omit<Order, "id" | "trackingEvents">) => Promise<void>;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (orderId: string, newStatus: Order["status"]) => Promise<void>;
  addTrackingEvent: (orderId: string, event: Omit<OrderTrackingEvent, "id">) => Promise<void>;
  getUserOrders: (userId: string) => Order[];
  getSellerOrders: (sellerId: string) => Order[];
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = async (orderData: Omit<Order, "id" | "trackingEvents">) => {
    try {
      setLoading(true);
      const newOrder: Order = {
        ...orderData,
        id: `order_${Date.now()}`,
        trackingEvents: [
          {
            id: `event_${Date.now()}`,
            status: "Order Placed",
            location: "Online",
            timestamp: new Date().toISOString(),
            notes: "Your order has been placed successfully"
          }
        ]
      };

      setOrders((prev) => [newOrder, ...prev]);
      toast.success(`Order ${newOrder.orderNumber} created successfully`);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find((order) => order.id === id);
  };

  const updateOrderStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ): Promise<void> => {
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
      throw error;
    }
  };

  const addTrackingEvent = async (
    orderId: string,
    event: Omit<OrderTrackingEvent, "id">
  ): Promise<void> => {
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                trackingEvents: [
                  {
                    id: `event_${Date.now()}`,
                    ...event
                  },
                  ...order.trackingEvents
                ]
              }
            : order
        )
      );
      
      // Create and dispatch notification
      const foundOrder = orders.find(o => o.id === orderId);
      if (foundOrder) {
        const notificationEvent = new CustomEvent("orderTrackingUpdated", {
          detail: {
            orderId,
            orderNumber: foundOrder.orderNumber,
            status: event.status,
            location: event.location,
            notes: event.notes
          }
        });
        window.dispatchEvent(notificationEvent);
      }
      
      toast.success("Tracking event added successfully");
    } catch (error) {
      console.error("Error adding tracking event:", error);
      toast.error("Failed to add tracking event");
      throw error;
    }
  };

  const getUserOrders = (userId: string): Order[] => {
    return orders.filter((order) => order.userId === userId);
  };

  const getSellerOrders = (sellerId: string): Order[] => {
    return orders.filter((order) => order.sellerId === sellerId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
        addTrackingEvent,
        getUserOrders,
        getSellerOrders,
        loading
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
