<script lang="ts">
	import clickOutside from '$lib/actions/clickOutside';
	import { fly } from 'svelte/transition';
	export let parent: App.NavPage;
	export let children: App.NavItem[];
	let buttonEle;
	let open = false;
</script>

<div class="relative">
	<button
		on:click={() => (open = !open)}
		bind:this={buttonEle}
		type="button"
		class={`group inline-flex items-center space-x-2 rounded-lg py-1 px-2 text-sm hover:bg-slate-100 hover:text-slate-900 ${
			open ? 'bg-slate-100 text-slate-900' : 'text-slate-700'
		}`}
		aria-expanded="false"
	>
		<span>{parent.label}</span>
		<svg
			class={`ml-2 h-5 w-5 group-hover:text-gray-500 ${
				open ? 'scale-y-[-1] text-slate-900' : 'text-slate-700'
			} transition-all duration-300 ease-out`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	{#if open}
		<div
			use:clickOutside={{
				handler: () => (open = false),
				ignore: buttonEle
			}}
			class="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0"
			transition:fly|local
		>
			<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
				<div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
					{#each children as { href, label }}
						<a
							on:click={() => (open = false)}
							{href}
							class="-m-3 flex items-center space-x-1 rounded-md p-3 text-sm text-slate-700 transition duration-150 ease-in-out hover:bg-gray-50 hover:text-slate-900"
							target={href.startsWith('http') ? '_blank' : null}
							rel={href.startsWith('http') ? 'noreferrer' : null}
						>
							<span>{label}</span>
							{#if href.startsWith('http')}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-3 w-3 self-start"
								>
									<path
										fill-rule="evenodd"
										d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
										clip-rule="evenodd"
									/>
									<path
										fill-rule="evenodd"
										d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
										clip-rule="evenodd"
									/>
								</svg>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
