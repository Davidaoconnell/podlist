<script lang="ts">
	import Turnstile from './Turnstile.svelte';

	export let submitting: boolean | null = null;
	export let botProtectionId: string | false;
</script>

{#if botProtectionId}
	<Turnstile id={botProtectionId} {submitting} />
{:else}
	<button
		disabled={submitting}
		type="submit"
		class="btn inline-flex space-x-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-gray-200"
	>
		{#if submitting}
			<span>Processing...</span>
			<svg
				class="h-5 w-5 animate-spin text-gray-600"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
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
