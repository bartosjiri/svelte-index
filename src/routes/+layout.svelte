<script lang="ts">
	import { UmamiAnalytics } from '@/util/analytics';
	import { Footer } from '@/lib/ui-shell';

	import '@/styles/+global.scss';

	let { children } = $props();
</script>

<UmamiAnalytics />
<main>
	{@render children()}
</main>
<Footer />

<style lang="scss">
	:global(body) {
		--layout-width: #{$breakpoint-desktop}px;
		--layout-padding-x: 4.8rem;

		:global(.wrapper) {
			max-width: calc(var(--layout-width) - 2 * var(--layout-padding-x));
			min-height: 100dvh;
			display: flex;
			flex-direction: column;
			padding: 0 var(--layout-padding-x);
			margin: 0 auto;

			main {
				display: flex;
				flex-direction: column;
			}

			:global(footer) {
				margin-top: auto;
				padding-top: 12rem;
				margin-bottom: 3.6rem;
			}
		}

		@include breakpoint($breakpoint-tablet) {
			--layout-padding-x: 2.8rem;

			:global(.wrapper) {
				:global(footer) {
					padding-top: 6.4rem;
				}
			}
		}
	}
</style>
