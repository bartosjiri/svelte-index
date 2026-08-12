import { json, error } from '@sveltejs/kit';

import { loadCompaniesData } from '@/modules/companies/helpers/loadCompaniesData.server';

import type { HttpError } from '@sveltejs/kit';

export const prerender = true;

// @NOTE: Used for prerender route discovery, see https://svelte.dev/docs/kit/page-options#entries
export const entries = async () => {
	const { companies } = await loadCompaniesData();
	return companies.map((c) => ({ slug: c.slug }));
};

export const GET = async ({ params }) => {
	try {
		const { companies } = await loadCompaniesData();
		const company = companies.find((c) => c.slug === params.slug);

		if (!company) {
			throw error(404, 'Not found');
		}

		const data = {
			slug: company.slug,
			name: company.name,
			websiteUrl: company.websiteUrl,
			careersUrl: company.careersUrl ?? null
		};

		return json({ data });
	} catch (err) {
		if ([404].includes((err as HttpError)?.status)) throw err;

		console.error('/api/v1/companies/[slug]/+server.ts - err: ', err);
		throw error(500);
	}
};
