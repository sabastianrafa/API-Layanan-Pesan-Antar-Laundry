// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@laundry.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN'
    }
  });
  console.log({ admin });
}