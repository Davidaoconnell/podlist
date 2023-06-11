<script lang="ts">
	import { fly, slide } from 'svelte/transition';

	export let parent: App.NavPage;
	export let children: App.NavItem[];
	let open = false;
</script>

<button class="inline-flex items-center p-2" on:click={() => (open = !open)}
	>{parent.label}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class={`ml-2 h-5 w-5 ${open ? 'scale-y-[-1]' : ''} transition-all duration-300 ease-out`}
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
	</svg>
</button>
{#if open}
	<div transition:slide|local>
		{#each children as { href, label }}
			<a
				on:click={() => (open = false)}
				{href}
				class="flex w-full items-center space-x-1 rounded-lg py-2 pl-6 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
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
{/if}
