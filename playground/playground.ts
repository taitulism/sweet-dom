import {createElm, bindEvent} from '../src';
// import {startBenchmark} from './benchmark';

const link = createElm('a#link', 'Click');

bindEvent(link, 'click', () => {
	alert('ok');
	// startBenchmark();
});

document.body.prepend(link);
