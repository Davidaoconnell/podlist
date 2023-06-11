import { redirect, error, type Handle } from '@sveltejs/kit';
import type { HandleServerError } from '@sveltejs/kit';
import { TURNSTILE_SECRET } from '$env/static/private';

type Redirect = {
	status: 301 | 302;
	from: string;
	to: string;
};

// IMPORTANT: Do not add trailing slashes. We handle those for you.
const REDIRECTS: Redirect[] = [{ from: '/old', to: '/new', status: 301 }];

export const handleError: HandleServerError = ({ error: err, event }) => {
	if (!event.route.id) {
		let { pathname } = event.url;
		// Normalize the path by removing trailing slashes.
		if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);

		const foundRedirect = REDIRECTS.find((r) => r.from === pathname);

		if (foundRedirect) {
			throw redirect(foundRedirect.status, foundRedirect.to);
		}
	}
	console.log(err);
};
