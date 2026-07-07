<script lang="ts">
	import { Icon } from '@/lib/primitives/icon';

	import ArrowRightIcon from '@/lib/primitives/icon/assets/arrow-right.svg?raw';
	import ArrowTopRightIcon from '@/lib/primitives/icon/assets/arrow-top-right.svg?raw';

	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type LinkPropsT = HTMLAnchorAttributes & { children: Snippet };

	let { children, target, ...restProps }: LinkPropsT = $props();

	const icon = $derived(target === '_blank' ? ArrowTopRightIcon : ArrowRightIcon);
</script>

<a {target} {...restProps}>
	{@render children?.()}
	<Icon {icon} />
</a>

<style lang="scss">
	a {
		display: inline-flex;
		align-items: center;

		:global(.icon) {
			--color: currentColor;
			--height: 1.2em;

			display: inline-block;
			margin-left: 0.2em;
			transform: translateY(0.015em);
		}
	}
</style>
