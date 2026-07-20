<script lang="ts">
	import { themeManager } from '../stores/theme.store.ts';

	import { LOCALSTORAGE_KEY, DATAATTRIBUTE_KEY, THEMES } from '../constants/theme.constants.ts';

	$themeManager?.initTheme();
</script>

<svelte:head>
	{@html `<script>
		(function () {
			try {
				const saved = localStorage.getItem('${LOCALSTORAGE_KEY}');
				const available = [${Object.values(THEMES).map((t) => `'${t}'`)}]
				const theme = available.includes(saved) ? saved : '${THEMES.SYSTEM}';
				const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
					? '${THEMES.DARK}'
					: '${THEMES.LIGHT}';
				const resolved = theme === '${THEMES.SYSTEM}' ? systemTheme : theme;
				document.documentElement.setAttribute('data-${DATAATTRIBUTE_KEY}', resolved);
			} catch {}
		})();
	</script>`}
</svelte:head>
