<script lang="ts">
	import '@fontsource/merriweather';
	import '@fontsource/lato';
	import '../app.css';
	import Nav from '$components/nav/Index.svelte';
	import Footer from '$components/Footer.svelte';
	import { dev } from '$app/environment';
	import DevToolbar from '$components/dev/DevToolbar.svelte';
	import NProgress from '$components/common/NProgress.svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>{$page.data.meta.title ?? data.meta.title}</title>
	<meta name="description" content={$page?.data?.meta?.description ?? data.meta.description} />
	<meta property="og:image" content={$page?.data?.meta?.og?.image ?? data.meta.og.image} />
</svelte:head>

<NProgress />
<Nav nav={data.nav} />
<div class="flex-grow">
	<slot />
</div>
<Footer nav={data.nav} />

{#if dev}
	<DevToolbar />
{/if}
