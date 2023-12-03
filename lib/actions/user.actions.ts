'use server';

import bcrypt from 'bcrypt';
import prisma from '../primsadb';

interface UserParams {
  name: string;
  email: string;
  password: string;
}

export async function registerUser({ name, email, password }: UserParams) {
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
