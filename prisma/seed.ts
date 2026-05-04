import { PrismaClient} from './generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const statuses = [
    { name: 'PENDING', is_active: true },
    { name: 'SENT', is_active: true },
    { name: 'DISMISSED', is_active: true },
  ]

  for (const status of statuses) {
    await prisma.reminder_status.upsert({
      where: { name: status.name },
      update: {
        is_active: status.is_active,
      },
      create: status,
    })
  }

  console.log('✅ Reminder statuses seeded')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })