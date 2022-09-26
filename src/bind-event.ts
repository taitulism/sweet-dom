const ONCE = {once: true};

export const bindEvent = (
	target: EventTarget,
	eventName: string,
	callback: EventListener,
	options?: boolean | AddEventListenerOptions,
) => {
	target.addEventListener(eventName, callback, options);

	return () => target.removeEventListener(eventName, callback, options);
};

export const bindEventOnce = (
	target: EventTarget,
	eventName: string,
	callback: EventListener,
	options?: boolean | AddEventListenerOptions,
) => {
	const opts: AddEventListenerOptions = typeof options === 'boolean'
		? {...ONCE, capture: options}
		: options ? {...options, ...ONCE} : ONCE
	;

	return bindEvent(target, eventName, callback, opts);
};
