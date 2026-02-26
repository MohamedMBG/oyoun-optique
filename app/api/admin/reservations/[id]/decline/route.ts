import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendReservationDecline } from "@/lib/email";

const declineSchema = z.object({
  message: z.string().max(500).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;

    // Validate request body
    const body = await request.json();
    const validationResult = declineSchema.safeParse(body);

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

    const { message } = validationResult.data;

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
        status: "DECLINED",
        adminMessage: message || null,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "DECLINE",
        entityType: "ReservationRequest",
        entityId: id,
        userId: session.user.id,
        reservationId: id,
        previousValue: JSON.stringify({
          status: currentReservation.status,
        }),
        newValue: JSON.stringify({
          status: "DECLINED",
        }),
        message: message || null,
      },
    });

    // Send decline email
    await sendReservationDecline({
      id: updatedReservation.id,
      fullName: updatedReservation.fullName,
      email: updatedReservation.email,
      serviceType: updatedReservation.serviceType,
      preferredDate: updatedReservation.preferredDate,
      preferredTimeWindow: updatedReservation.preferredTimeWindow,
      adminMessage: updatedReservation.adminMessage,
    });

    return NextResponse.json({
      success: true,
      data: updatedReservation,
    });
  } catch (error) {
    console.error("Failed to decline reservation:", error);
    return NextResponse.json(
      { success: false, message: "Failed to decline reservation" },
      { status: 500 }
    );
  }
}
