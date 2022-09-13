const ONCE = {once: true};

// export type EventHandler = (ev: Event) => void;
// export type EventListenerTarget = HTMLElement | Document | Window;

export function bindEvent (
	target: EventTarget,
	eventName: string,
	callback: EventListener,
	options?: boolean | AddEventListenerOptions,
) {
	target.addEventListener(eventName, callback as EventListener, options);

	return function unbindEvent () {
		target.removeEventListener(eventName, callback as EventListener, options);
	};
}

export function bindEventOnce (
	target: EventTarget,
	eventName: string,
	callback: EventListener,
	options?: boolean | AddEventListenerOptions,
) {
	const opts: AddEventListenerOptions = typeof options === 'boolean'
		? {...ONCE, capture: options}
		: options ? {...options, ...ONCE} : ONCE
	;

	return bindEvent(target, eventName, callback, opts);
}
