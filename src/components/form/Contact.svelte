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
<!-- the `id` is placed outside of the browser check and not on the form itself because the #contact-form anchor link does not exist when SvelteKit tries to pre-render this page, and errors out. -->
<div {id}>
	{#if mounted}
		<form
			data-sveltekit-prefetch="off"
			class={`grid grid-cols-1 gap-y-6 ${formSuccess ? 'hidden' : ''}`}
			on:submit|preventDefault={async (e) => {
				disabled = true;
				formMessage = '';
				const res = await fetch('/!/forms', {
					method: 'POST',
					body: new FormData(e.currentTarget)
				});
				const { success, message, shouldRetry } = await res.json();
				if (shouldRetry) {
					formMessage =
						'There was an issue when performing bot protection. Please try submitting again. If you continue to see this, please try a different browser or contact us via another method.';
					disabled = true;
					hideTurnstileEle = false;
					window.turnstile.reset(widgetId);
					return;
				}
				if (success) {
					formSuccess = true;
					goto(`#${id}-message`);
				} else {
					console.log('error submitting form', message);
					formSuccess = true;
					goto(`#${id}-message`);
				}
			}}
		>
			<input type="checkbox" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" />
			<div>
				<label for="full-name" class="sr-only">Full name</label>
				<input
					type="text"
					required
					name="full-name"
					id="full-name"
					autocomplete="name"
					class="block w-full rounded-md border border-gray-100 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					placeholder="Full name"
				/>
			</div>
			<div>
				<label for="email" class="sr-only">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					class="block w-full rounded-md border border-gray-100 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					placeholder="Email"
				/>
			</div>
			<div>
				<label for="phone" class="sr-only">Phone</label>
				<input
					type="text"
					name="phone"
					id="phone"
					autocomplete="tel"
					class="block w-full rounded-md border border-gray-100 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					placeholder="Phone"
				/>
			</div>
			<div>
				<label for="message" class="sr-only">Message</label>
				<textarea
					required
					id="message"
					name="message"
					rows="4"
					class="block w-full rounded-md border border-gray-100 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					placeholder="Message"
				/>
			</div>
			<div id={`${id}-turnstile-widget`} class:hidden={hideTurnstileEle} />
			<div>
				{#if formMessage}
					<p class="pb-2 text-orange-600">{formMessage}</p>
				{/if}
				<button
					{disabled}
					type="submit"
					class="btn inline-flex space-x-2 disabled:bg-gray-200 disabled:text-gray-600 disabled:shadow-gray-600/20"
				>
					{#if turnstileError}
						<span>Error</span>
					{:else if disabled}
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
			</div>
		</form>
	{/if}
	<noscript>
		<p>
			Please enable JavaScript in order to use this form. The use of JavaScript helps us reduce spam
			and fight bots.
		</p>
	</noscript>
</div>
