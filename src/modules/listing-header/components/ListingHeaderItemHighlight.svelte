<script lang="ts">
	import { getContext } from 'svelte';

	import { CONTEXT_HEADERSTATE, CONTEXT_ITEMINDEX } from '../constants/listingHeader.constants.ts';

	import type { Snippet } from 'svelte';
	import type { ListingHeaderStateT } from '../types/listingHeader.types.ts';

	type ListingHeaderItemHighlightPropsT = {
		children: Snippet;
	};

	let { children, ...restProps }: ListingHeaderItemHighlightPropsT = $props();

	const headerState: ListingHeaderStateT = getContext(CONTEXT_HEADERSTATE);
	const index: number = getContext(CONTEXT_ITEMINDEX);

	const isActive = $derived(headerState.activeIndex === index);
	let disableTransition = $state(false);

	const handleClick = () => {
		headerState.setActiveIndex(index);
		headerState.cancelAutoplay();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') handleClick();
	};

	const handleMouseEnter = () => {
		disableTransition = true;
	};

	const handleMouseLeave = () => {
		requestAnimationFrame(() => {
			disableTransition = false;
		});
	};
</script>

<i
	class:-active={isActive}
	class:-no-transition={disableTransition}
	onclick={handleClick}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onkeydown={handleKeydown}
	role="button"
	tabindex="0"
	{...restProps}
>
	{@render children?.()}
	<sup>{index + 1}</sup>
</i>

<style lang="scss">
	i {
		position: relative;
		color: var(--color-foreground-03);
		white-space: nowrap;
		transition: color var(--header-transition-duration) var(--header-transition-function);
		cursor: pointer;

		&:after {
			position: absolute;
			top: 0.05em;
			bottom: 0.05em;
			left: -0.15em;
			right: -0.15em;
			right: calc(-0.15em + 0.1em);
			content: '';
			background: var(--color-background-02);
			border-radius: 0.8rem;
			transition-property: background;
			transition-duration: var(--header-transition-duration);
			transition-timing-function: var(--header-transition-function);
			z-index: -1;
		}

		sup {
			position: relative;
			top: -1.35em;
			left: -0.35em;
			font-size: 0.4em;
			font-weight: 700;
		}

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				color: var(--color-foreground-01);
			}
		}

		&.-no-transition {
			transition: none;

			&:after {
				transition: none;
			}
		}

		&.-active {
			color: var(--color-brand-01);

			&:after {
				background: var(--color-brand-02);
			}
		}
	}
</style>
