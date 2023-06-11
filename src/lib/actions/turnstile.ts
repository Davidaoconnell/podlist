import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

declare global {
	interface Window {
		turnstile?: any;
		onloadTurnstileCallback: () => void;
	}
}

const turnstileStore = writable({
	disabled: false,
	error: false,
	success: false
});

function turnstile(
	form: HTMLFormElement,
	id: string,
	config: {
		theme: 'light' | 'dark' | 'auto';
		size: 'normal' | 'compact';
	} = {
		theme: 'auto',
		size: 'compact'
	}
) {
	if (form.method.toUpperCase() === 'GET') return;
	let widgetId: string | null = null;
	const submitButton: HTMLButtonElement | null = form.querySelector('button[type="submit"]');
	const turnstileQuerySelector = `#${id}-turnstile`;
	console.log(turnstileQuerySelector);
	// add a div element to the form with the id set to id + '-turnstile'
	const turnstileChallengeElement = document.createElement('div');
	turnstileChallengeElement.id = id + '-turnstile';
	form.appendChild(turnstileChallengeElement);
	window.onloadTurnstileCallback = function () {
		widgetId = window.turnstile.render(turnstileQuerySelector, {
			sitekey: PUBLIC_TURNSTILE_SITE_KEY,
			action: id,
			theme: config.theme,
			size: config.size,
			callback: function (token: string) {
				console.log(turnstileChallengeElement);
				turnstileChallengeElement.style.display = 'none';
				if (submitButton) submitButton.disabled = false;
				console.log('CAPTCHA success.');
			},
			'expired-callback': function (token: string) {
				console.log('expired-callback token: ', token);
				turnstileChallengeElement.style.display = 'block';
				if (submitButton) submitButton.disabled = true;
				console.log('Resetting CAPTCHA...');
				window.turnstile.reset(widgetId);
			},
			'timeout-callback': function () {
				console.log('timeout-callback');
			},
			'error-callback': function (token: string) {
				console.log('error-callback: ', token);
				turnstileChallengeElement.style.display = 'block';
				if (submitButton) submitButton.disabled = true;
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
	return turnstileStore;
}

export default turnstile;
