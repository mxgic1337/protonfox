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

export function createSpan(text: string) {
	const element = document.createElement("span");
	element.appendChild(document.createTextNode(text))
	return element
}

export function upperCase(text: string) {
	return text.charAt(0).toUpperCase() + text.substring(1)
}