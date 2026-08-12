export type CompanyT = CompanyConfigT & {
	slug: string;
	createdAt: string | undefined;
	updatedAt: string | undefined;
	version: string | undefined;
};

export type CompanyConfigT = {
	name: string;
	description: string;
	websiteUrl: string;
	careersUrl?: string;
};
