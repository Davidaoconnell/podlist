import { q } from 'groqd';
import { SLUG } from '..';

export const AUTHOR = {
	name: q.string(),
	slug: SLUG,
	featuredImage: q('featuredImage').grab({
		url: q('asset').deref().grabOne('url', q.string())
	})
};

export type Author = typeof AUTHOR;
