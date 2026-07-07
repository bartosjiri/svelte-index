<script lang="ts">
	import { getContext, onMount } from 'svelte';

	import { Link } from '@/lib/primitives';

	import { CONTEXT_HEADERSTATE } from '../constants/listingHeader.constants.ts';

	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { ListingHeaderStateT } from '../types/listingHeader.types.ts';

	type ListingHeaderItemDescriptionPropsT = {
		children: Snippet;
		links?: {
			label: string;
			href: HTMLAnchorAttributes['href'];
			target?: HTMLAnchorAttributes['target'];
		}[];
	};

	let { children, links, ...restProps }: ListingHeaderItemDescriptionPropsT = $props();

	let ref: HTMLDivElement | undefined = $state();
	let index: number = $state(0);

	const headerState: ListingHeaderStateT = getContext(CONTEXT_HEADERSTATE);
	const isActive = $derived(headerState.activeIndex === index);

	onMount(() => {
		const parent = ref?.parentElement;
		index = Number(parent?.dataset?.index) || 0;
	});
</script>

<div bind:this={ref} class:description={true} {...restProps}>
	<div class:counter={true}>
		<span>{index + 1}</span>
	</div>
	<div class:text={true}>
		{@render children?.()}
	</div>
	<div class:links={true}>
		{#each links as { label, href, target } (href)}
			<Link {href} {target} tabindex={isActive ? 0 : -1}>{label}</Link>
		{/each}
	</div>
</div>

<style lang="scss">
	.description {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto;
		grid-template-areas: 'counter text' 'counter links';
		column-gap: 0.4rem;
		row-gap: 0.4rem;

		@include breakpoint($breakpoint-tablet) {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto auto;
			grid-template-areas: 'counter' 'text' 'links';
		}

		.counter {
			grid-area: counter;

			span {
				position: relative;
				padding-right: 0.6rem;
				margin-right: 0.8rem;
				color: var(--color-foreground-03);

				&:after {
					position: absolute;
					top: 0.25em;
					bottom: 0.225em;
					right: 0;
					width: 1px;
					content: '';
					background: currentColor;
				}
			}
		}

		.text {
			color: var(--color-foreground-02);
		}

		.links {
			display: flex;
			align-items: center;
			column-gap: 1.6rem;

			:global(a) {
				color: var(--color-foreground-03);

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						color: var(--color-foreground-01);
					}
				}
			}

			@include breakpoint($breakpoint-mobile) {
				flex-direction: column;
				align-items: flex-start;
				row-gap: 0.1rem;
			}
		}
	}
</style>
