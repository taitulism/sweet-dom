const $ = (qryStr, ctx = document) => ctx.querySelector(qryStr);

$.$$ = (qryStr, ctx = document) => {
	const collection = ctx.querySelectorAll(qryStr);
	return Array.from(collection);
};

$.id = id => document.getElementById(id);

$.cls = (classNames, ctx = document) => {
	const nodeList = ctx.getElementsByClassName(classNames);
	return Array.from(nodeList);
};

$.tag = (tagName, ctx = document) => {
	const nodeList = ctx.getElementsByTagName(tagName);
	return Array.from(nodeList);
};

module.exports = $;
module.exports.$ = $;

// module.exports = function $ (qryStr) {
// 	const firstChar = qryStr[0];

// 	if (firstChar === '#') {
// 		return document.getElementById(qryStr.substr(1));
// 	}
// 	else if (firstChar === '.') {
// 		const nativeStr = qryStr.substr(1).replace(/\./gu, ' ')
// 		const nodeList = document.getElementsByClassName(nativeStr);
// 		return Array.from(nodeList);
// 	}

// 	const nodeList = document.getElementsByTagName(qryStr);
// 	return Array.from(nodeList);
// };
