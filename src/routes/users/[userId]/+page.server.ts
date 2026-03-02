import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.id, parseInt(params.userId)));

	return user;
};
