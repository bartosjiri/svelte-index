<script lang="ts">
	import { Icon } from '@/lib/primitives/icon';

	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { IconT } from '@/lib/primitives/icon';

	type ButtonPropsT = (HTMLAnchorAttributes | HTMLButtonAttributes) & {
		href?: HTMLAnchorAttributes['href'];
		variant?: 'primary' | 'secondary' | 'ghost';
		icon?: IconT;
		iconPosition?: 'prefix' | 'suffix';
		disabled?: HTMLButtonAttributes['disabled'];
	};

	let {
		children,
		href,
		variant = 'primary',
		icon,
		iconPosition = 'suffix',
		disabled,
		...restProps
	}: ButtonPropsT = $props();

	const buttonProps = $derived({
		href,
		...restProps,
		class: [
			'button',
			variant && `-variant-${variant}`,
			icon && iconPosition && `-icon-${iconPosition}`,
			disabled && '-disabled',
			restProps.class
		]
			.filter(Boolean)
			.join(' ')
	});
</script>

<svelte:element this={href && !disabled ? 'a' : 'button'} {...buttonProps}>
	{#if icon}
		<Icon {icon} />
	{/if}
	{#if children}
		<span>
			{@render children()}
		</span>
	{/if}
</svelte:element>

<style lang="scss">
	.button {
		height: 4rem;
		display: grid;
		grid-template-areas: 'children';
		align-items: center;
		flex-shrink: 0;
		color: var(--color-foreground);
		background: var(--color-background);
		padding: 0 1.4rem;
		border-radius: 0.8rem;
		user-select: none;
		cursor: pointer;

		:global(.icon) {
			grid-area: icon;
			--color: var(--color-foreground);
		}

		span {
			grid-area: children;
			display: flex;
			font-size: 1.3rem;
			font-weight: 500;
			line-height: 1;
		}

		&:hover {
			color: var(--color-foreground-hover);
			background: var(--color-background-hover);

			:global(.icon) {
				--color: var(--color-foreground-hover);
			}
		}

		&.-icon-prefix {
			grid-template-columns: auto 1fr;
			grid-template-areas: 'icon children';
			column-gap: 0.8rem;
		}

		&.-icon-suffix {
			grid-template-columns: 1fr auto;
			grid-template-areas: 'children icon';
			column-gap: 0.8rem;
		}

		&.-variant-primary {
			--color-foreground: var(--color-background-01);
			--color-background: var(--color-foreground-01);
			--color-foreground-hover: var(--color-background-01);
			--color-background-hover: color-mix(in srgb, var(--color-background) 90%, black);
		}

		&.-variant-secondary {
			--color-foreground: var(--color-foreground-01);
			--color-background: var(--color-background-02);
			--color-foreground-hover: var(--color-foreground-01);
			--color-background-hover: color-mix(in srgb, var(--color-background) 90%, white);
		}

		&.-variant-ghost {
			--color-foreground: var(--color-foreground-02);
			--color-background: transparent;
			--color-foreground-hover: var(--color-foreground-01);
			--color-background-hover: transparent;
		}

		&.-disabled {
			/* @TODO */
		}
	}
</style>
