import productCable from "@/assets/product-cable.jpg";
import productSocket from "@/assets/product-socket.jpg";
import productLed from "@/assets/product-led.jpg";
import productMcb from "@/assets/product-mcb.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  specifications: Record<string, string>;
  description: string;
  features: string[];
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "cables-wires",
    name: "Cables & Wires",
    icon: "Cable",
    description: "Premium quality electrical cables and wires for all applications",
    subcategories: ["Power Cables", "Control Cables", "Coaxial Cables", "Flexible Wires", "Armoured Cables"],
    productCount: 1250
  },
  {
    id: "sockets",
    name: "Sockets",
    icon: "Plug",
    description: "Durable sockets with superior connectivity",
    subcategories: ["5A Sockets", "15A Sockets", "16A Sockets", "USB Sockets", "Weatherproof"],
    productCount: 320
  },
  {
    id: "switches",
    name: "Switches",
    icon: "ToggleRight",
    description: "Modern switches for residential and commercial use",
    subcategories: ["Modular Switches", "Rocker Switches", "Smart Switches", "Dimmer Switches"],
    productCount: 480
  },
  {
    id: "lighting",
    name: "Lighting",
    icon: "Lightbulb",
    description: "Energy-efficient LED lighting solutions",
    subcategories: ["LED Bulbs", "Tube Lights", "Downlights", "Panel Lights", "Emergency Lights"],
    productCount: 890
  },
  {
    id: "circuit-protection",
    name: "Circuit Protection",
    icon: "ShieldCheck",
    description: "Reliable circuit protection devices",
    subcategories: ["MCB", "RCCB", "Isolators", "Surge Protectors", "Distribution Boards"],
    productCount: 540
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "Wrench",
    description: "Essential electrical accessories and tools",
    subcategories: ["Conduits", "Junction Boxes", "DB Boards", "Cable Ties", "Tapes"],
    productCount: 720
  }
];

export const brands = [
  "Polycab",
  "Finolex",
  "Havells",
  "RR Kabel",
  "Anchor",
  "Legrand",
  "Schneider",
  "Wipro",
  "Philips",
  "Crompton",
  "Syska",
  "L&T"
];

export const products: Product[] = [
  {
    id: "1",
    name: "Polycab FR PVC Insulated Cable 2.5 sq.mm",
    category: "cables-wires",
    subcategory: "Flexible Wires",
    brand: "Polycab",
    price: 2450,
    originalPrice: 2800,
    image: productCable,
    rating: 4.8,
    reviews: 1250,
    inStock: true,
    specifications: {
      "Size": "2.5 sq.mm",
      "Length": "90 meters",
      "Voltage Rating": "1100V",
      "Current Rating": "21A",
      "Insulation": "FR PVC",
      "Conductor": "Electrolytic Copper"
    },
    description: "Premium quality flame retardant PVC insulated copper cable, ideal for residential and commercial wiring applications.",
    features: ["Flame Retardant", "High Conductivity", "ISI Certified", "90m Coil"],
    tags: ["bestseller", "fr-rated"]
  },
  {
    id: "2",
    name: "Havells 16A USB Socket with Switch",
    category: "sockets",
    subcategory: "USB Sockets",
    brand: "Havells",
    price: 685,
    image: productSocket,
    rating: 4.6,
    reviews: 892,
    inStock: true,
    specifications: {
      "Current Rating": "16A",
      "USB Ports": "2 x Type-A",
      "USB Output": "5V 2.1A",
      "Material": "Polycarbonate",
      "IP Rating": "IP20"
    },
    description: "Modern socket with integrated USB charging ports and individual switches for convenient device charging.",
    features: ["Dual USB Ports", "Individual Switch", "Surge Protected", "Child Safe Shutters"],
    tags: ["new-arrival"]
  },
  {
    id: "3",
    name: "Legrand Mylinc 6-Way Modular Switch",
    category: "switches",
    subcategory: "Modular Switches",
    brand: "Legrand",
    price: 1250,
    originalPrice: 1450,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 567,
    inStock: true,
    specifications: {
      "Ways": "6",
      "Current Rating": "10A",
      "Material": "Polycarbonate",
      "Color": "White",
      "Mounting": "Flush Mount"
    },
    description: "Premium modular switch plate with 6-way configuration for comprehensive room control.",
    features: ["Modular Design", "Easy Installation", "Durable Contacts", "Aesthetic Finish"],
    tags: ["popular"]
  },
  {
    id: "4",
    name: "Philips 15W LED Bulb - Cool Daylight",
    category: "lighting",
    subcategory: "LED Bulbs",
    brand: "Philips",
    price: 245,
    image: productLed,
    rating: 4.7,
    reviews: 2340,
    inStock: true,
    specifications: {
      "Wattage": "15W",
      "Lumens": "1521 lm",
      "Color Temperature": "6500K",
      "Base Type": "B22",
      "Lifespan": "15000 hours",
      "Energy Rating": "A+"
    },
    description: "Energy-efficient LED bulb with bright cool daylight output, perfect for homes and offices.",
    features: ["85% Energy Saving", "Instant Start", "No UV/IR", "Mercury Free"],
    tags: ["eco-friendly", "bestseller"]
  },
  {
    id: "5",
    name: "Schneider Acti9 32A MCB - C Curve",
    category: "circuit-protection",
    subcategory: "MCB",
    brand: "Schneider",
    price: 485,
    image: productMcb,
    rating: 4.9,
    reviews: 678,
    inStock: true,
    specifications: {
      "Current Rating": "32A",
      "Poles": "Single Pole",
      "Curve Type": "C",
      "Breaking Capacity": "10kA",
      "Standard": "IEC 60898"
    },
    description: "High-performance miniature circuit breaker for reliable overload and short circuit protection.",
    features: ["Trip Indication", "Quick Connect", "Compact Design", "DIN Rail Mount"],
    tags: ["industrial"]
  },
  {
    id: "6",
    name: "Finolex 4 sq.mm FRLS Cable - Red",
    category: "cables-wires",
    subcategory: "Flexible Wires",
    brand: "Finolex",
    price: 3850,
    originalPrice: 4200,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 945,
    inStock: true,
    specifications: {
      "Size": "4 sq.mm",
      "Length": "90 meters",
      "Voltage Rating": "1100V",
      "Current Rating": "31A",
      "Insulation": "FRLS",
      "Color": "Red"
    },
    description: "Fire retardant low smoke cable, ideal for power wiring in buildings requiring enhanced fire safety.",
    features: ["FRLS Rated", "Low Smoke Emission", "High Flexibility", "ISI Marked"],
    tags: ["fire-safety"]
  },
  {
    id: "7",
    name: "Anchor Roma 5A Twin Socket",
    category: "sockets",
    subcategory: "5A Sockets",
    brand: "Anchor",
    price: 185,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 1123,
    inStock: true,
    specifications: {
      "Current Rating": "5A",
      "Sockets": "2",
      "Material": "Urea",
      "Color": "White",
      "Mounting": "Surface Mount"
    },
    description: "Durable twin socket for light-duty electrical appliances with reliable connectivity.",
    features: ["Twin Socket", "Brass Contacts", "Fire Retardant", "Easy Mount"],
    tags: ["value"]
  },
  {
    id: "8",
    name: "Crompton 20W LED Panel Light - Square",
    category: "lighting",
    subcategory: "Panel Lights",
    brand: "Crompton",
    price: 890,
    originalPrice: 1050,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 567,
    inStock: true,
    specifications: {
      "Wattage": "20W",
      "Lumens": "1800 lm",
      "Size": "300x300mm",
      "Color Temperature": "4000K",
      "Mounting": "Recessed"
    },
    description: "Sleek square panel light with even light distribution for modern ceiling installations.",
    features: ["Slim Design", "Flicker Free", "Even Illumination", "Driver Included"],
    tags: ["modern"]
  }
];

export const featuredProducts = products.slice(0, 4);
export const newArrivals = products.filter(p => p.tags.includes("new-arrival") || p.tags.includes("modern"));
export const bestSellers = products.filter(p => p.tags.includes("bestseller") || p.rating >= 4.7);
