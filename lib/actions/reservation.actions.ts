'use server';

import { getCurrentUser } from './user.actions';
import prisma from '../primsadb';

interface ReservationParams {
  listingId?: string;
  userId?: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
}

export const createReservation = async (params: ReservationParams) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('Login First!');
    }
    const { listingId, startDate, endDate, totalAmount } = params;
    if (!listingId || !startDate || !endDate || !totalAmount) {
      throw new Error('Incomplete data to create reservation');
    }
    const listingAndReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: { userId: currentUser.id, startDate, endDate, totalAmount },
        },
      },
    });
    return listingAndReservation;
  } catch (error: any) {
    throw new Error(`Error creating reservation: ${error.message}`);
  }
};

export const getReservations = async ({
  listingId,
  userId,
  authorId,
}: {
  listingId?: string;
  userId?: string;
  authorId?: string;
}) => {
  try {
    let query: any = {};
    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;
    if (authorId) query.listing = { userId: authorId };
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: 'desc' },
    });
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      createdAt: reservation.createdAt.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
    return safeReservations;
  } catch (error: any) {
    throw new Error(`Error fetching reservations: ${error.message}`);
  }
};

export const deleteReservation = async (reservationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('Login first');
    }
    await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });
    return { message: 'success' };
  } catch (error: any) {
    throw new Error(`Error deleting reservation: ${error.message}`);
  }
};
