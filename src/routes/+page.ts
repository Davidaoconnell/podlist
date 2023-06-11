import type { PageLoad } from './$types';
import { getPosts } from '$sanity/queries/posts';
// import { getPostBySearch } from '$sanity/queries/posts';

export const load = (async () => {
	// const search = url.searchParams.get('search');
	const posts = await getPosts();
	// if (search) {
	// 	posts = await getPostBySearch(search);
	// } else {
	// 	posts = await getPosts();
	// }

	return {
		posts
	};
}) satisfies PageLoad;
