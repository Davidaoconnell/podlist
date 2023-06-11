<script lang="ts">
	import { page } from '$app/stores';
	import Container from '$components/common/Container.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import NavItemChildren from './NavItemChildren.svelte';

	export let nav: App.NavItem[];

	export let minorCta = {
		name: 'Lorem Ipsum',
		href: '#'
	};

	export let primaryCta = {
		name: 'Contact',
		href: '/contact'
	};
</script>

<header class="py-10">
	<Container verticalSpacing="none">
		<nav class="relative z-50 flex justify-between">
			<div class="flex items-center lg:gap-x-12">
				<a href="/" aria-label="Home">
					<img
						src="/site/logo-placeholder.svg"
						width="110"
						height="20.63"
						alt="Logo"
						class="max-h-[40px] max-w-[110px] object-contain"
					/>
				</a>
				<div class="hidden lg:flex lg:gap-x-6">
					{#each nav as { href, label, children }}
						{#if children}
							<NavItemChildren parent={{ href, label }} {children} />
						{:else}
							<a
								{href}
								class={`inline-block rounded-lg px-2 py-1 text-sm hover:bg-slate-100 hover:text-slate-900 ${
									$page.url.pathname === href ? 'bg-slate-100 text-slate-900' : 'text-slate-700'
								}`}
							>
								{label}
							</a>
						{/if}
					{/each}
				</div>
			</div>
			<div class="flex items-center gap-x-5 lg:gap-x-8">
				<div class="hidden md:block">
					<a
						href={minorCta.href}
						class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
					>
						{minorCta.name}
					</a>
				</div>
				<a href={primaryCta.href} class="btn">{primaryCta.name}</a>
				<div class="-mr-1 lg:hidden">
					<MobileMenu cta={primaryCta} {minorCta} {nav} />
				</div>
			</div>
		</nav>
	</Container>
</header>
