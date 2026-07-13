<script lang="ts">
	import { onMount } from 'svelte';

	import { PageMeta } from '@/util/meta';
	import { Button } from '@/lib/primitives';

	import ChevronLeftIcon from '@/lib/primitives/icon/assets/chevron-left.svg?raw';

	const UMAMI_LSKEY = 'umami.disabled';

	let isAnalyticsDisabled = $state(false);

	const toggleAnalytics = () => {
		if (isAnalyticsDisabled) {
			localStorage.removeItem(UMAMI_LSKEY);
			isAnalyticsDisabled = false;
		} else {
			localStorage.setItem(UMAMI_LSKEY, '1');
			isAnalyticsDisabled = true;
		}

		if (typeof window !== 'undefined') window.location.reload();
	};

	onMount(() => {
		isAnalyticsDisabled = localStorage.getItem(UMAMI_LSKEY) === '1';
	});
</script>

<PageMeta title="Privacy" noindex nofollow />
<header>
	<Button class="-homepage" href="/" variant="ghost" icon={ChevronLeftIcon} iconPosition="prefix">
		Homepage
	</Button>
</header>
<section>
	<h1>Privacy</h1>
	<h2>Analytics</h2>
	<p>
		Svelte&nbsp;Index&nbsp;uses <a href="https://umami.is" target="_blank">Umami</a> analytics to&nbsp;track
		and&nbsp;collect privacy-friendly, non-invasive usage data from&nbsp;the&nbsp;platform. All&nbsp;data
		is anonymized, and&nbsp;no&nbsp;personally identifiable information is tracked or&nbsp;stored. This&nbsp;analytics
		service is hosted in&nbsp;the&nbsp;EU and&nbsp;is GDRP and&nbsp;CCPA&nbsp;compliant.
	</p>
	<p>
		You&nbsp;can opt out of these basic analytics by clicking the&nbsp;button&nbsp;below.
		Your&nbsp;opt-out preference will be stored in your browser's local&nbsp;storage.
	</p>
	<div class:actions={true}>
		<Button onclick={toggleAnalytics} variant="secondary">
			{isAnalyticsDisabled ? 'Enable analytics' : 'Disable analytics'}
		</Button>
	</div>
</section>

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-top: 1.6rem;

		:global(.button.-homepage) {
			margin-left: -1.6rem;
		}
	}

	section {
		display: flex;
		flex-direction: column;
		padding-top: 3.6rem;

		h1 {
			font-size: 2.8rem;
			font-weight: 500;
			letter-spacing: -0.28px;
			margin-bottom: 2.4rem;
		}

		h2 {
			font-size: 1.8rem;
			font-weight: 500;
			margin-bottom: 2rem;
		}

		p {
			color: var(--color-foreground-02);
			margin-bottom: 1.6rem;

			a {
				text-decoration: underline;

				&:hover {
					color: var(--color-foreground-01);
				}
			}

			&:last-of-type {
				margin-bottom: 0;
			}
		}

		.actions {
			display: flex;
			margin-top: 2.4rem;
		}
	}
</style>
