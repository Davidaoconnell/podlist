<script>
	import Img from '$components/common/cf-image/Img.svelte';
</script>

<section class="relative pb-24 pt-40 sm:pb-32 sm:pt-48 xl:pb-48 xl:pt-64 2xl:py-72 2xl:pl-2">
	<div
		id="hero-carousel-slider"
		class="splide !absolute left-0 top-0 h-full w-full"
		aria-label="Featured Images"
	>
		<div class="splide__track relative h-full w-full">
			<ul class="splide__list h-full w-full">
				<li class="splide__slide relative h-full w-full">
					<!--
        responsive:url
        ratio="3/4"
        md:ratio="3/2"
        xl:ratio="8/3"
        glide:fit="crop_focal"
        class="absolute top-0 left-0 w-full h-full object-cover"
        glide:quality="60"
        :loading="index === 0 ? 'eager' : 'lazy'"
        glide:width="1600"
    -->
					<Img
						src="/img/home.jpg"
						alt=""
						loading="eager"
						ratios={{
							sm: 3 / 4,
							md: 3 / 2,
							xl: 12 / 8,
							'2xl': 1600 / 1020
						}}
						transforms={{
							fit: 'crop',
							gravity: 'auto',
							quality: 60
						}}
						width={1600}
						height={1020}
						class="absolute left-0 top-0 h-full w-full object-cover"
					/>
				</li>
			</ul>
		</div>
	</div>
	<!-- Overlay -->
	<div class="absolute left-0 top-0 h-full w-full bg-zinc-900/50" />
	<!-- Content -->
	<div
		class="container relative mx-auto flex h-full w-full flex-wrap items-center justify-center text-center text-zinc-50"
	>
		<div class="w-full px-4 md:px-0">
			<h1
				class="mx-auto max-w-4xl font-heading text-4xl font-bold uppercase md:text-7xl xl:text-8xl"
			>
				IQ Svelte Starter
			</h1>
			<p class="mx-auto mt-4 max-w-xl text-xl font-light md:mt-10 md:text-3xl">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</p>
			<div class="mt-8 md:mt-16">
				<a
					href="/contact"
					class="inline-flex items-center space-x-2 rounded border border-zinc-100/90 bg-transparent px-8 py-4 font-heading text-2xl font-bold transition duration-300 ease-in-out hover:scale-105 hover:bg-white/10 hover:shadow-xl"
				>
					<span>Contact Us</span><svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>
