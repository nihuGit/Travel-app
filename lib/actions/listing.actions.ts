'use server';

import { getCurrentUser } from './user.actions';
import prisma from '../primsadb';

interface ListingParams {
  title: string;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
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
    Object.keys(data).forEach((key) => {
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
        bedrooms,
        bathrooms,
        guests,
        price: parseInt(price, 10),
        location: location.label,
        category,
      },
    });
  } catch (error: any) {
    throw new Error(`Error creating listing: ${error.message}`);
  }
};
