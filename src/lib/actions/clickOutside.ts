function clickOutside(
	node: HTMLElement,
	config: {
		handler: () => void;
		ignore?: HTMLElement;
	}
): { destroy: () => void } {
	const onClick = (event: MouseEvent) =>
		node &&
		!node.contains(event.target as HTMLElement) &&
		!config.ignore?.contains(event.target as HTMLElement) &&
		!event.defaultPrevented &&
		config.handler();

	document.addEventListener('click', onClick, true);

	return {
		destroy() {
			document.removeEventListener('click', onClick, true);
		}
	};
}

export default clickOutside;
