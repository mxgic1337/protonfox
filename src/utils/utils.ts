import { antiCheatCompatibility, ratings } from "../steam";

export enum ProtonDBRating {
	NATIVE = 'native',
	PLATINUM = 'platinum',
	GOLD = 'gold',
	SILVER = 'silver',
	BRONZE = 'bronze',
	BORKED = 'borked',
	UNKNOWN = 'unknown',
}

export enum AreWeAntiCheatYetStatus {
	SUPPORTED = 'Supported',
	RUNNING = 'Running',
	PLANNED = 'Planned',
	BROKEN = 'Broken',
	DENIED = 'Denied',
}

export interface ProtonDBSummary {
	tier: ProtonDBRating
}

export function createElement(text: string, classes?: string[], elementName?: string, style?: string) {
	const element = document.createElement(elementName || "span");

	if (classes) {
		for (const prop of classes) {
			element.classList.add(prop);
		}
	}

	if (style) {
		element.setAttribute('style', style);
	}

	if (elementName === 'img') {
		(element as HTMLImageElement).src = text;
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

export function getProtonDBRating(gameId: string) {
	return new Promise<ProtonDBRating>((resolve, reject) => {
		if (ratings[gameId]) {
			resolve(ratings[gameId]);
		} else {
			fetch(`https://www.protondb.com/api/v1/reports/summaries/${gameId}.json`).then(async (res) => {
				if (res.ok) {
					const json = await res.json() as ProtonDBSummary;
					ratings[gameId] = json.tier;
					resolve(json.tier);
				} else {
					ratings[gameId] = ProtonDBRating.UNKNOWN;
					resolve(ProtonDBRating.UNKNOWN)
				}
			}).catch(console.error);
		}
	})
}

export function getAreWeAntiCheatYetRating(gameId: string): AreWeAntiCheatYetStatus | undefined {
	const gameStatus = antiCheatCompatibility.find(compatibility => compatibility.storeIds.steam === gameId);
	if (!gameStatus) return undefined;
	return gameStatus.status;
}

export function log(text: string) {
	console.log(`%c Protonfox %c ${text}`, 'background-color: #ff7700; color: #000000;', '')
}
