import { PrismaClient} from './generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const statuses = [
    { name: 'PENDING', is_active: true },
    { name: 'SENT', is_active: true },
    { name: 'ACKNOWLEDGED', is_active: true },
    { name: 'DISMISSED', is_active: true },
  ]
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
