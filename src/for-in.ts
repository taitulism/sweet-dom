type IterCallback = (key: string, value: string) => void;

export function forIn (obj: Object, fn: IterCallback) {
	for (let key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			fn(key, obj[key]);
		}
	}
};
