const $ = qryStr => document.querySelector(qryStr);
const $$ = (qryStr) => {
	const collection = document.querySelectorAll(qryStr);
	return Array.from(collection);
};

const $id = id => document.getElementById(id);

const $cls = (classNames) => {
	const nodeList = document.getElementsByClassName(classNames);
	return Array.from(nodeList);
};

const $tag = (tagName) => {
	const nodeList = document.getElementsByTagName(tagName);
	return Array.from(nodeList);
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
// 		return Array.from(nodeList);
// 	}

// 	const nodeList = document.getElementsByTagName(qryStr);
// 	return Array.from(nodeList);
// };
