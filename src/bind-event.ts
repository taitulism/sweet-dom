const ONCE = {once: true};

export type MouseEventHandler = (ev: MouseEvent | WheelEvent) => void;
export type EventListenerTarget = HTMLElement | Document | Window;

export function bindEvent (
	target: EventListenerTarget,
	eventName: string,
	callback: MouseEventHandler, // TODO:! EventListener (types issues)
	options?: boolean | AddEventListenerOptions,
) {
	target.addEventListener(eventName, callback as EventListener, options);

	return function unbindEvent () {
		target.removeEventListener(eventName, callback as EventListener, options);
	};
}

export function bindEventOnce (
	target: EventListenerTarget,
	eventName: string,
	callback: MouseEventHandler,
	options: boolean | AddEventListenerOptions,
) {
	const opts = typeof options === 'boolean'
		? {...ONCE, capture: options as boolean}
		: options ? {...options as object, ...ONCE} : ONCE
	;

	return bindEvent(target, eventName, callback, opts);
}
