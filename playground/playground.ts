import {$, createElm, bindEvent, bindEventOnce} from '../src';

const style = {
	margin: '50px',
	display: 'inline-block',
	textDecoration: 'underline',
	color: 'blue',
	cursor: 'pointer',
};

const link = createElm('span#link', {style, href: '#'}, 'Click');

bindEventOnce(link, 'click', () => {
	alert('ok');
});

document.body.appendChild(link);
