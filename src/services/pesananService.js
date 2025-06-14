import { PrismaClient } from '@prisma/client';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

const prisma = new PrismaClient();

export const createPesanan = async (userId, { layananId, berat_kg }) => {
  // Dapatkan harga layanan
  const layanan = await prisma.layanan.findUnique({
    where: { id: layananId }
  });
  
  if (!layanan) {
    throw new NotFoundError('Layanan tidak ditemukan');
  }

  // Hitung total harga
  const total_harga = layanan.harga_kg * berat_kg;

  return await prisma.pesanan.create({
    data: {
      userId,
      layananId,
      berat_kg,
      total_harga,
      status: 'PENDING',
      tanggal: new Date()
    },
    include: {
      layanan: true,
      user: {
        select: {
          id: true,
          username: true,
          alamat: true,
          telepon: true
        }
      }
    }
  });
};

export const getPesananUser = async (userId) => {
  return await prisma.pesanan.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      layanan: true
    }
  });
};

export const getAllPesanan = async () => {
  return await prisma.pesanan.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      layanan: true,
      user: {
        select: {
          id: true,
          username: true
        }
      }
    }
  });
};

export const updateStatusPesanan = async (pesananId, status) => {
  const pesanan = await prisma.pesanan.findUnique({
    where: { id: pesananId }
  });

  if (!pesanan) {
    throw new NotFoundError('Pesanan tidak ditemukan');
  }

  return await prisma.pesanan.update({
    where: { id: pesananId },
    data: { status },
    include: {
      layanan: true,
      user: {
        select: {
          id: true,
          username: true
        }
      }
    }
  });
};