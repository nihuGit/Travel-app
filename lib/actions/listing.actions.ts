'use server';

import { getCurrentUser } from './user.actions';
import prisma from '../primsadb';

interface ListingParams {
  title: string;
  description: string;
  image: string;
  bedrooms: string;
  bathrooms: string;
  guests: string;
  price: string;
  location: string;
  category: string;
}

export const createListing = async (data: ListingParams) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('Please login first!');
    }
    const {
      category,
      title,
      description,
      image,
      bedrooms,
      bathrooms,
      guests,
      price,
      location,
    } = data;
    Object.keys(data).forEach((key: string) => {
      if (!data[key]) {
        throw new Error('Please fill all the fields!');
      }
    });

    await prisma.listing.create({
      data: {
        userId: currentUser.id,
        title,
        description,
        image,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        guests: parseInt(guests),
        price: parseInt(price, 10),
        location: location.label,
        category,
      },
    });
  } catch (error: any) {
    throw new Error(`Error creating listing: ${error.message}`);
  }
};

export interface IListingParams {
  userId?: string;
}

export const getAllListings = async (params: IListingParams) => {
  try {
    const { userId } = params;
    let query: any = {};
    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const safeListings = listings.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(`Error fetching listings: ${error.message}`);
  }
};

export const getListing = async (listingId: string) => {
  try {
    if (!listingId) {
      return null;
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }
    return {
      ...listing,
      createdAt: listing?.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing?.user.createdAt.toISOString(),
        updatedAt: listing?.user.updatedAt.toISOString(),
        emailVerified: listing?.user.emailVerified?.toISOString(),
      },
    };
  } catch (error: any) {
    throw new Error(`Error fetching listing: ${error.message}`);
  }
};

export const deleteListing = async (listingId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('Not Authorized');
    }
    await prisma.listing.deleteMany({
      where: { id: listingId, userId: currentUser.id },
    });
    return { message: 'success' };
  } catch (error: any) {
    throw new Error(`Error deleting listing: ${error.message}`);
  }
};

export const setAsFavouriteListing = async (listingId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('Not Authorized');
    }
    if (!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid ID');
    }
    let favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds.push(listingId);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { favouriteIds },
    });
  } catch (error: any) {
    throw new Error(`Error setting as favourite listing: ${error.message}`);
  }
};

export const unsetAsFavouriteListing = async (listingId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('Not Authorized');
    }
    if (!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid ID');
    }
    let favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds = favouriteIds.filter((id) => id !== listingId);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { favouriteIds },
    });
  } catch (error: any) {
    throw new Error(`Error unsetting as favourite listing: ${error.message}`);
  }
};

export const getFavouriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });
    const safeFavourites = favourites.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeFavourites;
  } catch (error: any) {
    throw new Error(`Error getting favourite listings: ${error.message}`);
  }
};
