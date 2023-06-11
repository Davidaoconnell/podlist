<script lang="ts">
	export let fieldErrors:
		| {
				[key: string]: string[];
		  }
		| undefined;
	export let name: string;
	$: ({ class: classes, ...rest } = $$restProps);
</script>

{#if fieldErrors && fieldErrors[name]}
	{#each fieldErrors[name] as e (e)}
		<div class="p-1">
			<p class="text-xs text-red-500 {classes ?? ''}" {...rest}>
				{e}
			</p>
		</div>
	{/each}
{/if}
