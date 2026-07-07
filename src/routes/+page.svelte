<script lang="ts">
	import {
		ListingHeader,
		ListingHeaderItem,
		ListingHeaderItemHighlight,
		ListingHeaderItemDescription
	} from '@/modules/listing-header';
	import { CompaniesList } from '@/modules/companies';

	let { data } = $props();
</script>

<!-- eslint-disable svelte/no-useless-mustaches -->
<ListingHeader>
	<ListingHeaderItem>
		Companies using
		<ListingHeaderItemHighlight>Svelte</ListingHeaderItemHighlight>{'.'}
		{#snippet description()}
			<ListingHeaderItemDescription
				links={[
					{
						label: 'Official website',
						href: 'https://svelte.dev',
						target: '_blank'
					},
					{
						label: 'Get started docs',
						href: 'https://svelte.dev/docs/svelte/overview',
						target: '_blank'
					}
				]}
			>
				Svelte is a&nbsp;JavaScript framework for&nbsp;building fast, reactive
				web&nbsp;applications.
			</ListingHeaderItemDescription>
		{/snippet}
	</ListingHeaderItem>
	<ListingHeaderItem>
		A&nbsp;framework
		<ListingHeaderItemHighlight>loved</ListingHeaderItemHighlight>
		by&nbsp;developers.
		{#snippet description()}
			<ListingHeaderItemDescription
				links={[
					{
						label: 'State of JS 2025',
						href: 'https://2025.stateofjs.com/en-US/libraries/front-end-frameworks',
						target: '_blank'
					},
					{
						label: '	StackOverflow Survey 2024',
						href: 'https://survey.stackoverflow.co/2024/technology#2-web-frameworks-and-technologies',
						target: '_blank'
					}
				]}
			>
				Developers consistently rank Svelte as the&nbsp;framework they’re most excited
				about&nbsp;using.
			</ListingHeaderItemDescription>
		{/snippet}
	</ListingHeaderItem>
	<ListingHeaderItem>
		From&nbsp;ambitious
		<ListingHeaderItemHighlight>startups to Fortune 100</ListingHeaderItemHighlight>.
		{#snippet description()}
			<ListingHeaderItemDescription
				links={[
					{ label: 'Apple Music', href: 'https://music.apple.com', target: '_blank' },
					{ label: 'Comma', href: 'https://www.comma.ai', target: '_blank' }
				]}
			>
				Companies choose Svelte to build both rapid prototypes and&nbsp;large-scale applications.
			</ListingHeaderItemDescription>
		{/snippet}
	</ListingHeaderItem>
</ListingHeader>
<CompaniesList companies={data.companies} />

<style lang="scss">
	:global(.listing-header) {
		padding-top: 12rem;
		padding-bottom: 6.4rem;

		@include breakpoint($breakpoint-tablet) {
			padding-top: 9.6rem;
		}

		@include breakpoint($breakpoint-mobile) {
			padding-top: 6.4rem;
		}
	}
</style>
