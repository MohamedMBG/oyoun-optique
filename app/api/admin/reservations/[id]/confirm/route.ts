import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendReservationConfirmation } from "@/lib/email";

const confirmSchema = z.object({
  confirmedDateTime: z.string(),
  message: z.string().max(500).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and role (HIGH-1 fix)
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = params;

    // Validate request body
    const body = await request.json();
    const validationResult = confirmSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid data",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { confirmedDateTime, message } = validationResult.data;

    // Get the current reservation for audit log
    const currentReservation = await prisma.reservationRequest.findUnique({
      where: { id },
    });

    if (!currentReservation) {
      return NextResponse.json(
        { success: false, message: "Reservation not found" },
        { status: 404 }
      );
    }

    // Update reservation
    const updatedReservation = await prisma.reservationRequest.update({
      where: { id },
      data: {
        status: "CONFIRMED",
        confirmedDateTime: new Date(confirmedDateTime),
        adminMessage: message || null,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "CONFIRM",
        entityType: "ReservationRequest",
        entityId: id,
        userId: session.user.id,
        reservationId: id,
        previousValue: JSON.stringify({
          status: currentReservation.status,
          confirmedDateTime: currentReservation.confirmedDateTime,
        }),
        newValue: JSON.stringify({
          status: "CONFIRMED",
          confirmedDateTime,
        }),
        message: message || null,
      },
    });

    // Send confirmation email
    await sendReservationConfirmation({
      id: updatedReservation.id,
      fullName: updatedReservation.fullName,
      email: updatedReservation.email,
      serviceType: updatedReservation.serviceType,
      preferredDate: updatedReservation.preferredDate,
      preferredTimeWindow: updatedReservation.preferredTimeWindow,
      confirmedDateTime: updatedReservation.confirmedDateTime,
      adminMessage: updatedReservation.adminMessage,
    });

    return NextResponse.json({
      success: true,
      data: updatedReservation,
    });
  } catch (error) {
    console.error("Failed to confirm reservation:", error);
    return NextResponse.json(
      { success: false, message: "Failed to confirm reservation" },
      { status: 500 }
    );
  }
}
