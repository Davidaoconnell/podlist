<script lang="ts">
	export let title: string | null = null;
	export let description: string | null = null;
	export let as: string | null = null;
</script>

<div class="space-y-6 sm:space-y-5">
	{#if title}
		<div>
			<svelte:element this={as ?? 'h3'} class="text-lg font-medium leading-6 text-gray-900"
				>{title}</svelte:element
			>
			{#if description}
				<p class="mt-1 max-w-2xl text-sm text-gray-500">
					{description}
				</p>
			{/if}
		</div>
	{/if}
	<div class="grid gap-4 sm:grid-cols-2 sm:items-start">
		<slot />
	</div>
</div>
