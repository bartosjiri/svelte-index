<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	if (browser && page.status === 404) {
		location.replace('/');
	}
</script>

<section>
	<p>
		{#if page.status === 404}
			Page not found
		{:else}
			An&nbsp;unexpected error has&nbsp;occured
		{/if}
	</p>
</section>

<style lang="scss">
	section {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}
</style>
