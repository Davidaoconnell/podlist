<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import MobileNavItemChildren from './MobileNavItemChildren.svelte';
	export let cta: { name: string; href: string };
	export let minorCta: { name: string; href: string; external?: boolean };
	export let nav: App.NavItem[];
	afterNavigate(() => {
		open = false;
	});

	let open = false;
</script>

<button
	class="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
	aria-label="Toggle Navigation"
	on:click={() => (open = !open)}
>
	<svg
		aria-hidden={open}
		class={`h-3.5 w-3.5 overflow-visible stroke-slate-700 ${open ? 'hidden' : 'inline-block'}`}
		fill="none"
		stroke-width="2"
		stroke-linecap="round"
	>
		<path d="M0 1H14M0 7H14M0 13H14" class="origin-center transition" />
		<path d="M2 2L12 12M12 2L2 12" class="origin-center scale-90 opacity-0 transition" />
	</svg>
	<svg
		aria-hidden={!open}
		class={`h-3.5 w-3.5 overflow-visible stroke-slate-700 ${!open ? 'hidden' : 'inline-block'}`}
		fill="none"
		stroke-width="2"
		stroke-linecap="round"
	>
		<path d="M0 1H14M0 7H14M0 13H14" class="origin-center scale-90 opacity-0 transition" />
		<path d="M2 2L12 12M12 2L2 12" class="origin-center transition" />
	</svg>
</button>
<div class={open ? '' : 'hidden'}>
	<div
		on:click={() => (open = false)}
		on:keypress={() => (open = false)}
		class="fixed inset-0 bg-slate-300/50 opacity-100"
	>
		<!-- aria-hidden="true" -->
		<!-- x-show="open" -->
		<!-- x-transition:enter="duration-150 ease-out" -->
		<!-- x-transition:enter-start="opacity-0" -->
		<!-- x-transition:enter-end="opacity-100" -->
		<!-- x-transition:leave="duration-150 ease-in" -->
		<!-- x-transition:leave-start="opacity-100" -->
		<!-- x-transition:leave-end="opacity-0" -->
	</div>
	<div
		class="absolute inset-x-0 top-full mt-4 flex origin-top scale-100 flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 opacity-100 shadow-xl ring-1 ring-slate-900/5"
	>
		<!-- tabindex="-1" -->
		<!-- x-show="open" -->
		<!-- x-transition:enter="duration-150 ease-out" -->
		<!-- x-transition:enter-start="opacity-0 scale-95" -->
		<!-- x-transition:enter-end="opacity-100 scale-100" -->
		<!-- x-transition:leave="duration-100 ease-in" -->
		<!-- x-transition:leave-start="opacity-100 scale-100" -->
		<!-- x-transition:leave-end="opacity-0 scale-95" -->
		{#each nav as { href, label, children }}
			{#if children}
				<MobileNavItemChildren parent={{ href, label }} {children} />
			{:else}
				<a {href} class="block w-full p-2">{label}</a>
			{/if}
		{/each}
		<hr class="m-2 border-slate-300/40" />
		<!-- Minor CTA -->
		<a
			href={minorCta.href}
			target={minorCta.external ? '_blank' : null}
			rel={minorCta.external ? 'noopener noreferrer' : null}
			class="block w-full p-2"
		>
			{minorCta.name}
		</a>
		<!-- CTA -->
		<a href={cta.href} class="block w-full p-2">{cta.name}</a>
	</div>
</div>
