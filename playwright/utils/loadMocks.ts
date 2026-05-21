import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function loadMock(filePath: string) {
	const fullPath = path.join(__dirname, '../mocks', filePath);
	return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}
