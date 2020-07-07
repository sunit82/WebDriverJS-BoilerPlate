import { Result } from 'axe-core';

declare module "axe-core" {
	interface Node {} // eslint-disable-line @typescript-eslint/no-empty-interface
}

export interface AxeAnalysis {
    inapplicable: Result[];
    incomplete: Result[];
    passes: Result[];
    timestamp: string;
    url: string;
    violations: Result[];
}