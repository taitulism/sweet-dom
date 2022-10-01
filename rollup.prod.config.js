import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

const pkgNameAndVersion = pkg.name + ' v' + pkg.version;
const license = `${pkg.license} License`;
const author = '© Taitu Lizenbaum'; // TODO: pkg.author.name;
const year = new Date().getFullYear();
const repoUrl = 'https://github.com/taitulism/sweet-dom.git'; // TODO: pkg.repository.url;
const banner = `/*! ${pkgNameAndVersion} | ${license} | ${author} ${year} | ${repoUrl} */`;

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
		banner,
		dir: './dist/esm',
		format: 'es',
		entryFileNames:'sweet-dom.esm.js',
	},
};

const declarationFile = {
	input: './dist/esm/temp-dts/src/index.d.ts',
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
		banner,
		file: pkg.browser,
		format: 'iife',
		name: 'sweetDom',
	},
};

export default [
	esm,
	declarationFile,
	browserMini,
];
