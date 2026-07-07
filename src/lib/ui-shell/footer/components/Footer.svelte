<script lang="ts">
	import { Icon } from '@/lib/primitives';
	import BartosjiriIcon from '@/lib/primitives/icon/assets/bartosjiri.svg?raw';

	import type { HTMLAttributes } from 'svelte/elements';

	type FooterPropsT = HTMLAttributes<HTMLElement>;

	let { ...restProps }: FooterPropsT = $props();
</script>

<footer {...restProps}>
	<div class:group={true} class:-author={true}>
		<a class:bartosjiri={true} href="https://bartosjiri.com" target="_blank">
			<Icon icon={BartosjiriIcon} />
			<span>A project by bartosjiri</span>
		</a>
	</div>
	<!-- <div class:group={true} class:-pages={true}>
		<a href="/privacy">Privacy</a>
		<a href="/llms.txt">LLMs</a>
	</div> -->
	<div class:group={true} class:-legal={true}>
		<span>Logos are the property of their respective owners</span>
	</div>
	<!-- <div class:group={true} class:-contribute={true}>
		<a href="@TODO" target="_blank">Submit company</a>
		<a href="@TODO" target="_blank">Report content</a>
	</div> -->
</footer>

<style lang="scss">
	footer {
		display: grid;
		grid-template-columns: auto auto;
		// grid-template-areas: 'author legal' 'pages contribute';
		grid-template-areas: 'author legal';
		column-gap: 1.6rem;
		row-gap: 0.1rem;
		font-size: 1.2rem;
		color: var(--color-foreground-03);

		.group {
			display: flex;
			align-items: center;
			column-gap: 0.8rem;
			row-gap: 0.1rem;

			&.-author {
				grid-area: author;
			}

			&.-pages {
				grid-area: pages;
			}

			&.-legal {
				grid-area: legal;
				justify-content: flex-end;
			}

			&.-contribute {
				grid-area: contribute;
				justify-content: flex-end;
			}

			.bartosjiri {
				display: flex;
				align-items: center;
				column-gap: 0.6rem;

				:global(.icon) {
					--height: 0.85rem;

					:global(path) {
						fill: var(--color-foreground-03);
					}
				}
			}
		}

		a {
			@media (hover: hover) and (pointer: fine) {
				&:hover {
					color: var(--color-foreground-01);
				}
			}
		}

		.bartosjiri {
			@media (hover: hover) and (pointer: fine) {
				&:hover {
					:global(.icon) {
						:global(path) {
							fill: #ff0033;
						}
					}
				}
			}
		}

		@include breakpoint($breakpoint-tablet) {
			grid-template-columns: 1fr;
			// grid-template-areas: 'author' 'pages' 'contribute' 'legal';
			grid-template-areas: 'author' 'legal';

			.group {
				&.-legal,
				&.-contribute {
					justify-content: flex-start;
				}
			}
		}
	}
</style>
