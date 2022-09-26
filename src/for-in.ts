import {UnknownObject} from './types';

export interface IterCallback <K = string, V = unknown> {
	(key: K, value: V): void;
}

export const forIn = <T = UnknownObject>(obj: T, fn: IterCallback<keyof T, T[keyof T]>) => {
	for (const key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			fn(key, obj[key]);
		}
	}
};
