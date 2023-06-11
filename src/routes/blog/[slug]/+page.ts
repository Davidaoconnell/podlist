import type { PageLoad } from './$types';
import { getPostBySlug } from '$sanity/queries/posts';
import { error } from '@sveltejs/kit';
export const load = (async ({ params }) => {
	const slug = params.slug;
	const post = await getPostBySlug(slug);

	if (!post) {
		throw error(404, 'post Not found');
	}

	return { post };
}) satisfies PageLoad;
