import type { LayoutLoad } from './$types';

const nav = [
	// {
	// 	label: 'Services',
	// 	href: '/services',
	// 	children: [
	// 		{ label: 'Service 1', href: '/services/service-1' },
	// 		{ label: 'Service 2', href: '/services/service-2' },
	// 		{ label: 'Service 3', href: '/services/service-3' }
	// 	]
	// // },
	// { label: 'FAQ', href: '/faq' },
	{ label: 'About', href: '/about' },
	{ label: 'Blog', href: '/blog' }
] satisfies App.Nav;

const meta = {
	title: 'Pod List',
	description: 'Podlist lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	og: {
		image: 'https://source.unsplash.com/random/?Nature&orientation=landscape'
	}
} satisfies App.Meta;

export const load = (async () => {
	return {
		meta,
		nav
	};
}) satisfies LayoutLoad;
