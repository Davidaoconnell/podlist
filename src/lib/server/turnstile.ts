import { TURNSTILE_SECRET } from '$env/static/private';
import { fail, type ActionFailure } from '@sveltejs/kit';

export const getFormDataIfBotCheckSuccess = async (
	request: Request,
	f: typeof fetch
): Promise<
	| {
			failBot: () => ActionFailure<{
				message: string;
			}>;
			formData?: undefined;
	  }
	| {
			formData: FormData;
			failBot?: undefined;
	  }
> => {
	const formData = await request.formData();
	const turnstileToken = formData.get('cf-turnstile-response');
	if (!turnstileToken)
		return {
			failBot: () => fail(400, { message: 'Turnstile failed. No token in form data.' })
		};
	const turnstileFormData = new FormData();
	turnstileFormData.append('secret', TURNSTILE_SECRET);
	turnstileFormData.append('response', turnstileToken);
	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await f(url, {
		body: turnstileFormData,
		method: 'POST'
	});

	const outcome = await result.json();
	if (!outcome.success)
		return {
			failBot: () => fail(400, { message: 'Turnstile failed.' })
		};
	formData.delete('cf-turnstile-response');
	return {
		formData
	};
};
