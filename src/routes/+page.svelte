<script lang="ts">
	import type { PageData, ActionData } from './$types';
	// export let data: PageData;
	// export let form: ActionData;
	import PlaceholderJPG from '../assets/images/placeholder.jpg?width=300&imagetools';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PresentationChartBar } from '@steeze-ui/heroicons';
	// import { enhance } from '$app/forms';
	// import SubmitButton from '$components/form/SubmitButton/SubmitButton.svelte';
	import Container from '$components/common/Container.svelte';
	import Img from '$components/common/cf-image/Img.svelte';
	import Hero from './Hero.svelte';
	import WufooForm from '$components/common/Wufoo/WufooForm.svelte';
	// let message = '';
	// $: number = 1;
</script>

<!-- Example with ratios -->
<Hero />

<Container>
	<p>Image component test.</p>
	<!-- Standard image with max width and height of 650 and 300. Expected to be 50% of screen width at lg breakpoint -->
	<Img
		src="/img/test-1.jpg"
		alt=""
		width={650}
		height={300}
		sizes={{ lg: 50 }}
		class="lg:w-1/2"
		transforms={{ blur: 5 }}
	/>
	<Img src="/img/placeholder.jpg" alt="" width={1920} height={1280} />
	<!-- Some transforms. WIP with types. This should be a linting error because we aren't providing 'gravity' -->
	<!-- <Img
		src="/img/test-1.jpg"
		alt=""
		width={900}
		height={1024}
		transforms={{ fit: 'crop', blur: 5 }}
	/> -->
</Container>

<div class="mx-auto max-w-xl">
	<WufooForm formHash="ziy2ddx1wsommr" />
</div>

<!-- <Container as="section" class="space-y-20">
	<h1>IQ Starter SvelteKit</h1>
	<img src="/img/placeholder.jpg?width=500" width="500" height="333" alt="placeholder" />
	<img src="/img/placeholder.jpg?width=800&blur=10" width="800" height="533" alt="placeholder" />
	<img src="/img/placeholder-2.jpg?width=300" width="300" height="200" alt="placeholder2" />
	<img src="/img/placeholder-3.jpg?width=400" width="400" height="599" alt="placeholder3" />
	<img
		src="/img/placeholder-hero-01.jpg?width=500"
		width="500"
		height="333"
		alt="placeholderhero"
	/>

	<img src="/img/logo-placeholder.svg" width="160" height="30" alt="should serve original svg" />
	<div>
		<h2>Example URL Search Params</h2>
		<p>Message: {data.message}</p>
		<input autofocus type="text" bind:value={message} name="message" placeholder="Change me" />
		<a href="/?message={message}">"Search"</a>
	</div>
	<div>
		<h2>Example POST-based form (e.g. to CRUD)</h2>
		<form use:enhance method="POST">
			<input type="number" bind:value={number} name="number" />
			<SubmitButton botProtectionId="double-up" />
			{#if form?.success}
				<p class="text-green-700">Form success.</p>
			{/if}
			{#if form?.fieldErrors?.number}
				<p class="text-red-700">{form?.fieldErrors?.number}</p>
			{/if}
		</form>
	</div>
	<div>
		<h2>Manipulate images inside the project</h2>
		<img src={PlaceholderJPG} width="300" height="200" alt="placeholder" />
	</div>
	<h2>Comes with Icons</h2>
	<div class="flex">
		<Icon src={PresentationChartBar} solid class="h-6 w-6 text-teal-500" />

		<Icon src={PresentationChartBar} size="128" class="text-green-500" />

		<Icon src={PresentationChartBar} class="h-6 w-6 text-red-500" />
	</div>
</Container> -->
