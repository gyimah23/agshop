import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { 
  Package, 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2, 
  Upload, 
  X,
  IndianRupee,
  LayoutDashboard,
  ShoppingBag,
  TrendingUp,
  Search
} from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SellerOrdersManager from "@/components/seller/SellerOrdersManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { categories, brands, products as mockProducts } from "@/data/products";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  brand: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  description: string | null;
  specifications: unknown;
  features: string[];
  tags: string[];
  in_stock: boolean;
  created_at: string;
}

const SellerDashboard = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showMockData, setShowMockData] = useState(false);

  // Check if user has seller role
  const isSeller = user?.publicMetadata?.role === "seller" || 
                   user?.unsafeMetadata?.role === "seller";

  useEffect(() => {
    if (isSignedIn && user && isSeller) {
      fetchProducts();
    }
  }, [isSignedIn, user, isSeller]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Try to fetch from database
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Database fetch failed, using mock data:", error);
        // Use mock data from products.ts if database is unavailable
        const convertedProducts = mockProducts.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          subcategory: p.subcategory || null,
          brand: p.brand || null,
          price: p.price,
          original_price: p.originalPrice || null,
          image_url: p.image || null,
          description: p.description || null,
          specifications: p.specifications || {},
          features: p.features || [],
          tags: p.tags || [],
          in_stock: p.inStock ?? true,
          created_at: new Date().toISOString(),
        } as unknown as Product));
        setProducts(convertedProducts);
        setShowMockData(true);
      } else if (data && data.length > 0) {
        setProducts(data as Product[]);
        setShowMockData(false);
      } else {
        // No products in database, show mock data
        const convertedProducts = mockProducts.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          subcategory: p.subcategory || null,
          brand: p.brand || null,
          price: p.price,
          original_price: p.originalPrice || null,
          image_url: p.image || null,
          description: p.description || null,
          specifications: p.specifications || {},
          features: p.features || [],
          tags: p.tags || [],
          in_stock: p.inStock ?? true,
          created_at: new Date().toISOString(),
        } as unknown as Product));
        setProducts(convertedProducts);
        setShowMockData(true);
        toast.info("Showing sample products. Add your own products to get started!");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to mock data
      const convertedProducts = mockProducts.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        subcategory: p.subcategory || null,
        brand: p.brand || null,
        price: p.price,
        original_price: p.originalPrice || null,
        image_url: p.image || null,
        description: p.description || null,
        specifications: p.specifications || {},
        features: p.features || [],
        tags: p.tags || [],
        in_stock: p.inStock ?? true,
        created_at: new Date().toISOString(),
      } as unknown as Product));
      setProducts(convertedProducts);
      setShowMockData(true);
      toast.info("Using sample products data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    const formData = new FormData(e.currentTarget);
    
    let imageUrl = editingProduct?.image_url || null;
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const featuresStr = formData.get("features") as string;
    const tagsStr = formData.get("tags") as string;
    const specificationsStr = formData.get("specifications") as string;

    let specifications = {};
    try {
      if (specificationsStr) {
        specifications = JSON.parse(specificationsStr);
      }
    } catch {
      // If not valid JSON, try to parse as key:value pairs
      specifications = specificationsStr.split("\n").reduce((acc, line) => {
        const [key, value] = line.split(":").map(s => s.trim());
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
    }

    const productData = {
      seller_id: user.id,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      subcategory: formData.get("subcategory") as string || null,
      brand: formData.get("brand") as string || null,
      price: parseFloat(formData.get("price") as string),
      original_price: formData.get("original_price") ? parseFloat(formData.get("original_price") as string) : null,
      image_url: imageUrl,
      description: formData.get("description") as string || null,
      specifications,
      features: featuresStr ? featuresStr.split(",").map(f => f.trim()) : [],
      tags: tagsStr ? tagsStr.split(",").map(t => t.trim()) : [],
      in_stock: formData.get("in_stock") === "on"
    };

    try {
      if (editingProduct) {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update_product`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({
              id: editingProduct.id,
              productData,
            }),
          }
        );

        const result = await response.json();
        if (!response.ok || result.error) {
          throw new Error(result.error || "Failed to update product");
        }
        toast.success("Product updated successfully");
      } else {
        const { error } = await supabase
          .from("products")
          .insert(productData);
        if (error) throw error;
        toast.success("Product added successfully");
      }
      
      setDialogOpen(false);
      setEditingProduct(null);
      setImageFile(null);
      setImagePreview(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    if (!user) return toast.error("You must be signed in to delete a product");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete_product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ id }),
        }
      );

      const result = await response.json();
      if (!response.ok || result.error) {
        throw new Error(result.error || "Failed to delete product");
      }
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setImagePreview(product.image_url);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview(null);
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

  if (!isSeller) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-4">
            <CardContent className="flex flex-col items-center py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-heading font-bold mb-2">Seller Access Required</h2>
              <p className="text-muted-foreground mb-6">
                You need seller permissions to access this dashboard. 
                Contact the administrator to get seller access.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                To become a seller, the admin needs to add <code className="bg-muted px-2 py-1 rounded">role: seller</code> to your user metadata in the Clerk dashboard.
              </p>
              <Button asChild>
                <Link to="/">Back to Store</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedCategory = categories.find(c => c.id === editingProduct?.category);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-3 mb-2">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                Seller Dashboard
              </h1>
              <p className="text-muted-foreground">Manage your products, inventory, and customer orders</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="products" className="space-y-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Products Management</h2>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={(open) => {
                    if (!open) closeDialog();
                    else setDialogOpen(true);
                  }}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingProduct(null)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label>Product Image</Label>
                      <div className="flex items-center gap-4">
                        {imagePreview ? (
                          <div className="relative">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="h-24 w-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImageFile(null);
                                setImagePreview(null);
                              }}
                              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="h-24 w-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageChange}
                            />
                          </label>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Upload a product image (JPG, PNG, WebP)
                        </p>
                      </div>
                    </div>

                    {/* Product Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        defaultValue={editingProduct?.name}
                        required 
                      />
                    </div>

                    {/* Category & Subcategory */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select name="category" defaultValue={editingProduct?.category} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subcategory">Subcategory</Label>
                        <Input 
                          id="subcategory" 
                          name="subcategory" 
                          defaultValue={editingProduct?.subcategory || ""}
                          placeholder="e.g., LED Bulbs"
                        />
                      </div>
                    </div>

                    {/* Brand */}
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Select name="brand" defaultValue={editingProduct?.brand || undefined}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹) *</Label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="price" 
                            name="price" 
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-9"
                            defaultValue={editingProduct?.price}
                            required 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="original_price">Original Price (₹)</Label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="original_price" 
                            name="original_price" 
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-9"
                            defaultValue={editingProduct?.original_price || ""}
                            placeholder="For discounted items"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        rows={3}
                        defaultValue={editingProduct?.description || ""}
                        placeholder="Product description..."
                      />
                    </div>

                    {/* Specifications */}
                    <div className="space-y-2">
                      <Label htmlFor="specifications">Specifications</Label>
                      <Textarea 
                        id="specifications" 
                        name="specifications" 
                        rows={3}
                        defaultValue={editingProduct?.specifications && typeof editingProduct.specifications === 'object' ? 
                          Object.entries(editingProduct.specifications as Record<string, string>)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join("\n") : ""
                        }
                        placeholder="Size: 2.5 sq.mm&#10;Voltage: 1100V&#10;Color: Red"
                      />
                      <p className="text-xs text-muted-foreground">One specification per line (Key: Value)</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <Label htmlFor="features">Features</Label>
                      <Input 
                        id="features" 
                        name="features" 
                        defaultValue={editingProduct?.features?.join(", ") || ""}
                        placeholder="Flame Retardant, ISI Certified, High Conductivity"
                      />
                      <p className="text-xs text-muted-foreground">Comma-separated list</p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input 
                        id="tags" 
                        name="tags" 
                        defaultValue={editingProduct?.tags?.join(", ") || ""}
                        placeholder="bestseller, new-arrival, eco-friendly"
                      />
                      <p className="text-xs text-muted-foreground">Comma-separated list</p>
                    </div>

                    {/* In Stock */}
                    <div className="flex items-center gap-3">
                      <Switch 
                        id="in_stock" 
                        name="in_stock" 
                        defaultChecked={editingProduct?.in_stock ?? true}
                      />
                      <Label htmlFor="in_stock">In Stock</Label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={closeDialog}>
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1" disabled={saving}>
                        {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        {editingProduct ? "Update Product" : "Add Product"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{products.length}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    In Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold">
                      {products.filter(p => p.in_stock).length}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Out of Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-red-500" />
                    <span className="text-2xl font-bold">
                      {products.filter(p => !p.in_stock).length}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">
                      {new Set(products.map(p => p.category)).size}
                    </span>
                  </div>
                </CardContent>
              </Card>
                </div>

                {/* Products Grid */}
                <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <h2 className="text-xl font-semibold">Your Products</h2>
                <div className="w-full sm:w-64 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : products.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No products yet</h3>
                    <p className="text-muted-foreground mb-4">Start by adding your first product</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {showMockData && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="py-3">
                        <p className="text-sm text-blue-700">
                          ℹ️ Showing sample products. <strong>Click "Add Product" to add your own products or Edit/Delete to manage them.</strong>
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products
                      .filter(product => 
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square relative bg-muted">
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        {!product.in_stock && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-primary">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          {product.original_price && (
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{product.original_price.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit2 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    ))}
                  </div>
                </>
              )}
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-8">
                {user && <SellerOrdersManager sellerId={user.id} />}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
