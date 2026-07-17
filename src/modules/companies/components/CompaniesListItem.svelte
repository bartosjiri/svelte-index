<script lang="ts">
	import { Icon } from '@/lib/primitives';
	import SelectionIcon from '@/lib/primitives/icon/assets/selection.svg?raw';
	import ArrowTopRightIcon from '@/lib/primitives/icon/assets/arrow-top-right.svg?raw';

	import { LINK_REPOSITORY } from '@/lib/navigation';

	import type { CompanyT } from '../types/company.types';

	type CompaniesListItemPropsT =
		| {
				company: CompanyT;
				empty?: never;
		  }
		| { company?: never; empty: true };

	let { company, empty, ...restProps }: CompaniesListItemPropsT = $props();
</script>

<li class:-empty={empty} {...restProps}>
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a href={empty ? `${LINK_REPOSITORY}#contributing` : company?.websiteUrl} target="_blank">
		<div class:company={true}>
			<div class:logo={true}>
				{#if empty}
					<Icon icon={SelectionIcon} />
				{:else}
					<Icon src={`/content/${company?.slug}/logo-mono.svg?v=${company?.version}`} />
				{/if}
			</div>
			<div class:name={true}>
				<span>{empty ? 'Your company' : company?.name}</span>
			</div>
		</div>
		<div class:description={true}>
			{#if !empty}
				<span>{company?.description}</span>
			{/if}
		</div>
		<div class:link={true}>
			<span>{empty ? 'Submit' : company?.websiteUrl.replace('https://', '')}</span>
			<Icon icon={ArrowTopRightIcon} />
		</div>
	</a>
</li>

<style lang="scss">
	li {
		--item-padding: 1.6rem;

		a {
			position: relative;
			display: grid;
			grid-template-columns: var(--list-columns);
			grid-template-areas: var(--list-areas);
			column-gap: var(--list-gap);
			padding: var(--item-padding) 0;

			&:after {
				position: absolute;
				top: -1px;
				bottom: -1px;
				left: calc(-1px + var(--item-padding) * -1);
				right: calc(-1px + var(--item-padding) * -1);
				content: '';
				background: var(--color-background-02);
				border-radius: 1.2rem;
				opacity: 0;
				z-index: -1;
			}

			.company .name,
			.description,
			.link {
				display: flex;
				align-items: center;
				overflow: hidden;

				span {
					display: block;
					line-height: initial;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}

			.company {
				grid-area: company;
				display: flex;
				align-items: center;
				column-gap: 1.6rem;
				overflow: hidden;

				.logo {
					--logo-height: 1.8rem;

					width: var(--logo-height);
					height: var(--logo-height);
					display: flex;
					justify-content: center;
					align-items: center;

					:global(.icon) {
						--height: var(--logo-height);
						--color: var(--color-foreground-03);

						:global(svg) {
							max-height: var(--height);
							max-width: var(--height);
						}
					}
				}

				.name {
					color: var(--color-foreground-01);
				}
			}

			.description {
				grid-area: description;
				color: var(--color-foreground-03);
			}

			.link {
				grid-area: link;
				justify-content: flex-end;
				column-gap: 0.4rem;
				color: var(--color-foreground-03);

				:global(.icon) {
					--height: 1.2em;
					--color: currentColor;
					transform: translateY(0.015em);
					margin-left: 0.2em;
				}
			}

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					&:after {
						opacity: 1;
					}

					.company {
						.logo {
							:global(.icon) {
								--color: var(--color-foreground-01);
							}
						}

						.name {
							color: var(--color-foreground-01);
						}
					}

					.description {
						color: var(--color-foreground-02);
					}

					.link {
						color: var(--color-foreground-01);
					}
				}
			}
		}

		&.-empty {
			.company {
				.name {
					color: var(--color-foreground-03);
				}
			}
		}
	}
</style>
