import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// Untuk mencegah banyak koneksi saat hot-reloading di development
const queryClient = postgres(env.DATABASE_URL as string);
export const db = drizzle(queryClient, { schema });
