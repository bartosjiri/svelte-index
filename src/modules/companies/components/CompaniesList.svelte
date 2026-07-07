<script lang="ts">
	import CompaniesListItem from './CompaniesListItem.svelte';

	import type { CompanyT } from '../types/company.types';

	let { companies = [] }: { companies?: CompanyT[] } = $props();
</script>

<ul>
	{#each companies as company (company.slug)}
		<CompaniesListItem {company} />
	{/each}
	<!-- <CompaniesListItem empty /> -->
</ul>

<style lang="scss">
	ul {
		--list-columns: 3fr 5fr 4fr;
		--list-areas: 'company description link';
		--list-gap: 3.2rem;

		display: flex;
		flex-direction: column;

		:global(li) {
			:global(a) {
				border-bottom: 1px solid var(--color-background-02);
			}

			&:last-of-type {
				:global(a) {
					border-bottom: none;
				}
			}
		}

		@include breakpoint($breakpoint-tablet) {
			--list-columns: 3fr 2fr;
			--list-areas: 'company link';

			:global(li) {
				:global(a) {
					:global(.description) {
						display: none;
					}
				}
			}
		}
	}
</style>
