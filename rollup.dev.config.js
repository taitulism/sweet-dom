// TODO: .ts extension
// import type {RollupOptions} from 'rollup';
import typescript from '@rollup/plugin-typescript';

// eslint-disable-next-line no-console
console.log(`
****************************************
Playground - playground/playground.html'

Testing    - tests/spec.html'
****************************************
`);

const playground = {
	input: 'playground/playground.ts',
	plugins: [typescript()],
	output: {
		sourcemap: true,
		file: 'dev-bundles/playground.js',
		format: 'iife',
	},
};

const tests = {
	input: 'tests/index.spec.ts',
	plugins: [typescript()],
	external: ['chai', 'jsdom'],
	output: {
		sourcemap: true,
		file: 'dev-bundles/tests-specs.js',
		format: 'iife',
		globals: {chai: 'chai', jsdom: 'jsdom'},
	},
};

export default [
	playground,
	tests,
];
