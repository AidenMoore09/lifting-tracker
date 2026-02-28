import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as z from 'zod';

const passwordSchema = z
	.string()
	.min(8, { message: 'Your password must be at least 8 characters' })
	.max(20, { message: 'Your password must be shorter than 20 characters' })
	.refine((password) => /[A-Z]/.test(password), {
		message: 'Your password must include at least one capital letter'
	})
	.refine((password) => /[a-z]/.test(password), {
		message: 'Your password should contain at least one lowercase letter'
	})
	.refine((password) => /[0-9]/.test(password), {
		message: 'Your password should contain at least one number'
	});

const schema = z.strictObject({
	email: z.email(),
	password: passwordSchema
});

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const result = schema.safeParse({ email, password });
		if (!result.success) {
			return fail(400, { error: 'Please enter a valid login' });
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			return fail(500, { error: error.message });
		}

		return { success: true, message: `Successfully logged in as ${data.user.email}` };
	}
} satisfies Actions;
