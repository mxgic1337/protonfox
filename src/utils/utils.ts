export enum ProtonDBRating {
	NATIVE = 'native',
	PLATINUM = 'platinum',
	GOLD = 'gold',
	SILVER = 'silver',
	BRONZE = 'bronze',
	BORKED = 'borked',
	PENDING = 'pending',
}

export interface ProtonDBSummary {
	tier: ProtonDBRating
}

export function createSpan(text: string, classes?: string[]) {
	const element = document.createElement("span");

	if (classes) {
		for (const prop of classes) {
			element.classList.add(prop);
		}
	}

	element.appendChild(document.createTextNode(text))
	return element
}

export function upperCase(text: string) {
	return text.charAt(0).toUpperCase() + text.substring(1)
}

export function getGameID(url?: string) {
	if (!url) url = window.location.href;
	return url.substring("https://store.steampowered.com/app/".length).split('/')[0]
}