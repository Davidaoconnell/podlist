<script lang="ts">
	export let field: {
		[key: string]: any;
		name: string;
		label: string;
		placeholder?: string;
		value?: string;
		hidden?: boolean;
		rows?: number;
		cols?: number;
		required?: boolean;
	};
	export let fieldErrors:
		| {
				[key: string]: string[];
		  }
		| undefined;
	$: ({ class: classes, ...rest } = $$restProps);
</script>

<div class="col-span-full">
	<label for={field.name} class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
		{field.label}
	</label>
	<textarea
		class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
		id={field.name}
		{...field}
		rows={field.rows ?? 5}
		cols={field.cols}
	/>
	{#if fieldErrors && fieldErrors[field.name]}
		{#each fieldErrors[field.name] as e (e)}
			<div class="p-1">
				<p class="text-xs text-red-500 {classes ?? ''}" {...rest}>
					{e}
				</p>
			</div>
		{/each}
	{/if}
</div>
