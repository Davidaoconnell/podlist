<script lang="ts">
	import Container from './common/Container.svelte';

	export let nav: App.NavItem[];

	const socials = [
		{
			name: 'Facebook',
			href: 'https://www.facebook.com/lorem-ipsum',
			icon: '/icons/brands/facebook.svg'
		},
		{
			name: 'Twitter',
			href: 'https://twitter.com/lorem-ipsum',
			icon: '/icons/brands/twitter.svg'
		},
		{
			name: 'Instagram',
			href: 'https://www.instagram.com/lorem-ipsum',
			icon: '/icons/brands/instagram.svg'
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/company/lorem-ipsum',
			icon: '/icons/brands/linkedin.svg'
		}
	];
</script>

<footer class="bg-slate-50">
	<Container verticalSpacing="none">
		<div class="py-16">
			<img
				src="/site/logo-placeholder.svg"
				width="213.33"
				height="40"
				alt="Logo"
				class="mx-auto h-10 w-auto"
			/>
			<nav class="mt-10 text-sm" aria-label="quick links">
				<div class="-my-1 flex justify-center gap-x-6">
					{#each nav as { href, label, children }}
						<a
							class="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
							{href}
						>
							{label}
						</a>
					{/each}
				</div>
			</nav>
		</div>
		<div
			class="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between"
		>
			<div class="flex gap-x-6">
				{#each socials as { name, href, icon }}
					<a
						class="group text-sm text-slate-500 hover:text-slate-700"
						aria-label="Lorem Ipsum on {name}"
						{href}
					>
						{name}
						<!-- <img src={icon} alt={name} class="h-6 w-6 fill-slate-500 group-hover:fill-slate-700" /> -->
					</a>
				{/each}
			</div>
			<p class="mt-6 text-sm text-slate-500 sm:mt-0">
				Copyright © 2023 Lorem Ipsum. All rights reserved.
			</p>
		</div>
	</Container>
</footer>
