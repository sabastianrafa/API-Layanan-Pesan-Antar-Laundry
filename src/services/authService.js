import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwtUtils.js';

const prisma = new PrismaClient();

export const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      alamat: userData.alamat || null,
      telepon: userData.telepon || null,
      role: 'USER'
    }
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (email, password) => {
  // 1. Cari user by email (case-insensitive)
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase() // Handle case sensitivity
    }
  });

  // 2. Validasi user & password
  if (!user) {
    throw new Error('Email tidak terdaftar'); // Pesan lebih spesifik
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Password salah');
  }

  // 3. Generate token
  const payload = { id: user.id, email: user.email, role: user.role };
  const token = generateToken(payload);

  return { token, user: payload };
};