import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const [user] = await db.select().from(users).where(eq(users.id, params.userId));

	return user;
};
