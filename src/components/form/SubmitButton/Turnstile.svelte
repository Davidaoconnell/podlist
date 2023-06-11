<script context="module" lang="ts">
	declare global {
		interface Window {
			turnstile?: any;
			onloadTurnstileCallback: () => void;
		}
	}
</script>

<script lang="ts">
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	export let id: string;
	export let theme: 'light' | 'dark' | 'auto' = 'light';
	export let size: 'normal' | 'compact' = 'compact';
	export let submitting: boolean | null = null;

	let mounted = false;
	let formMessage: string = '';
	let widgetId: string | null = null;
	let disabled = true;
	let formSuccess = false;
	let hideTurnstileEle = false;
	let turnstileError = false;

	const turnstileQuerySelector = `#${id}-turnstile-widget`;
	// IMPORTANT
	// TODO: This is built in a way that assumes the component is only ever rendered once (one form per page).
	// Things to think about: will the correct cf-turnstile-response injected input be submitted only once per form, AND with the correct input in each form? Also, if we inject this script, it will run that same function multiple times unless we throw it into the module above.
	onMount(() => {
		mounted = true;
		window.onloadTurnstileCallback = function () {
			console.log(
				'onloadTurnstileCallback. PUBLIC TURNSTILE SITE KEY: ',
				PUBLIC_TURNSTILE_SITE_KEY
			);
			widgetId = window.turnstile.render(turnstileQuerySelector, {
				sitekey: PUBLIC_TURNSTILE_SITE_KEY,
				action: id,
				theme,
				size,
				callback: function (token: string) {
					disabled = false;
					turnstileError = false;
					console.log('CAPTCHA success.');
					hideTurnstileEle = true;
				},
				'expired-callback': function (token: string) {
					disabled = true;
					// console.log('expired-callback token: ', token);
					console.log('Resetting CAPTCHA...');
					hideTurnstileEle = false;
					window.turnstile.reset(widgetId);
				},
				'timeout-callback': function () {
					console.log('timeout-callback');
					hideTurnstileEle = false;
				},
				'error-callback': function (token: string) {
					console.log('error-callback: ', token);
					hideTurnstileEle = false;
					turnstileError = true;
					goto(`#${id}-message`);
				}
			});
		};
		// add a script element to head with async and defer attributes with the src set to https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback
		const script = document.createElement('script');
		script.src =
			'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);
	});
</script>

<div {id}>
	<div id={`${id}-message`}>
		{#if formSuccess}
			<p class="text-green-600">Form successfully submitted. Thank you!</p>
		{/if}
		{#if turnstileError}
			<p class="text-red-600">
				There was an error during bot protection. Please reload the page and try again. If the issue
				persists, try using a different browser or contact us through another method.
			</p>
		{/if}
	</div>
	<!-- Dynamically display either Challenge or Submit button -->
	<div>
		<div id={`${id}-turnstile-widget`} class:hidden={hideTurnstileEle} class="mt-3" />
		{#if hideTurnstileEle}
			<button
				disabled={submitting || disabled}
				type="submit"
				class="btn inline-flex space-x-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-gray-200"
			>
				{#if submitting || disabled}
					<span>Processing...</span>
					<svg
						class="h-5 w-5 animate-spin text-gray-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				{:else}
					<span>Submit</span>
				{/if}
			</button>
		{/if}
	</div>
	{#if formMessage}
		<p class="pb-2 text-orange-600">{formMessage}</p>
	{/if}
</div>
<noscript>
	<p>
		Please enable JavaScript in order to use this form. The use of JavaScript helps us reduce spam
		and fight bots.
	</p>
</noscript>
