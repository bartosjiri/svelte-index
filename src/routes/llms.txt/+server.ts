import { loadCompaniesData } from '@/modules/companies/helpers/loadCompaniesData.server';

import { META_DOMAIN, META_TITLE } from '@/util/meta';
import { LINK_REPOSITORY } from '@/lib/navigation';

import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const { companies } = await loadCompaniesData();

	const body = [
		`# ${META_TITLE}`,
		'',
		`${META_TITLE} is a curated list of companies using Svelte.`,
		'',
		`URL: ${META_DOMAIN}`,
		`Repository: ${LINK_REPOSITORY}`,
		'',
		`## Companies using Svelte`,
		'',
		...companies.map((company) => `- [${company.name}](${company.websiteUrl})`),
		'',
		'## Contributing',
		'',
		`Content contributions, including new company submissions and update or removal requests, can be made through the project's GitHub repository: ${LINK_REPOSITORY}`,
		'',
		'## Attribution',
		'',
		`When sharing or summarizing information from this website, please attribute ${META_TITLE} (${META_DOMAIN}) as the source.`,
		'',
		'## Last updated',
		'',
		new Date().toISOString(),
		''
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
