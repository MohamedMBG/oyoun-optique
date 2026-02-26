"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  LogOut,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  serviceTypeLabels,
  timeWindowLabels,
  statusLabels,
  formatDate,
} from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Reservation {
  id: string;
  status: "PENDING" | "CONFIRMED" | "DECLINED";
  serviceType: string;
  preferredDate: string;
  preferredTimeWindow: string;
  confirmedDateTime: string | null;
  fullName: string;
  email: string;
  phone: string;
  notes: string | null;
  adminMessage: string | null;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "CONFIRMED" | "DECLINED">("ALL");
  const [search, setSearch] = useState("");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [confirmDateTime, setConfirmDateTime] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch reservations
  useEffect(() => {
    if (status === "authenticated") {
      fetchReservations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/admin/reservations");
      if (response.ok) {
        const data = await response.json();
        setReservations(data.data || []);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedReservation || !confirmDateTime) return;

    setIsProcessing(true);
    try {
      const response = await fetch(
        `/api/admin/reservations/${selectedReservation.id}/confirm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            confirmedDateTime: confirmDateTime,
            message: adminMessage,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Réservation confirmée",
          description: "Un email de confirmation a été envoyé au client.",
          variant: "success",
        });
        fetchReservations();
        setIsConfirmDialogOpen(false);
        setSelectedReservation(null);
        setConfirmDateTime("");
        setAdminMessage("");
      } else {
        throw new Error("Failed to confirm");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de confirmer la réservation",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecline = async () => {
    if (!selectedReservation) return;

    setIsProcessing(true);
    try {
      const response = await fetch(
        `/api/admin/reservations/${selectedReservation.id}/decline`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: adminMessage }),
        }
      );

      if (response.ok) {
        toast({
          title: "Réservation refusée",
          description: "Un email a été envoyé au client.",
          variant: "success",
        });
        fetchReservations();
        setIsDeclineDialogOpen(false);
        setSelectedReservation(null);
        setAdminMessage("");
      } else {
        throw new Error("Failed to decline");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de refuser la réservation",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredReservations = reservations.filter((res) => {
    if (filter !== "ALL" && res.status !== filter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        res.fullName.toLowerCase().includes(searchLower) ||
        res.email.toLowerCase().includes(searchLower) ||
        res.phone.includes(search)
      );
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-sm">
            <Clock className="w-4 h-4" />
            En attente
          </span>
        );
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">
            <CheckCircle className="w-4 h-4" />
            Confirmé
          </span>
        );
      case "DECLINED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm">
            <XCircle className="w-4 h-4" />
            Refusé
          </span>
        );
      default:
        return null;
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-heading text-3xl text-foreground">
              Tableau de bord
            </h1>
            <p className="text-gray-muted">
              Bienvenue, {session?.user?.name || "Admin"}
            </p>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-card p-6">
            <div className="text-3xl font-heading text-gold">
              {reservations.filter((r) => r.status === "PENDING").length}
            </div>
            <div className="text-gray-muted text-sm">En attente</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-3xl font-heading text-green-500">
              {reservations.filter((r) => r.status === "CONFIRMED").length}
            </div>
            <div className="text-gray-muted text-sm">Confirmés</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-3xl font-heading text-red-500">
              {reservations.filter((r) => r.status === "DECLINED").length}
            </div>
            <div className="text-gray-muted text-sm">Refusés</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-3xl font-heading text-foreground">
              {reservations.length}
            </div>
            <div className="text-gray-muted text-sm">Total</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-muted" />
            <Input
              placeholder="Rechercher par nom, email ou téléphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={filter}
            onValueChange={(value: any) => setFilter(value)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tous les statuts</SelectItem>
              <SelectItem value="PENDING">En attente</SelectItem>
              <SelectItem value="CONFIRMED">Confirmés</SelectItem>
              <SelectItem value="DECLINED">Refusés</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Reservations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredReservations.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-muted mx-auto mb-4" />
              <p className="text-gray-muted">
                Aucune réservation trouvée
              </p>
            </div>
          ) : (
            filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="glass-card p-6 hover:border-gold/30 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusBadge(reservation.status)}
                      <span className="text-gray-muted text-sm">
                        Demande du{" "}
                        {new Date(reservation.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl text-foreground mb-1">
                      {reservation.fullName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-soft">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4" />
                        {reservation.email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4" />
                        {reservation.phone}
                      </span>
                    </div>
                  </div>

                  {/* Service & Date */}
                  <div className="lg:text-right">
                    <div className="text-gold font-medium">
                      {serviceTypeLabels[reservation.serviceType]}
                    </div>
                    <div className="text-gray-soft text-sm">
                      Souhaité :{" "}
                      {new Date(reservation.preferredDate).toLocaleDateString(
                        "fr-FR",
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        }
                      )}{" "}
                      - {timeWindowLabels[reservation.preferredTimeWindow]}
                    </div>
                    {reservation.confirmedDateTime && (
                      <div className="text-green-500 text-sm">
                        Confirmé :{" "}
                        {formatDate(reservation.confirmedDateTime)}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {reservation.status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedReservation(reservation);
                          setIsConfirmDialogOpen(true);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirmer
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedReservation(reservation);
                          setIsDeclineDialogOpen(true);
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Refuser
                      </Button>
                    </div>
                  )}
                </div>

                {reservation.notes && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-start gap-2 text-sm">
                      <MessageSquare className="w-4 h-4 text-gray-muted flex-shrink-0 mt-0.5" />
                      <span className="text-gray-soft">{reservation.notes}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </motion.div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-charcoal-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Confirmer la réservation
            </DialogTitle>
            <DialogDescription>
              {selectedReservation?.fullName} -{" "}
              {selectedReservation &&
                serviceTypeLabels[selectedReservation.serviceType]}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="confirmDateTime">Date et heure confirmées</Label>
              <Input
                id="confirmDateTime"
                type="datetime-local"
                value={confirmDateTime}
                onChange={(e) => setConfirmDateTime(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="confirmMessage">
                Message (optionnel)
              </Label>
              <Textarea
                id="confirmMessage"
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                placeholder="Instructions particulières..."
                className="mt-2"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsConfirmDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!confirmDateTime || isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Confirmer
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Decline Dialog */}
      <Dialog open={isDeclineDialogOpen} onOpenChange={setIsDeclineDialogOpen}>
        <DialogContent className="bg-charcoal-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Refuser la réservation
            </DialogTitle>
            <DialogDescription>
              {selectedReservation?.fullName} -{" "}
              {selectedReservation &&
                serviceTypeLabels[selectedReservation.serviceType]}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="declineMessage">
                Message (optionnel)
              </Label>
              <Textarea
                id="declineMessage"
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                placeholder="Proposez une alternative ou expliquez le refus..."
                className="mt-2"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDeclineDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleDecline}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <XCircle className="w-4 h-4 mr-1" />
                    Refuser
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
