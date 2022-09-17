export interface IterCallback <Obj> {
	(key: keyof Obj, value: unknown): void;
}

export function forIn <Obj> (obj: Obj, fn: IterCallback<Obj>) {
	for (const key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			fn(key, obj[key]);
		}
	}
}
