import { PrismaClient } from '../prisma/generated/prisma/client';

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const isDev = process.env.NODE_ENV !== 'production';

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: isDev
            ? [
                  { emit: 'event', level: 'query' },
                  { emit: 'stdout', level: 'info' },
                  { emit: 'stdout', level: 'warn' },
                  { emit: 'stdout', level: 'error' },
              ]
            : [
                  { emit: 'stdout', level: 'warn' },
                  { emit: 'stdout', level: 'error' },
              ],
    });

if (false) {
    // @ts-ignore – $on is only typed when log config uses 'event' emit
    prisma.$on('query', (e: {
        query: string;
        params: string;
        duration: number;
        target: string;
    }) => {
        console.log('\n[Prisma Query]');
        console.log('  SQL    :', e.query);
        console.log('  Params :', e.params);
        console.log('  Duration:', `${e.duration}ms`);
    });
}

// Reuse one client (and one connection pool) per server process, in every
// environment, even if this module ends up loaded more than once.
globalForPrisma.prisma = prisma;

export default prisma;
