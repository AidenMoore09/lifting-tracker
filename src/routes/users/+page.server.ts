import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const allUsers = await db.select().from(users);

	return {
		users: allUsers
	};
};
