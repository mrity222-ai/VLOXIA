const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  console.log('Testing PostgreSQL connection via Prisma...');
  const admin = await prisma.adminUser.findFirst();
  console.log('SUCCESS: Database connected successfully!');
  console.log('Admin user:', admin ? admin.email : 'None found');
  const productsCount = await prisma.product.count();
  console.log('Total products count:', productsCount);
}

test()
  .catch((err) => {
    console.error('Connection test failed:', err.message);
  })
  .finally(() => prisma.$disconnect());
