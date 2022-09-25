import {$$, createElm} from '../src';

const HOW_MANY_DIVS = 100;
const TEST_LOOP = 2;

function loop (num: number, cb: (i: number) => void) {
	for (let index = 0; index < num; index++) {
		cb(index);
	}
}

function createDivs (howMany: number) {
	loop(howMany, () => {
		document.body.appendChild(createElm('div.qwe'));
	});
}

function grabAllQwes () {
	// return document.getElementsByClassName('qwe');
	// return document.querySelectorAll('.qwe');
	// return $class('qwe');
	return $$('.qwe');
}

createDivs(HOW_MANY_DIVS); // prep once

export function startBenchmark () {
	const startTime = performance.now();
	let qwes: Array<HTMLElement>;

	loop(TEST_LOOP, () => {
		qwes = grabAllQwes();
	});

	console.log(performance.now() - startTime);

	for (const elm of qwes!) {
		elm && 1 + 1;
	}
}
