import type { PageLoad } from './$types';

const meta = {
	title: 'Contact',
	description: 'Contact us'
} satisfies App.Meta;

export const load = (async () => {
	return { meta };
}) satisfies PageLoad;
