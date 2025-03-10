import { PrismaClient } from '@prisma/client';

export const DATABASE_URL =
	process.env.NODE_ENV === 'production'
		? process.env.SUPABASE_DATABASE_URL
		: process.env.DATABASE_URL;

const prisma = new PrismaClient({
	datasources: {
		db: { url: DATABASE_URL },
	},
});

export default prisma;
