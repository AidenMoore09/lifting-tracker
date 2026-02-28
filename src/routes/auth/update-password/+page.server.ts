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

const updatePasswordSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Your passwords must match',
		path: ['confirmPassword']
	});

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		const result = passwordSchema.safeParse(password);
		if (!result.success) {
			return fail(400, {
				error: 'Your password should be between 8-20 characters, include at least one capital letter, lowercase letter, and number.'
			});
		}

		const passwordMatch = updatePasswordSchema.safeParse({ password, confirmPassword });
		if (!passwordMatch.success) {
			return fail(400, {
				error: 'Your passwords must match.'
			});
		}

		const { error } = await supabase.auth.updateUser({ password: password });

		if (error) {
			return fail(500, { error: error.message });
		}

		return { success: true, message: "Successfully updated password." };
	}
} satisfies Actions;
