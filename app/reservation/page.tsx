"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reservationSchema, type ReservationFormData } from "@/lib/validation";
import { serviceTypeLabels, timeWindowLabels } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Service", icon: Check },
  { id: 2, title: "Date", icon: Calendar },
  { id: 3, title: "Coordonnées", icon: User },
  { id: 4, title: "Détails", icon: FileText },
  { id: 5, title: "Confirmation", icon: CheckCircle },
];

const serviceTypes = [
  { value: "EYE_EXAM", label: "Examen de vue" },
  { value: "CONTACT_LENS_FITTING", label: "Essayage lentilles" },
  { value: "LENS_CUSTOMIZATION", label: "Personnalisation de verres" },
  { value: "FRAME_FITTING", label: "Essayage de montures" },
  { value: "REPAIR_ADJUSTMENT", label: "Réparation & ajustement" },
];

const timeWindows = [
  { value: "MORNING", label: "Matin (9h - 12h)" },
  { value: "AFTERNOON", label: "Après-midi (14h - 17h)" },
  { value: "EVENING", label: "Soir (17h - 19h)" },
];

export default function ReservationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      serviceType: undefined,
      preferredDate: "",
      preferredTimeWindow: undefined,
      fullName: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const watchedValues = watch();

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger("serviceType");
      case 2:
        return await trigger(["preferredDate", "preferredTimeWindow"]);
      case 3:
        return await trigger(["fullName", "email", "phone"]);
      case 4:
        return true; // Notes are optional
      default:
        return true;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Demande envoyée !",
          description: "Vous recevrez un email de confirmation sous peu.",
          variant: "success",
        });
        router.push("/reservation/success");
      } else {
        toast({
          title: "Erreur",
          description: result.message || "Une erreur est survenue.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la demande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl text-foreground mb-6">
              Choisissez votre service
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {serviceTypes.map((service) => (
                <button
                  key={service.value}
                  type="button"
                  onClick={() =>
                    setValue("serviceType", service.value as any, {
                      shouldValidate: true,
                    })
                  }
                  className={`p-6 rounded-xl border text-left transition-all duration-200 ${
                    watchedValues.serviceType === service.value
                      ? "border-gold bg-gold-subtle"
                      : "border-border bg-charcoal-light/50 hover:border-gold/30"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 mb-3 ${
                      watchedValues.serviceType === service.value
                        ? "border-gold bg-gold"
                        : "border-gray-muted"
                    }`}
                  />
                  <span className="text-foreground font-medium">
                    {service.label}
                  </span>
                </button>
              ))}
            </div>
            {errors.serviceType && (
              <p className="text-red-500 text-sm">
                {errors.serviceType.message}
              </p>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl text-foreground mb-6">
              Sélectionnez votre créneau préféré
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="preferredDate">Date souhaitée</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  {...register("preferredDate")}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-2"
                />
                {errors.preferredDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.preferredDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block">Créneau horaire</Label>
                <div className="grid sm:grid-cols-3 gap-4">
                  {timeWindows.map((window) => (
                    <button
                      key={window.value}
                      type="button"
                      onClick={() =>
                        setValue("preferredTimeWindow", window.value as any, {
                          shouldValidate: true,
                        })
                      }
                      className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                        watchedValues.preferredTimeWindow === window.value
                          ? "border-gold bg-gold-subtle"
                          : "border-border bg-charcoal-light/50 hover:border-gold/30"
                      }`}
                    >
                      <Clock className="w-5 h-5 mx-auto mb-2 text-gold" />
                      <span className="text-sm text-foreground">
                        {window.label}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.preferredTimeWindow && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.preferredTimeWindow.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl text-foreground mb-6">
              Vos coordonnées
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Jean Dupont"
                  className="mt-2"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="jean.dupont@email.com"
                  className="mt-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+33 6 12 34 56 78"
                  className="mt-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl text-foreground mb-6">
              Informations complémentaires
            </h2>

            <div>
              <Label htmlFor="notes">
                Notes (optionnel)
                <span className="text-gray-muted font-normal ml-2">
                  - Problèmes de vision, lunettes actuelles, etc.
                </span>
              </Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Décrivez vos besoins ou questions..."
                rows={5}
                className="mt-2"
              />
              {errors.notes && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.notes.message}
                </p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl text-foreground mb-6">
              Confirmez votre demande
            </h2>

            <div className="glass-card p-6 space-y-4">
              <div className="pb-4 border-b border-border">
                <span className="text-gray-muted text-sm">Service</span>
                <p className="text-foreground font-medium">
                  {watchedValues.serviceType
                    ? serviceTypeLabels[watchedValues.serviceType]
                    : "-"}
                </p>
              </div>

              <div className="pb-4 border-b border-border">
                <span className="text-gray-muted text-sm">Date préférée</span>
                <p className="text-foreground font-medium">
                  {watchedValues.preferredDate
                    ? new Date(watchedValues.preferredDate).toLocaleDateString(
                        "fr-FR",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "-"}
                </p>
              </div>

              <div className="pb-4 border-b border-border">
                <span className="text-gray-muted text-sm">Créneau</span>
                <p className="text-foreground font-medium">
                  {watchedValues.preferredTimeWindow
                    ? timeWindowLabels[watchedValues.preferredTimeWindow]
                    : "-"}
                </p>
              </div>

              <div className="pb-4 border-b border-border">
                <span className="text-gray-muted text-sm">Nom</span>
                <p className="text-foreground font-medium">
                  {watchedValues.fullName || "-"}
                </p>
              </div>

              <div className="pb-4 border-b border-border">
                <span className="text-gray-muted text-sm">Email</span>
                <p className="text-foreground font-medium">
                  {watchedValues.email || "-"}
                </p>
              </div>

              <div className="pb-4 border-b border-border">
                <span className="text-gray-muted text-sm">Téléphone</span>
                <p className="text-foreground font-medium">
                  {watchedValues.phone || "-"}
                </p>
              </div>

              {watchedValues.notes && (
                <div>
                  <span className="text-gray-muted text-sm">Notes</span>
                  <p className="text-foreground">{watchedValues.notes}</p>
                </div>
              )}
            </div>

            <p className="text-gray-muted text-sm text-center">
              En confirmant, vous acceptez que nous vous contactions pour
              confirmer votre rendez-vous.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
            Réservation
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-4">
            Prendre Rendez-vous
          </h1>
          <p className="text-gray-soft">
            Remplissez le formulaire ci-dessous pour demander un rendez-vous.
            Notre équipe vous contactera pour confirmer.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex flex-col items-center ${
                    step.id <= currentStep ? "text-gold" : "text-gray-muted"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      step.id < currentStep
                        ? "bg-gold border-gold text-charcoal"
                        : step.id === currentStep
                        ? "border-gold bg-gold-subtle"
                        : "border-gray-muted"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <span className="text-xs mt-2 hidden sm:block">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 mx-2 transition-all duration-300 ${
                      step.id < currentStep ? "bg-gold" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>

              {currentStep < 5 ? (
                <Button type="button" onClick={handleNext}>
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      Confirmer
                      <Check className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
