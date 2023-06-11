import { q } from 'groqd';
import { SLUG } from '..';

export const CATEGORY = {
	title: q.string(),
	slug: SLUG
};

export type Category = typeof CATEGORY;
