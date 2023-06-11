// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	declare module '*&imagetools' {
		/**
		 * actual types
		 * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
		 * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
		 */
		const out;
		export default out;
	}

	type NavPage = {
		label: string;
		href: string;
	};

	type NavItem = {
		href: string;
		label: string;
		children?: NavItem[];
	};
	type Nav = NavItem[];

	type Meta = {
		title?: string;
		description?: string;
		og?: {
			image?: string;
		};
	};

	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
