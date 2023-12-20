'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import bcrypt from 'bcrypt';
import prisma from '../primsadb';

interface UserParams {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(user: UserParams) {
  const { name, email, password } = user;
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, hashedPassword },
  });
  return { message: 'User registerted successfully' };
}

export async function getSession() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error: any) {
    console.error('Error getting session:', error);
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
