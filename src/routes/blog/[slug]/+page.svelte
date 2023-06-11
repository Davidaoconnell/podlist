<script lang="ts">
	import Container from '$components/common/Container.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<Container>
	<img src={data.post.featuredImage.url} alt={data.post.title} />
	{#each data.post.body as paragraph}
		<p>{paragraph.children[0].text}</p>
	{/each}
</Container>
