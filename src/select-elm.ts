export const $ = (qryStr, ctx = document) => ctx.querySelector(qryStr);

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
