import { PrismaClient } from '@prisma/client';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

const prisma = new PrismaClient();

export const createPesanan = async (userId, { layananId, berat_kg }) => {
  // Validate berat_kg
  if (berat_kg <= 0 || berat_kg > 20) {
    throw new BadRequestError('Berat harus antara 0.1 kg dan 20 kg');
  }

  // Get layanan
  const layanan = await prisma.layanan.findUnique({
    where: { id: layananId }
  });
  
  if (!layanan) {
    throw new NotFoundError('Layanan tidak ditemukan');
  }

  // Calculate total
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
  const validStatuses = ['PENDING', 'ACCEPTED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED'];
  if (!validStatuses.includes(status)) {
    throw new BadRequestError('Status tidak valid');
  }

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