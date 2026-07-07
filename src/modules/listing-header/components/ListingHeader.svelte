<script lang="ts">
	import { setContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	import {
		CONTEXT_HEADERSTATE,
		CONTEXT_REGISTERITEM,
		CONTEXT_SETDESCRIPTION,
		AUTOPLAY_INTERVAL_MS
	} from '../constants/listingHeader.constants.ts';

	import type { Snippet } from 'svelte';
	import type {
		ListingHeaderStateT,
		RegisterItemT,
		SetItemDescriptionT
	} from '../types/listingHeader.types.ts';

	type ListingHeaderPropsT = { children: Snippet };

	let { children, ...restProps }: ListingHeaderPropsT = $props();

	let itemCount = $state(0);
	let activeIndex = $state(0);

	let itemStartTime = $state(Date.now());
	let isAutoplaying = $state(true);
	let isAutoplayBlocked = $state(false);

	let descriptions = $state<(Snippet | undefined)[]>([]);

	const headerState: ListingHeaderStateT = $state({
		get activeIndex() {
			return activeIndex;
		},
		get isAutoplaying() {
			return isAutoplaying;
		},
		setActiveIndex: (index: number) => {
			activeIndex = index;
			itemStartTime = Date.now();
			isAutoplayBlocked = false;
		},
		cancelAutoplay: () => {
			isAutoplaying = false;
			isAutoplayBlocked = false;
		}
	});

	const registerItem: RegisterItemT = () => {
		const index = itemCount;
		itemCount += 1;

		const unregister = () => {
			itemCount -= 1;
		};

		return { index, unregister };
	};

	const setDescription: SetItemDescriptionT = (index, description) => {
		descriptions[index] = description;
	};

	setContext(CONTEXT_HEADERSTATE, headerState);
	setContext(CONTEXT_REGISTERITEM, registerItem);
	setContext(CONTEXT_SETDESCRIPTION, setDescription);

	const activateNextItem = () => {
		if (isAutoplayBlocked) return;

		if (Date.now() - itemStartTime >= AUTOPLAY_INTERVAL_MS) {
			activeIndex = (activeIndex + 1) % itemCount;
			itemStartTime = Date.now();
		}
	};

	const handleDescriptionMouseEnter = () => {
		isAutoplayBlocked = true;
	};

	const handleDescriptionMouseLeave = () => {
		if (isAutoplaying && Date.now() - itemStartTime >= AUTOPLAY_INTERVAL_MS) {
			activeIndex = (activeIndex + 1) % itemCount;
			itemStartTime = Date.now();
		}

		isAutoplayBlocked = false;
	};

	$effect(() => {
		if (!isAutoplaying || itemCount === 0) return;

		const interval = setInterval(activateNextItem, 100);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<header class:listing-header={true} {...restProps}>
	<h1>
		{@render children?.()}
	</h1>
	<div
		class:description={true}
		role="region"
		aria-label="Item descriptions"
		onmouseenter={handleDescriptionMouseEnter}
		onmouseleave={handleDescriptionMouseLeave}
	>
		{#each descriptions as description, index (index)}
			{#key headerState.activeIndex}
				<div
					class:item={true}
					class:-active={index === headerState.activeIndex}
					data-index={index}
					in:fly={{ duration: 350, y: '-1rem', easing: cubicOut }}
					out:fly={{ duration: 350, y: '1rem', easing: cubicOut }}
				>
					{@render description?.()}
				</div>
			{/key}
		{/each}
	</div>
</header>

<style lang="scss">
	header {
		--header-transition-duration: 120ms;
		--header-transition-function: ease-out;

		h1 {
			:global(span) {
				font-size: 2.8rem;
				font-weight: 500;
				letter-spacing: -0.28px;
			}
		}

		.description {
			display: grid;
			grid-template-areas: 'item';
			padding-top: 3.2rem;
			padding-bottom: 0.8rem;
			margin-bottom: -0.8rem;

			.item {
				grid-area: item;
				position: relative;
				opacity: 0;
				will-change: transform, opacity;
				pointer-events: none;

				&.-active {
					opacity: 1;
					pointer-events: all;
				}
			}
		}
	}
</style>
