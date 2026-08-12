import { json, error } from '@sveltejs/kit';

import { loadCompaniesData } from '@/modules/companies/helpers/loadCompaniesData.server';

export const prerender = true;

export const GET = async () => {
	try {
		const { companies } = await loadCompaniesData();

		const data = companies.map(({ slug, name, websiteUrl, careersUrl }) => ({
			slug,
			name,
			websiteUrl,
			careersUrl: careersUrl ?? null
		}));

		const meta = {
			totalItems: data.length
		};

		return json({ data, meta });
	} catch (err) {
		console.error('/api/v1/companies/+server.ts - err: ', err);
		throw error(500);
	}
};
