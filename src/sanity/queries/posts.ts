import { runQuery } from '$sanity';
import { q } from 'groqd';
import { POST, POST_PREVIEW } from '$sanity/models/posts';

export async function getPosts() {
	const results = await runQuery(q('*').filter('_type == "post"').grab(POST_PREVIEW));
	return results;
}

export async function getPostBySlug(slug: string) {
	const results = await runQuery(
		q('*').filter('_type == "post" && slug.current == $slug').grab(POST).slice(0, 1),
		{ slug }
	);
	return results[0];
}

// export async function getPostBySearch(search: string) {
// 	const results = await runQuery(
// 		q('*').filter('_type == "post" && title match "*" + upper($search) + "*"').grab(POST_PREVIEW),
// 		{ search: search.toUpperCase() }
// 	);
// 	return results;
// }

// export async function getPostsByCategory(slug: string) {
// 	const results = await runQuery(
// 		q('*')
// 			.filter('_type == "category" && slug.current == $slug')
// 			.grab({
// 				posts: q('*').filter('_type == "post" && category._ref == ^._id').grab(POST_PREVIEW)
// 			}),
// 		{ slug }
// 	);
// 	if (!results || results.length === 0) return null;
// 	const posts = results[0].posts;
// 	return posts;
// }
