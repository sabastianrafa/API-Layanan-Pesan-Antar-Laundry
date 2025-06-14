import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwtUtils.js';

const prisma = new PrismaClient();

export const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
      role: 'USER'
    }
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  const token = generateToken(payload);
  
  return {
    token,
    user: payload
  };
};