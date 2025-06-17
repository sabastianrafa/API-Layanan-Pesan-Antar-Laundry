// seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@laundry.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  });
  console.log('Seeding berhasil:', admin);
}

// Jalankan seeding dan pastikan koneksi ditutup
main()
  .catch((e) => {
    console.error('Terjadi error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
