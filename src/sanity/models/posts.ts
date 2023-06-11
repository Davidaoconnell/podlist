import { q } from 'groqd';
import { SLUG } from '..';

export const POST = {
	title: q.string(),
	slug: SLUG,
	publishedAt: q('publishedAt'),
	featuredImage: q('featuredImage').grab({
		url: q('asset').deref().grabOne('url', q.string())
	}),
	author: q('author')
		.deref()
		.grab({
			slug: q('slug').grabOne('current', q.string()),
			name: q.string()
		}),
	body: q.array(q.contentBlock())
};

// used for cards on the homepage or individual category pages
export const POST_PREVIEW = {
	title: q.string(),
	slug: SLUG,
	publishedAt: q('publishedAt'),
	featuredImage: q('featuredImage').grab({
		url: q('asset').deref().grabOne('url', q.string())
	}),
	author: q('author')
		.deref()
		.grab({
			slug: q('slug').grabOne('current', q.string()),
			name: q.string()
		})
	// category: q('category')
	// 	.deref()
	// 	.grab({
	// 		slug: q('slug').grabOne('current', q.string()),
	// 		title: q.string()
	// 	})
};

export type Post = typeof POST;
export type PostPreview = typeof POST_PREVIEW;
