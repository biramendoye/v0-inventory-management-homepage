"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "MacBook Air M2",
    sku: "MBA-M2-256",
    category: "electronics",
    quantity: 15,
    minStock: 5,
    status: "inStock",
    price: 1299,
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    sku: "IP15P-128",
    category: "electronics",
    quantity: 3,
    minStock: 10,
    status: "lowStock",
    price: 1199,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24",
    sku: "SGS24-256",
    category: "electronics",
    quantity: 0,
    minStock: 5,
    status: "outOfStock",
    price: 899,
  },
  {
    id: 4,
    name: "Dell XPS 13",
    sku: "DXP13-512",
    category: "electronics",
    quantity: 8,
    minStock: 3,
    status: "inStock",
    price: 1599,
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    sku: "IPP129-256",
    category: "electronics",
    quantity: 12,
    minStock: 4,
    status: "inStock",
    price: 1099,
  },
]

export function ProductsContent() {
  const { t } = useLanguage()
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    minStock: 0,
    price: 0,
  })

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "inStock":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            {t("products.inStock")}
          </Badge>
        )
      case "lowStock":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {t("products.lowStock")}
          </Badge>
        )
      case "outOfStock":
        return <Badge variant="destructive">{t("products.outOfStock")}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku || !newProduct.category) {
      alert(t("forms.validation.required"))
      return
    }

    const status =
      newProduct.quantity === 0 ? "outOfStock" : newProduct.quantity <= newProduct.minStock ? "lowStock" : "inStock"

    const productToAdd = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      ...newProduct,
      status,
    }

    setProducts([...products, productToAdd])
    setNewProduct({
      name: "",
      sku: "",
      category: "",
      quantity: 0,
      minStock: 0,
      price: 0,
    })
    setIsAddDialogOpen(false)
  }

  const handleDialogClose = (open: boolean) => {
    setIsAddDialogOpen(open)
    if (!open) {
      setNewProduct({
        name: "",
        sku: "",
        category: "",
        quantity: 0,
        minStock: 0,
        price: 0,
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("products.title")}</h1>
          <p className="text-muted-foreground">
            {t("products.title") === "Product Management"
              ? "Manage your product inventory"
              : "Gérez votre inventaire de produits"}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("products.addProduct")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[85vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>{t("products.addProduct")}</DialogTitle>
              <DialogDescription>
                {t("products.addProduct") === "Add Product"
                  ? "Fill in the product information below."
                  : "Remplissez les informations du produit ci-dessous."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {t("common.name")} *
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sku" className="text-right">
                  {t("products.sku")} *
                </Label>
                <Input
                  id="sku"
                  className="col-span-3"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  {t("products.category")} *
                </Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue
                      placeholder={
                        t("products.category") === "Category" ? "Select a category" : "Sélectionner une catégorie"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">{t("products.categories.electronics")}</SelectItem>
                    <SelectItem value="clothing">{t("products.categories.clothing")}</SelectItem>
                    <SelectItem value="books">{t("products.categories.books")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  {t("common.quantity")}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  className="col-span-3"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minStock" className="text-right">
                  {t("products.minimumStock")}
                </Label>
                <Input
                  id="minStock"
                  type="number"
                  className="col-span-3"
                  value={newProduct.minStock}
                  onChange={(e) => setNewProduct({ ...newProduct, minStock: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  {t("common.price")} (€)
                </Label>
                <Input
                  id="price"
                  type="number"
                  className="col-span-3"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddProduct}>
                {t("products.addProduct")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t("common.search")} {t("common.filter") === "Filter" ? "and Filters" : "et Filtres"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={
                    t("common.search") === "Search" ? "Search by name or SKU..." : "Rechercher par nom ou SKU..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("products.category")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("products.category") === "Category" ? "All categories" : "Toutes les catégories"}
                </SelectItem>
                <SelectItem value="electronics">{t("products.categories.electronics")}</SelectItem>
                <SelectItem value="clothing">{t("products.categories.clothing")}</SelectItem>
                <SelectItem value="books">{t("products.categories.books")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("common.status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("common.status") === "Status" ? "All statuses" : "Tous les statuts"}
                </SelectItem>
                <SelectItem value="inStock">{t("products.inStock")}</SelectItem>
                <SelectItem value="lowStock">{t("products.lowStock")}</SelectItem>
                <SelectItem value="outOfStock">{t("products.outOfStock")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("products.title") === "Product Management" ? "Product List" : "Liste des Produits"}</CardTitle>
          <CardDescription>
            {filteredProducts.length}{" "}
            {t("products.title") === "Product Management" ? "product(s) found" : "produit(s) trouvé(s)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("products.productName")}</TableHead>
                <TableHead>{t("products.sku")}</TableHead>
                <TableHead>{t("products.category")}</TableHead>
                <TableHead>{t("common.quantity")}</TableHead>
                <TableHead>{t("products.minimumStock")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
                <TableHead>{t("common.price")}</TableHead>
                <TableHead>{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{t(`products.categories.${product.category}`)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.minStock}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>{product.price}€</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
