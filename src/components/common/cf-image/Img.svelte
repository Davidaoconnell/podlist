<script lang="ts">
	import type { Ratios, ScreenSizes, SizeData, Transforms } from './image';
	import { getResponsiveImgStrings } from './utils';

	/** Image src within the folder static/img. */
	export let src: string;
	export let alt: string;
	/** The max width the image should ever be. Note that width and height should always keep the proper aspect ratio of the image unless you're cropping. */
	export let width: number;
	/** The max height the image should ever be. Note that width and height should always keep the proper aspect ratio of the image unless you're cropping. */
	export let height: number;
	/** Defaults to "lazy". If the image is in the viewport upon page load, set to "eager". */
	export let loading: 'eager' | 'lazy' = 'lazy';
	/** Apply classes to the <img /> tag. */
	export let className: string | null = null;
	export { className as class };

	/** The % of the screen the image will take up at each Tailwind breakpoint. Full width (100) by default. Values cascade up from smaller sizes to larger sizes. For example: { md: 50 } will be 100% at small and 50% at all higher sizes. */
	export let sizes: ScreenSizes = {};
	// Transforms
	/** Apply any Cloudflare Image transforms (aside from width and height). See: https://developers.cloudflare.com/images/cloudflare-images/transform/flexible-variants */
	export let transforms: Transforms = {};
	/** When cropping an image, you are able to set the ratio the image should be at each Tailwind breakpoint. Values cascade up from smaller sizes to larger sizes. For example: { md: 4 / 3 } will be a ratio of `width / height` at small and 1.33 (4 / 3) at all higher sizes. */
	export let ratios: Ratios | undefined = undefined;

	let srcset: string | null = null;
	let htmlSizes: string | null = null;
	let defaultSrc: string | null = null;
	let sizeData: SizeData;

	({
		srcset,
		sizes: htmlSizes,
		defaultSrc,
		sizeData
	} = getResponsiveImgStrings({
		width,
		height,
		ratios,
		src,
		sizes,
		transforms
	}));
</script>

{#if ratios}
	<picture>
		<!-- TODO: Do I even have to use a picture element? can I just use sizes in an img? -->
		<!-- TODO: Should we have this one here that is the max width of image? e.g. min-width ${maxwidth} -->
		<!-- TODO: IF SO, we should also do that in the regular <img /> srcset/sizes -->
		<source media={`(min-width: ${width}px)`} {width} {height} srcset={defaultSrc} />
		{#each Object.entries(sizeData) as [_screenSizeName, { width, height, percentOfScreenWidth, ratio, size, src, screenSize }]}
			<source {width} {height} media={`(min-width: ${screenSize}px)`} srcset={src} />
		{/each}
		<!-- Anything under 'sm' -->
		<source width={sizeData.sm.width} height={sizeData.sm.height} srcset={sizeData.sm.src} />
		<!-- Img element to apply styling & also fallback -->
		<img
			src={defaultSrc}
			{srcset}
			sizes={htmlSizes}
			{alt}
			{width}
			{height}
			{loading}
			class={className}
		/>
	</picture>
{:else}
	<img
		src={defaultSrc}
		{srcset}
		sizes={htmlSizes}
		{alt}
		{width}
		{height}
		{loading}
		class={className}
	/>
{/if}
