import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// Validate JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  throw new Error('CRITICAL: JWT_SECRET environment variable is required. Set it in .env file.');
}
const JWT_SECRET: string = process.env.JWT_SECRET;

export interface RegisterInput {
  email: string;
  password?: string;
  name?: string;
  oauthProvider?: 'google' | 'github';
  oauthId?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput): Promise<{ user: any; token: string }> {
  const { email, password, name, oauthProvider, oauthId } = input;

  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User already exists');
  }

  // Hash password if provided
  let hashedPassword: string | undefined;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      oauthProvider,
      oauthId,
      preferences: JSON.stringify({
        theme: 'dark',
        fontSize: 14,
        codeTheme: 'monokai',
        notifications: { email: true, inApp: true },
      }),
    },
  });

  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email, oauthProvider: user.oauthProvider },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { user, token };
}

export async function loginUser(input: LoginInput): Promise<{ user: any; token: string }> {
  const { email, password } = input;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // If user has password (not OAuth only)
  if (user.password) {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
  } else {
    throw new Error('Please login with OAuth');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, oauthProvider: user.oauthProvider },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { user, token };
}

export async function getUserById(userId: string): Promise<any | null> {
  return await prisma.user.findUnique({ where: { id: userId } });
}

export async function getUserProfile(userId: string): Promise<any> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      oauthProvider: true,
      preferences: true,
      createdAt: true,
    },
  });
  return user;
}

export async function updateUserProfile(userId: string, data: {
  name?: string;
  preferences?: any;
}): Promise<any> {
  const { name, preferences } = data;
  return await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      preferences: preferences ? JSON.stringify(preferences) : undefined,
    },
  });
}

export async function handleOAuthCallback(provider: 'google' | 'github', profile: any): Promise<{ user: any; token: string }> {
  const email = profile.emails?.[0]?.value || profile.email;
  const name = profile.displayName || profile.name;

  // Check if user exists
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // Create new user
    user = await prisma.user.create({
      data: {
        email,
        name,
        oauthProvider: provider,
        oauthId: profile.id || profile.sub,
        preferences: JSON.stringify({
          theme: 'dark',
          fontSize: 14,
          codeTheme: 'monokai',
          notifications: { email: true, inApp: true },
        }),
      },
    });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, oauthProvider: user.oauthProvider },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { user, token };
}