import { execSync } from 'child_process';

import type { CompanyT, CompanyConfigT } from '../types/company.types';

export const loadCompaniesData = async () => {
	const companies: CompanyT[] = [];

	const companyConfigs = import.meta.glob('/content/*/company.ts', { eager: true });

	for (const [filePath, companyConfig] of Object.entries(companyConfigs)) {
		const companyDef = companyConfig as unknown as { ['COMPANY']: CompanyConfigT };

		if (!companyDef?.COMPANY) {
			console.warn(`loadCompaniesData - err: Company config "${filePath} has no COMPANY export"`);
			continue;
		}

		const slug = getNameSlug(filePath);
		const { createdAt, updatedAt, version } = getGitMetadata(slug);

		const company: CompanyT = {
			...companyDef.COMPANY,
			slug,
			createdAt,
			updatedAt: updatedAt ?? createdAt,
			version
		};

		companies.push(company);
	}

	return { companies };
};

const getNameSlug = (filePath: string) => {
	return filePath
		.replace(/\\/g, '/')
		.replace(/^.*\/content\//, '')
		.replace('/company.ts', '');
};

const getGitMetadata = (slug: string) => {
	try {
		const createdAt = execSync(`git log --diff-filter=A --format=%aI -- content/${slug}`, {
			encoding: 'utf-8',
			stdio: ['pipe', 'pipe', 'ignore']
		})
			.trim()
			.split('\n')
			.pop();

		const updatedAt = execSync(`git log -1 --format=%aI -- content/${slug}`, {
			encoding: 'utf-8',
			stdio: ['pipe', 'pipe', 'ignore']
		}).trim();

		const version = execSync(`git rev-parse HEAD:content/${slug}`, {
			encoding: 'utf-8',
			stdio: ['pipe', 'pipe', 'ignore']
		})
			.trim()
			.slice(0, 7);

		return { createdAt, updatedAt, version };
	} catch {
		return { createdAt: undefined, updatedAt: undefined, version: '1' };
	}
};
