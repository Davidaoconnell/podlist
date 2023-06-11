<script lang="ts">
	export let field: {
		[key: string]: any;
		name: string;
		label: string;
		placeholder?: string;
		value?: string;
		hidden?: boolean;
		required?: boolean;
		type:
			| 'button'
			| 'checkbox'
			| 'color'
			| 'date'
			| 'datetime-local'
			| 'email'
			| 'file'
			| 'hidden'
			| 'image'
			| 'month'
			| 'number'
			| 'password'
			| 'radio'
			| 'range'
			| 'reset'
			| 'search'
			| 'submit'
			| 'tel'
			| 'text'
			| 'time'
			| 'url'
			| 'week';
	};
	export let fieldErrors:
		| {
				[key: string]: string[];
		  }
		| undefined;
	$: ({ class: classes, ...rest } = $$restProps);
</script>

<div>
	{#if field.type === 'radio'}
		<span class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">{field.label}</span>
		<div class="flex space-x-4">
			{#each field.options as option}
				<label
					for={option.value}
					class="flex items-center space-x-2 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
				>
					<span>{option.label}</span>
					<input
						id={option.value}
						type="radio"
						name={field.name}
						value={option.value}
						class="block max-w-xs rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
					/>
				</label>
			{/each}
		</div>
	{:else if field.type === 'checkbox' && field.options && field.options.length > 1}
		<span class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">{field.label}</span>
		<div class="flex space-x-4">
			{#each field.options as option}
				<label
					for={option.value}
					class="flex items-center space-x-2 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
				>
					<span>{option.label}</span>
					<input
						id={option.value}
						type="checkbox"
						name={field.name}
						value={option.value}
						class="block max-w-xs rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
					/>
				</label>
			{/each}
		</div>
	{:else if field.type === 'checkbox'}
		<label
			for={field.name}
			class="flex items-center space-x-2 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
		>
			<span>{field.label}</span>
			<input
				id={field.name}
				type="checkbox"
				name={field.name}
				class="block max-w-xs rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
			/>
		</label>
	{:else}
		<label for={field.name} class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
			{field.label}
		</label>
		<input
			id={field.name}
			{...field}
			class="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
		/>
	{/if}
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
