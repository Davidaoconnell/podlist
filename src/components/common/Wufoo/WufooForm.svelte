<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import WufooForm from './wufoo';

	let formContainer: HTMLDivElement;
	let observer: IntersectionObserver;
	export let formHash: string;
	export let initialHeight: number = 2471;
	export let showHeader: boolean = false;
	export let autoResize: boolean = true;
	export let userName: string = 'interquest';
	export let lazyLoad: boolean = true;

	const options = {
		userName,
		formHash: formHash,
		autoResize: autoResize,
		height: initialHeight.toString(),
		async: true,
		host: 'wufoo.com',
		header: showHeader ? 'show' : 'hide',
		ssl: true
	};

	onMount(() => {
		if (lazyLoad) {
			const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);
						initializeWufooForm();
					}
				});
			};
			const options = { threshold: 1, rootMargin: '200px' };
			observer = new IntersectionObserver(handleIntersect, options);
			observer.observe(formContainer);
		} else {
			initializeWufooForm();
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});

	function initializeWufooForm() {
		// @ts-ignore
		const wufooForm = new WufooForm();
		wufooForm.initialize(options);
		wufooForm.display();
	}
</script>

<div id="wufoo-{formHash}" bind:this={formContainer}>
	Fill out our <a class="underline" href="https://interquest.wufoo.com/forms/{formHash}"
		>online form</a
	>.
</div>
