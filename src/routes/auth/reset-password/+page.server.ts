import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as z from 'zod';

const schema = z.strictObject({
	email: z.email()
});

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const result = schema.safeParse({ email });
		if (!result.success) {
			return fail(400, { error: 'Please enter a valid email address' });
		}

		const { error } = await supabase.auth.resetPasswordForEmail(result.data.email, {
			redirectTo: 'http://example.com/account/update-password'
		});

		if (error) {
			return fail(500, { error: error.message });
		}

		return { success: true };
	}
} satisfies Actions;
