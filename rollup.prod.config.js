import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

const withTypeDeclarations = {
	compilerOptions: {
		declaration: true,
		declarationMap: true,
		declarationDir: './dist/esm/temp-dts',
	},
};

const esm = {
	input: pkg.main,
	plugins: [typescript(withTypeDeclarations)],
	output: {
		dir: './dist/esm',
		format: 'es',
		entryFileNames:'dom-lib.esm.js',
	},
};

const declarationFile = {
	input: './dist/esm/temp-dts/index.d.ts',
	plugins: [dts()],
	output: [{
		file: pkg.types,
		format: 'es',
	}],
};

const browserMini = {
	input: pkg.main,
	plugins: [typescript(), terser()],
	output: {
		file: pkg.browser,
		format: 'iife',
		name: 'domLib',
	},
};

export default [
	esm,
	declarationFile,
	browserMini,
];
