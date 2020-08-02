const {slice} = Array.prototype;

function collection2array (collection) {
	return slice.call(collection);
}

const $ = qryStr => document.querySelector(qryStr);
const $$ = (qryStr) => {
	const collection = document.querySelectorAll(qryStr);
	return collection2array(collection);
};

const $id = id => document.getElementById(id);

const $cls = (classNames) => {
	const nodeList = document.getElementsByClassName(classNames);
	return collection2array(nodeList);
};

const $tag = (tagName) => {
	const nodeList = document.getElementsByTagName(tagName);
	return collection2array(nodeList);
};

module.exports = $;
module.exports.$ = $;
module.exports.$$ = $$;
module.exports.id = $id;
module.exports.cls = $cls;
module.exports.tag = $tag;




// module.exports = function $ (qryStr) {
// 	const firstChar = qryStr[0];

// 	if (firstChar === '#') {
// 		return document.getElementById(qryStr.substr(1));
// 	}
// 	else if (firstChar === '.') {
// 		const nativeStr = qryStr.substr(1).replace(/\./gu, ' ')
// 		const nodeList = document.getElementsByClassName(nativeStr);
// 		return collection2array(nodeList);
// 	}

// 	const nodeList = document.getElementsByTagName(qryStr);
// 	return collection2array(nodeList);
// };
