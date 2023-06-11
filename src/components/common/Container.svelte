<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let as: keyof HTMLElementTagNameMap = 'div';
	export let className: string = '';
	export { className as class };
	export let verticalSpacing: 'padding' | 'margin' | 'none' = 'margin';
	const verticalSpacingClasses =
		verticalSpacing === 'margin'
			? 'my-20 lg:my-40'
			: verticalSpacing === 'padding'
			? 'py-20 lg:py-40'
			: '';
</script>

<svelte:element
	this={as}
	class={twMerge('mx-auto max-w-7xl px-4 md:px-6', verticalSpacingClasses, className)}
	{...$$restProps}
>
	<slot />
</svelte:element>
