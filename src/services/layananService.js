import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors.js';

const prisma = new PrismaClient();

export const getAllLayanan = async () => {
  return await prisma.layanan.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

export const createLayanan = async (data) => {
  return await prisma.layanan.create({
    data: {
      nama: data.nama,
      harga_kg: data.harga_kg
    }
  });
};

export const updateLayanan = async (id, data) => {
  const layanan = await prisma.layanan.findUnique({ where: { id } });
  if (!layanan) throw new NotFoundError('Layanan not found');

  return await prisma.layanan.update({
    where: { id },
    data: {
      nama: data.nama,
      harga_kg: data.harga_kg
    }
  });
};

export const deleteLayanan = async (id) => {
  const layanan = await prisma.layanan.findUnique({ where: { id } });
  if (!layanan) throw new NotFoundError('Layanan not found');

  return await prisma.layanan.delete({ where: { id } });
};