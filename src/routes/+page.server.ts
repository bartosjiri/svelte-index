import { error } from '@sveltejs/kit';

import { loadCompaniesData } from '@/modules/companies/helpers/loadCompaniesData.server';

export const prerender = true;

export const load = async () => {
	try {
		const { companies } = await loadCompaniesData();
		return { companies };
	} catch (err) {
		console.error('/+page.server.ts - err: ', err);
		throw error(500, { message: 'Failed to load companies data' });
	}
};
