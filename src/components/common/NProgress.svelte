<script lang="ts">
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	// NProgress css
	import 'nprogress/nprogress.css';

	let progressBarTimeout: number | undefined = undefined;
	const startProgressBar = () => {
		if (progressBarTimeout) clearTimeout(progressBarTimeout);
		// @ts-expect-error setTimeout will not return NodeJS.Timeout
		progressBarTimeout = setTimeout(NProgress.start, 200);
	};

	const stopProgressBar = () => {
		if (progressBarTimeout) clearTimeout(progressBarTimeout);
		NProgress.done();
	};

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			// NProgress.start();
			startProgressBar();
		}
		if (!$navigating) {
			// NProgress.done();
			stopProgressBar();
		}
	}
</script>
