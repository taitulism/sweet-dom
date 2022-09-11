import {IterCallback, UnknownObject} from '~types';

export function forIn (obj: UnknownObject, fn: IterCallback) {
	for (const key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			fn(key, obj[key]);
		}
	}
}
