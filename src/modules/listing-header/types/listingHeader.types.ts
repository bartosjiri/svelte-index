import type { Snippet } from 'svelte';

export type ListingHeaderStateT = {
	activeIndex: number;
	isAutoplaying: boolean;
	setActiveIndex: (index: number) => void;
	cancelAutoplay: () => void;
};

export type RegisterItemT = () => {
	index: number;
	unregister: () => void;
};

export type SetItemDescriptionT = (index: number, description: Snippet) => void;
