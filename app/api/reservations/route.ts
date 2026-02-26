import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendReservationAcknowledgment } from "@/lib/email";
import { sanitizeInput } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimit = await checkRateLimit(clientIp, {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 3,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Trop de demandes. Veuillez réessayer plus tard.",
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = reservationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Données invalides",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check honeypot (spam protection)
    if (data.honeypot && data.honeypot.length > 0) {
      // Silently accept but don't process (bot detected)
      return NextResponse.json(
        {
          success: true,
          message: "Reservation request received",
        },
        { status: 200 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      serviceType: data.serviceType,
      preferredDate: new Date(data.preferredDate),
      preferredTimeWindow: data.preferredTimeWindow,
      fullName: sanitizeInput(data.fullName),
      email: data.email.toLowerCase().trim(),
      phone: sanitizeInput(data.phone),
      notes: data.notes ? sanitizeInput(data.notes) : null,
    };

    // Create reservation in database
    const reservation = await prisma.reservationRequest.create({
      data: {
        ...sanitizedData,
        status: "PENDING",
      },
    });

    // Send acknowledgment email (don't await - don't block response)
    sendReservationAcknowledgment({
      id: reservation.id,
      fullName: reservation.fullName,
      email: reservation.email,
      serviceType: reservation.serviceType,
      preferredDate: reservation.preferredDate,
      preferredTimeWindow: reservation.preferredTimeWindow,
      notes: reservation.notes,
    }).catch((error) => {
      console.error("Failed to send acknowledgment email:", error);
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: reservation.id,
          status: reservation.status,
          message: "Reservation request received",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Reservation creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}
