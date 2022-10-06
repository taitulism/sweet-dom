module.exports = {
	require: 'ts-node/register',
	loader: 'ts-node/esm',
	extensions: 'ts',
	spec: 'tests/index.spec.ts',
	'node-option': 'trace-warnings',
}
