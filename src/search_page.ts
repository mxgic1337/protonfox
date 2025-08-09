import { createElement, getAreWeAntiCheatYetRating, getGameID, getProtonDBRating, ProtonDBSummary, upperCase } from "./utils/utils";

export function checkSearchPage() {
	const searchResults = document.getElementById('search_results');
	const mutationObserver = new window.MutationObserver(async () => {
		checkSearchResults()
	});
	if (searchResults) {
		checkSearchResults()
		mutationObserver.observe(searchResults, { subtree: true, childList: true });
	}
}

/**
 * Adds rating tags to the search results
 */
function checkSearchResults() {
	const games = document.getElementsByClassName('search_result_row')
	for (const game of games) {
		if (game.getElementsByClassName('protonfox-tag').length > 0) { continue; }
		const name = game.getElementsByClassName('platform_img')[0].parentElement || game.getElementsByClassName('title')[0]
		const gameId = getGameID(game.getAttribute('href') || "10");
		getProtonDBRating(gameId).then(async (rating) => {
			if (game.getElementsByClassName('protonfox-tag').length > 0) { return; }
			const status = getAreWeAntiCheatYetRating(gameId);
			if (status) {
				const statusElement = createElement('', ['protonfox-icon', `protonfox-ac-rating-${status.toLowerCase()}`, 'protonfox-search'], 'span', `mask-image: url(${browser.runtime.getURL(`assets/ac-${status.toLowerCase()}.svg`)}); display: inline-block; position: relative; top: -2px;`);
				statusElement.title = `AntiCheat status: ${status} (Are We Anti-Cheat Yet?)`;
				name.prepend(statusElement);
			}
			name.prepend(createElement(upperCase(rating), ['protonfox-tag', `protonfox-rating-${rating}`, 'protonfox-search']))
		})
	}
}
