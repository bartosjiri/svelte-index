<script lang="ts">
	import { getContext, setContext, onDestroy } from 'svelte';

	import {
		CONTEXT_HEADERSTATE,
		CONTEXT_REGISTERITEM,
		CONTEXT_ITEMINDEX,
		CONTEXT_SETDESCRIPTION
	} from '../constants/listingHeader.constants.ts';

	import type { Snippet } from 'svelte';
	import type {
		ListingHeaderStateT,
		RegisterItemT,
		SetItemDescriptionT
	} from '../types/listingHeader.types.ts';

	type ListingHeaderItemPropsT = {
		children: Snippet;
		description: Snippet;
	};

	let { children, description, ...restProps }: ListingHeaderItemPropsT = $props();

	const headerState: ListingHeaderStateT = getContext(CONTEXT_HEADERSTATE);
	const registerItem: RegisterItemT = getContext(CONTEXT_REGISTERITEM);
	const setDescription: SetItemDescriptionT = getContext(CONTEXT_SETDESCRIPTION);
	const { index, unregister } = registerItem();

	const isActive = $derived(headerState.activeIndex === index);

	setContext(CONTEXT_ITEMINDEX, index);

	$effect(() => {
		setDescription(index, description);
	});

	onDestroy(() => {
		unregister();
	});
</script>

<span class:-active={isActive} {...restProps}>
	{@render children?.()}
</span>

<style lang="scss">
	span {
		color: var(--color-foreground-03);
		transition-property: color;
		transition-duration: var(--header-transition-duration);
		transition-timing-function: var(--header-transition-function);

		&.-active {
			color: var(--color-foreground-01);
		}
	}
</style>
