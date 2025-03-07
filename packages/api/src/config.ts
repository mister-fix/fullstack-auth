export const DATABASE_URL =
	process.env.NODE_ENV === 'production'
		? process.env.SUPABASE_DATABASE_URL
		: process.env.DATABASE_URL;
