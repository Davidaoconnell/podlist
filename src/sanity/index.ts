import { createClient } from '@sanity/client';
import { makeSafeQueryRunner, q } from 'groqd';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const client = createClient({
	projectId: 'gzif1ip8',
	dataset: 'production',
	apiVersion: '2021-10-21',
	useCdn: false
});

export const runQuery = makeSafeQueryRunner((query, params: Record<string, unknown> = {}) =>
	client.fetch(query, params)
);

export const SLUG = q('slug').grabOne('current', q.string());

// other stuff
const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
export default client;
