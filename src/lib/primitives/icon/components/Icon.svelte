<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { IconT } from '../types/icon.types';

	type IconPropsT = HTMLAttributes<HTMLDivElement> & {
		icon?: IconT | null;
		src?: string;
	};

	let { icon = null, src, ...restProps }: IconPropsT = $props();

	let fetchedSvg = $state<string>('');

	$effect(() => {
		if (!src) return;
		fetch(src)
			.then((res) => res.text())
			.then((text) => {
				fetchedSvg = text;
			})
			.catch((err) => {
				console.error('Icon fetch failed:', err);
			});
	});

	const iconProps = $derived({
		...restProps,
		class: ['icon', restProps.class].filter(Boolean).join(' ')
	});
</script>

<div {...iconProps}>
	{#key icon || fetchedSvg}
		<div class:container={true}>
			{#if typeof icon === 'string'}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html icon}
			{:else if icon}
				{@const Component = icon}
				<Component />
			{:else if fetchedSvg}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html fetchedSvg}
			{/if}
		</div>
	{/key}
</div>

<style lang="scss">
	.icon {
		--height: 1.6rem;
		--color: var(--color-foreground-01);

		display: grid;
		grid-template-areas: 'icon';
		color: var(--color);

		.container {
			grid-area: icon;
			display: flex;
			justify-content: center;
			align-items: center;

			:global(svg) {
				display: block;
				height: var(--height);
				width: auto;
			}
		}
	}
</style>
