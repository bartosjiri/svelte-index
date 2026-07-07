import { cpSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';

const ASSET_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif'] as const;

export const copyContentAssets = () => {
	let isBuild = false;

	return {
		name: 'copy-content-assets',
		config(_: unknown, { command }: { command: string }) {
			isBuild = command === 'build';
		},
		buildStart() {
			if (!isBuild) return;

			const sourceDir = './content';
			const targetDir = './static/content';

			for (const entry of readdirSync(sourceDir)) {
				const sourcePath = join(sourceDir, entry);
				if (!statSync(sourcePath).isDirectory()) continue;

				const files = readdirSync(sourcePath);
				const mediaFiles = files.filter((file) =>
					ASSET_EXTENSIONS.includes(
						extname(file).toLowerCase() as (typeof ASSET_EXTENSIONS)[number]
					)
				);

				if (mediaFiles.length === 0) {
					console.warn(`copyContentAssets - "${entry}" has no media assets`);
					continue;
				}

				for (const file of mediaFiles) {
					const fileSource = join(sourcePath, file);
					const fileTarget = join(targetDir, entry, file);
					mkdirSync(dirname(fileTarget), { recursive: true });
					cpSync(fileSource, fileTarget);
				}
			}
		}
	};
};
