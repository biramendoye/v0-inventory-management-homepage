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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin, Package } from "lucide-react"

// Mock data for suppliers
const mockSuppliers = [
  {
    id: 1,
    name: "TechSupply Co.",
    contact: "Jean Martin",
    email: "jean.martin@techsupply.fr",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue de la Tech, 75001 Paris",
    productsSupplied: ["MacBook Air M2", 'iPad Pro 12.9"'],
    status: "Actif",
    rating: 4.8,
    totalOrders: 45,
  },
  {
    id: 2,
    name: "Mobile World SARL",
    contact: "Marie Dubois",
    email: "marie.dubois@mobileworld.fr",
    phone: "+33 1 34 56 78 90",
    address: "456 Avenue Mobile, 69002 Lyon",
    productsSupplied: ["iPhone 15 Pro", "Samsung Galaxy S24"],
    status: "Actif",
    rating: 4.5,
    totalOrders: 32,
  },
  {
    id: 3,
    name: "Computer Solutions",
    contact: "Pierre Leroy",
    email: "pierre.leroy@compsol.fr",
    phone: "+33 1 45 67 89 01",
    address: "789 Boulevard Tech, 13001 Marseille",
    productsSupplied: ["Dell XPS 13"],
    status: "Inactif",
    rating: 3.9,
    totalOrders: 18,
  },
  {
    id: 4,
    name: "Electronics Pro",
    contact: "Sophie Bernard",
    email: "sophie.bernard@elecpro.fr",
    phone: "+33 1 56 78 90 12",
    address: "321 Rue Electronics, 31000 Toulouse",
    productsSupplied: ["MacBook Air M2", "Dell XPS 13", 'iPad Pro 12.9"'],
    status: "Actif",
    rating: 4.9,
    totalOrders: 67,
  },
]

export function SuppliersContent() {
  const [suppliers, setSuppliers] = useState(mockSuppliers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Filter suppliers based on search and filters
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Actif":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Actif
          </Badge>
        )
      case "Inactif":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Inactif
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRatingStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter((s) => s.id !== id))
  }

  const handleViewDetails = (supplier: any) => {
    setSelectedSupplier(supplier)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Fournisseurs</h1>
          <p className="text-muted-foreground">Gérez vos partenaires et fournisseurs</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un Fournisseur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[85vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Ajouter un Nouveau Fournisseur</DialogTitle>
              <DialogDescription>Remplissez les informations du fournisseur ci-dessous.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplierName" className="text-right">
                  Nom
                </Label>
                <Input id="supplierName" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input id="contact" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Téléphone
                </Label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Adresse
                </Label>
                <Textarea id="address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Statut
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Ajouter le Fournisseur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Recherche et Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, contact ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Fournisseurs</CardTitle>
          <CardDescription>{filteredSuppliers.length} fournisseur(s) trouvé(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du Fournisseur</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Produits Fournis</TableHead>
                <TableHead>Évaluation</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      <span>{supplier.productsSupplied.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">{getRatingStars(supplier.rating)}</span>
                      <span className="text-sm text-muted-foreground">({supplier.rating})</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(supplier)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteSupplier(supplier.id)}>
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

      {/* Supplier Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Détails du Fournisseur</DialogTitle>
            <DialogDescription>Informations complètes sur {selectedSupplier?.name}</DialogDescription>
          </DialogHeader>
          {selectedSupplier && (
            <div className="grid gap-6 py-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Informations de Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedSupplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedSupplier.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{selectedSupplier.address}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Évaluation:</span>
                      <span className="text-sm font-medium">{selectedSupplier.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Commandes totales:</span>
                      <span className="text-sm font-medium">{selectedSupplier.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Statut:</span>
                      {getStatusBadge(selectedSupplier.status)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Produits Fournis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.productsSupplied.map((product: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Fermer
            </Button>
            <Button>Modifier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
