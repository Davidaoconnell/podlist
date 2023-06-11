import type { Actions, PageServerLoad } from './$types';
import z from 'zod';
import { fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { getFormDataIfBotCheckSuccess } from '$lib/server/turnstile';

const meta = {
	title: 'Home',
	description: 'This is the home page description'
} satisfies App.Meta;

export const load = (async ({ url }) => {
	const message = url.searchParams.get('message') || 'Hello world!';
	return {
		message,
		meta
	};
}) satisfies PageServerLoad;

const schema = zfd.formData({
	number: zfd.numeric(z.number().min(1))
});
export const actions = {
	default: async ({ request, fetch }) => {
		const { formData, failBot } = await getFormDataIfBotCheckSuccess(request, fetch);
		if (failBot) return failBot();

		const validation = schema.safeParse(formData);
		if (!validation.success) {
			return fail(400, validation.error.formErrors);
		}
		return {
			success: true,
			data: validation.data.number * 2
		};
	}
} satisfies Actions;
