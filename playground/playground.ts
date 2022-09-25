import {createElm, bindEvent} from '../src';
import {startBenchmark} from './benchmark';

const style = {
	margin: '50px',
	display: 'inline-block',
	textDecoration: 'underline',
	color: 'blue',
	cursor: 'pointer',
};

const link = createElm('span#link', {style, href: '#'}, 'Click');

bindEvent(link, 'click', () => {
	alert('ok');
	// startBenchmark();
});

document.body.appendChild(link);
