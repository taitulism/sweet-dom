// import {$, createElm, insert} from '../src';

function loop (num: number, cb: (i: number) => void) {
	for (let index = 0; index < num; index++) {
		cb(index);
	}
}

function prepare () {

}

function run () {

}

export function startBenchmark () {
	prepare();

	const startTime = performance.now();

	loop(10_000, () => {
		run();
	});

	console.log(performance.now() - startTime);
}
